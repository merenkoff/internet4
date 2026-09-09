# OwnNet — Internet 4.0

Лендінг з маніфестом Open Internet 4.0 для [own-net.com](https://own-net.com).

## Локально

```bash
npm install
npm start
```

Сайт буде на `http://localhost:3000` (якщо Railway не підставляє `PORT`, можна запустити `npx serve .` — тоді порт за замовчуванням 3000).

## Деплой на Railway

1. Заклайби репозиторій у GitHub (якщо ще не).
2. У [Railway](https://railway.app): **New Project** → **Deploy from GitHub repo** → обери цей репо.
3. Railway сам визначить Node.js і виконає `npm install` та `npm start`. Після деплою отримаєш URL типу `https://own-net-com.up.railway.app`.

## Підключення домену own-net.com (GoDaddy)

1. **У Railway:** у проєкті відкрий **Settings** → **Domains** → **Custom Domain**. Додай `own-net.com` та `www.own-net.com`. Railway покаже тобі CNAME-ціль (на кшталт `xxx.up.railway.app`).

2. **У GoDaddy:**  
   - **Domain** → обери **own-net.com** → **Manage DNS**.  
   - Для **кореневого** домену (`own-net.com`):  
     - Якщо є запис типу **A** на старий хост — видали або заміни.  
     - Додай **CNAME** з ім'ям `@` (або якщо GoDaddy не дає CNAME для кореня) — часто доводиться використовувати **Forwarding** домену на `www.own-net.com`, а для `www` завести CNAME.  
   - Для **www**: створюй запис **CNAME**:  
     - Name: `www`  
     - Value: той самий хост, що дав Railway (наприклад `xxx.up.railway.app`).  
   - Якщо GoDaddy пропонує **ALIAS/ANAME** для кореня — можна вказати ту саму Railway-ціль.

3. У Railway для кастомного домену зазвичай можна увімкнути **HTTPS** (Let's Encrypt) — це вже в інтерфейсі.

Після збереження DNS зміни поширяться за 5–60 хвилин. Потім [https://own-net.com](https://own-net.com) має відкривати твій лендінг.

## Структура

- `index.html` — головна сторінка з маніфестом і стислим викладом ліцензії.
- `license.html` — повний текст OwnNet Source License 1.1 (EN, з перекладами RU/UK).
- `i18n.js` — переклади головної сторінки (EN/RU/UK) і кнопки «поділитися».
- `styles.css` — стилі.
- `OwnNet-Source-License-1.1.txt` — проєктно-нейтральний шаблон ліцензії для повторного використання.
- Далі можна додати сторінки кейсів або посилання на GitHub з архітектурними принципами.

## Ліцензія

**OwnNet Source License 1.1** (Source Available) — див. [LICENSE](LICENSE) і [NOTICE](NOTICE).

Це source-available ліцензія, **не** OSI Open Source:

- Вільно використовувати, вивчати, змінювати й поширювати для будь-якої **некомерційної** мети
  та в бізнесі з річним валовим доходом до **USD $100,000**.
- **Комерційне використання** — платний хостинг/SaaS на основі коду, продаж його як продукту або
  використання компанією з доходом понад поріг — потребує окремої письмової угоди: **mer.sergei@gmail.com**.
- **Жодних замкнених систем**: ніхто не може будувати на цьому коді віддалені вимикачі, недокументований
  lock-in даних, анти-ремонтні заходи чи приховане стеження.
- Похідні роботи залишаються під цією ліцензією (ShareAlike) і мають містити рядок атрибуції:
  *"Based on OwnNet by Serhii Merenkov / Technologies LLC (own-net.com)"*.

Цей репозиторій — канонічне місце публікації самої ліцензії: `license.html` (текст на сайті) та
`OwnNet-Source-License-1.1.txt` (шаблон для інших проєктів; заповніть блок LICENSE PARAMETERS).
Переклади RU/UK мають інформаційний характер — юридично переважає англійський текст (розділ 11.7).
