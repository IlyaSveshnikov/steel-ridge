# SteelRidge — лендинг кровельной компании

Одностраничный сайт-лендинг для кровельной компании: монтаж кровли, изготовление доборных
элементов, аренда строительных лесов и поставка материалов.

🔗 **Живой сайт:** https://ilyasveshnikov.github.io/steel-ridge/


## Возможности

- **Индустриальный hero без изображений** — blueprint-сетка, анимированная «hazard»-полоса,
  угловые метки и световой блик, всё на чистом CSS; параллакс и плавное появление контента.
- **Анимация появления** секций на скролле (`IntersectionObserver`).
- **Галерея работ** в bento-сетке с доступным lightbox (навигация ←/→, Esc, фокус-возврат).
- **Калькулятор стоимости** кровли с живым пересчётом (материал, площадь, сложность, доп. услуги).
- Секции **отзывов** и **FAQ-аккордеона**, блок гарантий.
- **Count-up** анимация ключевых цифр.
- **Форма заявки** с валидацией, маской телефона и состояниями (демо — без бэкенда).
- **SEO**: мета-теги, Open Graph / Twitter Card, JSON-LD (`RoofingContractor`), `sitemap.xml`,
  `robots.txt`, `manifest.webmanifest`.
- **Доступность**: skip-link, `:focus-visible`, ARIA для меню и интерактивных компонентов,
  фокус-трап в модалках.

## Стек

Чистый **HTML + CSS + ванильный JavaScript**, без зависимостей и сборки. Разметка, стили и
скрипты разнесены по отдельным файлам (`index.html` · `css/styles.css` · `js/main.js`).
Шрифты — Bebas Neue / DM Sans (Google Fonts).

## Локальный запуск

```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```

## Структура

```
index.html              # разметка + мета-теги, JSON-LD
css/styles.css          # все стили
js/main.js              # вся интерактивность
assets/
  works/work-1..5.webp  # фото работ
  icon.svg · icon-180/192/512.png  # favicon / apple-touch / PWA
robots.txt · sitemap.xml · manifest.webmanifest
```

## Деплой

GitHub Pages: Settings → Pages → Source: ветка `main`, папка `/ (root)`.
