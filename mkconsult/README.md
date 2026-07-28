# MK Consult Website

Static React/Vite website with a PHP contact endpoint for shared hosting.

## Local development

```bash
cd frontend
pnpm install
pnpm dev
```

## Production build

```bash
cd frontend
pnpm build
```

Upload the contents of `frontend/dist/` to SuperHosting's `public_html` directory.

The build includes `contact.php`, which sends contact form submissions to `finance@emkaconsult.bg`.
