# VAT Bridge — site

Static site, no build step. Copy the whole folder to any web host (for example a sub-domain of mdps.co.il); `index.html` is the entry point.

- `index.html` — the landing page, Hebrew by default with an English switch (`?lang=en` forces English). Rubik is self-hosted in `assets/fonts/`.
- `legal/` — privacy policy, terms of use, accessibility statement, each in Hebrew and English. Items marked *[to be completed by MDPS]* must be filled in before launch.
- Form: set `FORM_TO` in `index.html` to the address that receives requests. Delivery goes through formsubmit.co (first submission sends an activation email to that address; click it once). If delivery fails, the visitor gets a mailto fallback.
- `assets/og.png` — social preview image.

## At launch (once the domain is known)

- Add `<link rel="canonical">`, `<meta property="og:url">` and make `og:image` an absolute URL in `index.html` (social networks ignore relative image URLs), then add a `sitemap.xml` and a `Sitemap:` line in `robots.txt`.
- Fill in the *[to be completed by MDPS]* items in `legal/` (legal name, company number, retention period, accessibility coordinator, hosting and form providers).
- Set `FORM_TO`. The form is protected by a honeypot only; `_captcha` is off in `index.html` to keep the flow short, switch it on if spam becomes a problem.

## Security

- No third-party script, no cookies, no analytics. Fonts are self-hosted. The only outbound call is the form submission to formsubmit.co.
- Each page carries a `Content-Security-Policy` meta tag with hashes of its inline script and style (no `unsafe-inline`). After editing a page's inline `<script>` or `<style>`, run `node tests/csp.js --write` to refresh the hashes; `tests/audit.js` fails if they are stale. Inline `style=""` attributes and inline event handlers are not allowed by this policy, use classes.
- Headers only the web host can send, to configure at launch (a meta tag cannot set them):
  - `Strict-Transport-Security: max-age=31536000; includeSubDomains`
  - `Content-Security-Policy: frame-ancestors 'none'` (add to the header form of the policy, or `X-Frame-Options: DENY`)
  - `X-Content-Type-Options: nosniff`
  - `Referrer-Policy: strict-origin-when-cross-origin`
  - `Permissions-Policy: camera=(), microphone=(), geolocation=()`
  - Serve over HTTPS only, with directory listing disabled.
- Form: requests transit through formsubmit.co (a third party) before reaching the MDPS inbox; the privacy policy must name it. Spam protection is a honeypot field only, because the AJAX flow needs `_captcha` off. After the first activation e-mail, formsubmit offers an alias string that can replace the plain address in `FORM_TO` so the inbox address does not appear in the page source. The reply-to is set from the visitor's e-mail, so advisors should confirm details by phone before acting. If volume or abuse grows, replace formsubmit with an MDPS-owned endpoint (for example behind Cloudflare Turnstile).

## Checks

`node tests/audit.js` (from the repository root, needs Playwright with Chromium) opens the site in Hebrew and English on desktop, mobile and a 320 px screen and fails on: console errors, external requests, horizontal overflow, mixed-language text or ARIA labels, WCAG AA contrast, heading order, missing focus rings, the compare slider (rest position, keyboard, drag, badge), form validation and draft mode, broken links, the legal pages and the 404 page, and any personal identifier or forbidden wording in the files. Screenshots land in `tests/out/`.
