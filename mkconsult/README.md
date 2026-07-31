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

## Contact Form Email

For reliable delivery on SuperHosting, create a mailbox in cPanel, for example `finance@emkaconsult.bg`.

Then copy:

```bash
cp frontend/public/contact-config.example.php frontend/public/contact-config.php
```

Edit `frontend/public/contact-config.php` and set:

- the exact SMTP host shown in SuperHosting/cPanel
- the mailbox username
- the mailbox password

Then rebuild:

```bash
cd frontend
pnpm build
```

Upload the contents of `frontend/dist/` to `public_html`.
