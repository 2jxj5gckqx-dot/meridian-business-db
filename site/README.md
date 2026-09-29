# VAT Bridge — site

Static site, no build step. Copy the whole folder to any web host (for example a sub-domain of mdps.co.il); `index.html` is the entry point.

- `index.html` — the landing page, Hebrew by default with an English switch (`?lang=en` forces English). Rubik is self-hosted in `assets/fonts/`.
- `legal/` — privacy policy, terms of use, accessibility statement, each in Hebrew and English. Items marked *[to be completed by MDPS]* must be filled in before launch.
- Form: set `FORM_TO` in `index.html` to the address that receives requests. Delivery goes through formsubmit.co (first submission sends an activation email to that address; click it once). If delivery fails, the visitor gets a mailto fallback.
- `assets/og.png` — social preview image.
