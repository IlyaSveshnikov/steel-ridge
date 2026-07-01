# SteelRidge — лендинг кровельной компании

Одностраничный сайт-лендинг для кровельной компании: монтаж кровли, изготовление доборных
элементов, аренда строительных лесов и поставка материалов.

🔗 **Живой сайт:** https://ilyasveshnikov.github.io/steel-ridge/


## Возможности

- **Hero в стиле чертежа** — blueprint-сетка и слот под схематичный макет крыши
  (`assets/hero-art.svg`, справа акцентом; если файла нет — аккуратно скрывается), плавное появление.
- **Параллакс** и анимация появления секций на скролле (`IntersectionObserver`).
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

Чистый **HTML + CSS + ванильный JavaScript**, без зависимостей и сборки. Весь сайт — один
`index.html` + статические ассеты. Шрифты — Bebas Neue / DM Sans (Google Fonts).

## Локальный запуск

```bash
python3 -m http.server 8000
# открыть http://localhost:8000
```

## Структура

```
index.html              # вся разметка, стили и скрипты
assets/
  hero-poster.webp      # превью для Open Graph / Twitter
  works/work-1..5.webp  # фото работ
robots.txt · sitemap.xml · manifest.webmanifest
```

## Деплой

GitHub Pages: Settings → Pages → Source: ветка `main`, папка `/ (root)`.
