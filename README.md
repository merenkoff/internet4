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

- `index.html` — головна сторінка з маніфестом.
- `styles.css` — стилі.
- Далі можна додати сторінки кейсів або посилання на GitHub з архітектурними принципами.
