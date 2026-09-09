#!/usr/bin/env node
'use strict';

// Generates the pre-rendered Russian and Ukrainian versions of the site
// (ru/index.html, ru/license.html, uk/index.html, uk/license.html) from the
// English source pages and the translation tables, so that every language has
// its own URL and search engines can index the translations.
//
// Sources of truth: index.html, license.html (English markup) and the `t`
// translation tables in i18n.js and license.html. Never edit ru/ or uk/ by
// hand — run `npm run build` (also runs automatically before `npm start`).

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = 'https://own-net.com';
const LANGS = ['ru', 'uk'];
const LOCALE = { en: 'en_US', ru: 'ru_RU', uk: 'uk_UA' };

function read(file) {
  return fs.readFileSync(path.join(ROOT, file), 'utf8');
}

function write(file, content) {
  const target = path.join(ROOT, file);
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, content);
}

function extractStrings(source, what) {
  const match = source.match(/var t = (\{[\s\S]*?\n\s*\});/);
  if (!match) throw new Error('translation table not found in ' + what);
  return new Function('return ' + match[1])(); // eslint-disable-line no-new-func
}

function escapeText(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function escapeAttr(s) {
  return escapeText(s).replace(/"/g, '&quot;');
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function replaceOnce(html, re, replacement, what) {
  const matches = html.match(new RegExp(re.source, re.flags.includes('g') ? re.flags : re.flags + 'g'));
  if (!matches || matches.length !== 1) {
    throw new Error('expected exactly one match for ' + what + ', found ' + (matches ? matches.length : 0));
  }
  return html.replace(re, replacement);
}

function setMeta(html, selector, value) {
  const re = new RegExp('(<meta ' + escapeRe(selector) + ' content=")[^"]*(")');
  return replaceOnce(html, re, '$1' + escapeAttr(value) + '$2', 'meta ' + selector);
}

function applyStrings(html, strings) {
  for (const [key, value] of Object.entries(strings)) {
    html = html.replace(
      new RegExp('(<[a-z0-9]+\\b[^>]*\\bdata-i18n="' + key + '"[^>]*>)([^<]*)(<)', 'g'),
      (m, open, text, close) => open + escapeText(value) + close
    );
    html = html.replace(
      new RegExp('(<p\\b[^>]*\\bdata-i18n-html="' + key + '"[^>]*>)([\\s\\S]*?)(</p>)', 'g'),
      (m, open, inner, close) => open + value + close
    );
  }
  return html;
}

// Rewrites <head> metadata, the language switch and page-internal links.
function localize(html, lang, meta, pagePath) {
  const url = SITE + '/' + lang + pagePath;
  const image = SITE + '/og-image-' + lang + '.png';
  const eol = html.includes('\r\n') ? '\r\n' : '\n'; // keep the source file's line endings

  html = replaceOnce(html, /<html lang="en">/, '<html lang="' + lang + '">', 'html lang');
  html = replaceOnce(html, /<title>[^<]*<\/title>/, '<title>' + escapeText(meta.title) + '</title>', 'title');
  html = setMeta(html, 'name="description"', meta.description);
  html = replaceOnce(html, /<link rel="canonical" href="[^"]*">/, '<link rel="canonical" href="' + url + '">', 'canonical');
  html = setMeta(html, 'property="og:url"', url);
  html = setMeta(html, 'property="og:title"', meta.title);
  html = setMeta(html, 'property="og:description"', meta.description);
  html = setMeta(html, 'property="og:image"', image);
  html = setMeta(html, 'property="og:image:alt"', meta.title);
  html = setMeta(html, 'name="twitter:title"', meta.title);
  html = setMeta(html, 'name="twitter:description"', meta.description);
  html = setMeta(html, 'name="twitter:image"', image);

  const locales = ['<meta property="og:locale" content="' + LOCALE[lang] + '">'].concat(
    ['en', 'ru', 'uk'].filter((l) => l !== lang).map((l) => '<meta property="og:locale:alternate" content="' + LOCALE[l] + '">')
  );
  html = replaceOnce(
    html,
    /<meta property="og:locale" content="en_US">\s*<meta property="og:locale:alternate" content="ru_RU">\s*<meta property="og:locale:alternate" content="uk_UA">/,
    locales.join(eol + '  '),
    'og:locale block'
  );

  // Language switch: move the active state to this language.
  html = replaceOnce(html, / class="lang-btn active"([^>]*) aria-current="page"/, ' class="lang-btn"$1', 'active lang link');
  html = replaceOnce(
    html,
    new RegExp('class="lang-btn"( href="[^"]*" data-lang="' + lang + '")'),
    'class="lang-btn active"$1 aria-current="page"',
    'lang link for ' + lang
  );

  // Page-internal links.
  html = replaceOnce(html, /href="\/" class="logo"/, 'href="/' + lang + '/" class="logo"', 'logo link');
  html = html.replace(/href="\/" data-i18n="licBackLink"/, 'href="/' + lang + '/" data-i18n="licBackLink"');
  html = html.replace(/href="\/license\.html" data-i18n="licReadFull"/, 'href="/' + lang + '/license.html" data-i18n="licReadFull"');

  return html;
}

function buildIndex() {
  const source = read('index.html');
  const t = extractStrings(read('i18n.js'), 'i18n.js');
  for (const lang of LANGS) {
    let html = localize(source, lang, { title: t[lang].pageTitle, description: t[lang].metaDescription }, '/');
    html = applyStrings(html, t[lang]);
    write(lang + '/index.html', html);
  }
}

function buildLicense() {
  const source = read('license.html');
  const t = extractStrings(source, 'license.html');
  for (const lang of LANGS) {
    let html = localize(source, lang, { title: t[lang].licPageTitle, description: t[lang].licMetaDescription }, '/license.html');
    html = applyStrings(html, t[lang]);
    // Show this language's text blocks, hide the others.
    html = html.replace(/(<div\b[^>]*data-for-lang=")(\w+)("[^>]*?)( hidden)?>/g, (m, open, l, rest) =>
      open + l + rest + (l === lang ? '' : ' hidden') + '>'
    );
    write(lang + '/license.html', html);
  }
}

buildIndex();
buildLicense();
console.log('built ' + LANGS.map((l) => l + '/index.html, ' + l + '/license.html').join(', '));
