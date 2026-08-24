# Package Dependencies for Biodrops Water Report PDF

To generate the exact BQMS Water Quality Report PDF in the Biodrops project, install the following packages.

## 1. Required NPM Packages

Run one of the following commands in the Biodrops project root:

### Using NPM:
```bash
npm install pdfmake@^0.3.11 date-fns@^4.4.0
npm install --save-dev @types/pdfmake@^0.3.3
```

### Using PNPM:
```bash
pnpm add pdfmake@^0.3.11 date-fns@^4.4.0
pnpm add -D @types/pdfmake@^0.3.3
```

### Using Yarn:
```bash
yarn add pdfmake@^0.3.11 date-fns@^4.4.0
yarn add -D @types/pdfmake@^0.3.3
```

### Using Bun:
```bash
bun add pdfmake@^0.3.11 date-fns@^4.4.0
bun add -d @types/pdfmake@^0.3.3
```

---

## 2. Dependency Specification & Roles

| Package | Version | Required For | Notes |
| :--- | :--- | :--- | :--- |
| `pdfmake` | `^0.3.11` | PDF Document Definition & Binary Renderer | Client & Server PDF creation engine |
| `@types/pdfmake` | `^0.3.3` | TypeScript Types for PDFMake | Type safety and doc definition autocompletion |
| `date-fns` | `^4.4.0` (or `^3.x`) | Date formatting in metadata / helpers | Optional if you already have date formatting |

---

## 3. Fonts & Assets Notes

* **No external font files (`.ttf` / `.otf`) need to be downloaded or copied to disk**:
  `pdfmake` includes standard Roboto fonts inside `pdfmake/build/vfs_fonts`.
* **No external images or CDN URLs required**:
  All header banners, lab certification logos, watermarks, and signature banners are pre-encoded in Base64 within `assets/images.ts`.
* **No Headless Chrome or Puppeteer required**:
  Generation is fast, lightweight, and operates in pure JavaScript in memory (both in browser tabs and serverless / Node environments).
