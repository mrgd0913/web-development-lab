# Лаб 8 — Bootstrap ба Tailwind

Ц.Маргад · B251870025

1. ZIP-ээ задална.
2. `lab8` хавтсыг өмнөх лабораториудтайгаа зэрэгцүүлж тавина.
3. VS Code-д `lab8/index.html` дээр Go Live дарна.
4. Bootstrap, Tailwind, Харьцуулалт гэсэн гурван холбоосоор үзнэ.

Bootstrap-ийн CSS, JavaScript нь CDN-ээс ачаалагдах тул интернет шаардлагатай.
Tailwind-ийн бэлэн `tailwind.css` орсон. Зүгээр үзэхэд npm ажиллуулах шаардлагагүй.

## Tailwind кодоо өөрчлөх

Терминалаа `lab8` хавтсанд нээгээд нэг удаа:

```bash
npm install
```

Засвар хийх үед:

```bash
npm run watch
```

`tailwind.html` дэх class болон `src/input.css` дэх өнгөө өөрчлөөд Ctrl+S дарна.
Дуусахдаа терминалд Ctrl+C дарж, дараах командыг ажиллуулна:

```bash
npm run build
```

Энэ нь Tailwind CSS-ийг нэг удаа үүсгэж, хэмжээг нь багасгана.

## Шаардлагууд

- `bootstrap.html`: Bootstrap navbar, 1/2/3 баганатай card grid, form validation.
- `tailwind.html`: ижил агуулга, Tailwind utility class, CLI build.
- Bootstrap dark mode: `data-bs-theme`.
- Tailwind dark mode: `@custom-variant dark`.
- Bootstrap brand товч: `bootstrap.css` дэх `.btn-brand`, `--brand`.
- Tailwind brand өнгө: `src/input.css` дэх `@theme`, `--color-brand`.
- `comparison.html`: хэмжээ, class тоо, Lighthouse хэмжилт, дүгнэлт.
- Зургуудын эх сурвалжийг зураг дээр дарж харна.
- Форм мэдээллийг зөв бөглөсөн эсэхийг шалгана. Серверт илгээхгүй.

## GitHub-д оруулах

`lab8` хавтсаа repository-д нэмээд commit/push хийнэ. `node_modules` оруулахгүй.
Үндсэн `index.html` дотор энэ холбоосыг нэмнэ:

```html
<a href="lab8/">Лаб 8</a>
```

Бусад лабораторийн хуудаснаас:

```html
<a href="../lab8/">Лаб 8</a>
```

## Lighthouse дахин хэмжих

Chrome-д Go Live холбоосоо нээнэ → F12 → Lighthouse → Desktop → Analyze page load.
Bootstrap, Tailwind хоёуланг ижил тохиргоогоор хэмжинэ.
`reports` хавтсанд энэ орчинд гарсан бодит JSON тайлангууд бий.
