# VAT Bridge — site

Static site, no build step. Deployed to GitHub Pages by `.github/workflows/pages.yml` from the `site/` folder on `main`.

- `index.html` — the landing page (Montserrat self-hosted in `assets/fonts/`).
- `legal/` — privacy policy, terms of use, accessibility statement. Items marked *[to be completed by MDPS]* must be filled in before launch.
- Form: set `FORM_TO` in `index.html` to the address that receives requests. Delivery goes through formsubmit.co (first submission sends an activation email to that address; click it once). If delivery fails, the visitor gets a mailto fallback.
- `assets/og.png` — social preview image.
