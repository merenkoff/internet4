(function () {
  'use strict';

  var STORAGE_KEY = 'ownnet-lang';
  var supported = { en: true, ru: true, uk: true };

  var t = {
    en: {
      heroTitle: 'Open internet for everyone',
      heroLead: 'A movement for digital ownership, protocols over platforms, and sovereignty over your data and devices.',
      introHTML: 'This is not a startup or a token. It is <strong>a movement and a technical doctrine</strong>: a manifesto, architectural principles, and public use cases for those who want an internet without remote kill switches and walled ecosystems.',
      manifestoTitle: 'Manifesto of the Open Internet 4.0',
      m1Title: 'Digital Ownership Is Real Ownership.',
      m1Body: 'If you buy it, you own it. No remote revocation. No hidden kill switches.',
      m2Title: 'Devices Must Work Without Permission.',
      m2Body: 'Hardware must not depend on continuous corporate authorization to function.',
      m3Title: 'Software Is Infrastructure.',
      m3Body: 'Critical digital services must rely on open standards and auditable protocols.',
      m4Title: 'Data Belongs to the Individual.',
      m4Body: 'User data must be exportable, portable, and locally accessible.',
      m5Title: 'Offline First.',
      m5Body: 'Every essential system must degrade gracefully and function without central servers.',
      m6Title: 'Interoperability Is a Right.',
      m6Body: 'No artificial lock-ins. No forced ecosystems.',
      m7Title: 'Transparency Over Trust.',
      m7Body: 'Trust must be replaced by verifiable architecture.',
      m8Title: 'Repair, Modify, Fork.',
      m8Body: 'Users must have the legal and technical right to repair and modify their digital tools.',
      m9Title: 'Protocols Over Platforms.',
      m9Body: 'The internet should be built on open protocols, not corporate walled gardens.',
      m10Title: 'Digital Sovereignty Is Civil Sovereignty.',
      m10Body: 'Control over digital infrastructure equals political autonomy.',
      nextTitle: 'In practice',
      next1: 'Open architectural principles and reference implementations.',
      next2: 'Practical knowledge: devices without remote kill switches, offline-first design, rights in the EU and US.',
      next3: 'Doctrine and practice over DAO and tokens.',
      nextNote: 'If these principles resonate with you — share the manifesto and be part of the movement.',
      shareLabel: 'Share',
      copyLink: 'Copy link',
      copyDone: 'Copied!'
    },
    ru: {
      heroTitle: 'Открытый интернет для всех',
      heroLead: 'Движение за цифровую собственность, протоколы вместо платформ и суверенитет над своими данными и устройствами.',
      introHTML: 'Это не стартап и не токен. Это <strong>движение и техническая доктрина</strong>: манифест, архитектурные принципы и публичные кейсы для тех, кто хочет интернет без удалённого отключения и замкнутых экосистем.',
      manifestoTitle: 'Манифест открытого интернета 4.0',
      m1Title: 'Цифровая собственность — настоящая собственность.',
      m1Body: 'Если вы это купили — вы этим владеете. Никакой удалённой отмены. Никаких скрытых выключателей.',
      m2Title: 'Устройства должны работать без разрешения.',
      m2Body: 'Оборудование не должно зависеть от постоянной корпоративной авторизации для работы.',
      m3Title: 'ПО — это инфраструктура.',
      m3Body: 'Критичные цифровые сервисы должны опираться на открытые стандарты и проверяемые протоколы.',
      m4Title: 'Данные принадлежат человеку.',
      m4Body: 'Данные пользователя должны экспортироваться, переноситься и быть доступны локально.',
      m5Title: 'Сначала офлайн.',
      m5Body: 'Каждая важная система должна корректно деградировать и работать без центральных серверов.',
      m6Title: 'Совместимость — право.',
      m6Body: 'Никаких искусственных замков. Никаких навязанных экосистем.',
      m7Title: 'Прозрачность вместо доверия.',
      m7Body: 'Доверие должно быть заменено проверяемой архитектурой.',
      m8Title: 'Ремонт, изменение, форк.',
      m8Body: 'Пользователи должны иметь юридическое и техническое право ремонтировать и изменять свои цифровые инструменты.',
      m9Title: 'Протоколы важнее платформ.',
      m9Body: 'Интернет должен строиться на открытых протоколах, а не корпоративных стенах.',
      m10Title: 'Цифровой суверенитет — гражданский суверенитет.',
      m10Body: 'Контроль над цифровой инфраструктурой равен политической автономии.',
      nextTitle: 'На практике',
      next1: 'Открытые архитектурные принципы и референсные реализации.',
      next2: 'Практические знания: устройства без удалённого отключения, offline-first, права в ЕС и США.',
      next3: 'Доктрина и практика вместо DAO и токенов.',
      nextNote: 'Если эти принципы вам близки — распространяйте манифест и будьте частью движения.',
      shareLabel: 'Поделиться',
      copyLink: 'Скопировать ссылку',
      copyDone: 'Скопировано!'
    },
    uk: {
      heroTitle: 'Відкритий інтернет для всіх',
      heroLead: 'Рух за цифрову власність, протоколи замість платформ і суверенітет над своїми даними та пристроями.',
      introHTML: 'Це не стартап і не токен. Це <strong>рух і технічна доктрина</strong>: маніфест, архітектурні принципи та публічні кейси для тих, хто хоче інтернет без віддалених вимкнень і замкнених екосистем.',
      manifestoTitle: 'Маніфест відкритого інтернету 4.0',
      m1Title: 'Цифрова власність — справжня власність.',
      m1Body: 'Якщо ви це купили — ви цим володієте. Жодного віддаленого скасування. Жодних прихованих вимикачів.',
      m2Title: 'Пристрої мають працювати без дозволу.',
      m2Body: 'Апаратура не повинна залежати від постійної корпоративної авторизації для роботи.',
      m3Title: 'ПЗ — це інфраструктура.',
      m3Body: 'Критичні цифрові сервіси повинні спиратися на відкриті стандарти та перевірювані протоколи.',
      m4Title: 'Дані належать людині.',
      m4Body: 'Дані користувача мають експортуватися, переноситися та бути доступні локально.',
      m5Title: 'Спочатку офлайн.',
      m5Body: 'Кожна важлива система має коректно деградувати та працювати без центральних серверів.',
      m6Title: 'Сумісність — право.',
      m6Body: 'Жодних штучних замків. Жодних нав\'язаних екосистем.',
      m7Title: 'Прозорість замість довіри.',
      m7Body: 'Довіра має бути замінена перевірюваною архітектурою.',
      m8Title: 'Ремонт, зміна, форк.',
      m8Body: 'Користувачі мають мати юридичне та технічне право ремонтувати та змінювати свої цифрові інструменти.',
      m9Title: 'Протоколи важливіші за платформи.',
      m9Body: 'Інтернет має будуватися на відкритих протоколах, а не корпоративних стінах.',
      m10Title: 'Цифровий суверенітет — громадянський суверенітет.',
      m10Body: 'Контроль над цифровою інфраструктурою дорівнює політичній автономії.',
      nextTitle: 'На практиці',
      next1: 'Відкриті архітектурні принципи та референсні реалізації.',
      next2: 'Практичні знання: пристрої без віддаленого вимкнення, offline-first, права в ЄС та США.',
      next3: 'Доктрина й практика замість DAO та токенів.',
      nextNote: 'Якщо ці принципи вам близькі — поширюйте маніфест і будьте частиною руху.',
      shareLabel: 'Поширити',
      copyLink: 'Скопіювати посилання',
      copyDone: 'Скопійовано!'
    }
  };

  function getPreferredLang() {
    var saved = localStorage.getItem(STORAGE_KEY);
    if (saved && supported[saved]) return saved;
    var browser = (navigator.language || navigator.userLanguage || '').slice(0, 2).toLowerCase();
    if (browser === 'uk' || browser === 'ru') return browser;
    return 'en';
  }

  function applyLang(lang) {
    if (!supported[lang]) lang = 'en';
    document.documentElement.lang = lang === 'uk' ? 'uk' : lang === 'ru' ? 'ru' : 'en';
    var strings = t[lang];

    document.querySelectorAll('[data-i18n]').forEach(function (el) {
      var key = el.getAttribute('data-i18n');
      var value = strings[key];
      if (value !== undefined) el.textContent = value;
    });
    document.querySelectorAll('[data-i18n-html]').forEach(function (el) {
      var key = el.getAttribute('data-i18n-html');
      var value = strings[key];
      if (value !== undefined) el.innerHTML = value;
    });

    document.querySelectorAll('.lang-btn').forEach(function (btn) {
      var isActive = btn.getAttribute('data-lang') === lang;
      btn.classList.toggle('active', isActive);
      btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');
    });

    localStorage.setItem(STORAGE_KEY, lang);
  }

  var lang = getPreferredLang();
  applyLang(lang);

  document.querySelectorAll('.lang-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyLang(btn.getAttribute('data-lang'));
    });
  });

  function setupShare() {
    var url = encodeURIComponent(window.location.href);
    var text = encodeURIComponent('Manifesto of the Open Internet 4.0 — OwnNet');
    var urls = {
      x: 'https://twitter.com/intent/tweet?url=' + url + '&text=' + text,
      facebook: 'https://www.facebook.com/sharer/sharer.php?u=' + url,
      linkedin: 'https://www.linkedin.com/sharing/share-offsite/?url=' + url,
      telegram: 'https://t.me/share/url?url=' + url + '&text=' + text
    };
    document.querySelectorAll('.share-btn[data-share]').forEach(function (a) {
      var key = a.getAttribute('data-share');
      if (urls[key]) a.href = urls[key];
    });
    var copyBtn = document.querySelector('.share-copy');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        navigator.clipboard.writeText(window.location.href).then(function () {
          var lang = getPreferredLang();
          var done = t[lang] && t[lang].copyDone ? t[lang].copyDone : 'Copied!';
          copyBtn.textContent = done;
          setTimeout(function () {
            var current = getPreferredLang();
            copyBtn.textContent = t[current] && t[current].copyLink ? t[current].copyLink : 'Copy link';
          }, 1500);
        });
      });
    }
  }
  setupShare();
})();
