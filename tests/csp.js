// Content-Security-Policy for the static pages, delivered as a <meta> tag with hashes of the inline
// script and style blocks (no 'unsafe-inline'). `node tests/csp.js --write` rewrites the tags after an
// edit; tests/audit.js checks that the tags match the current page content.
const fs = require('fs'), path = require('path'), crypto = require('crypto');
const site = path.resolve(__dirname, '..', 'site');
const PAGES = ['index.html', 'legal/privacy.html', 'legal/terms.html', 'legal/accessibility.html', '404.html'];
const hash = s => "'sha256-" + crypto.createHash('sha256').update(s, 'utf8').digest('base64') + "'";
const blocks = (html, tag) => [...html.matchAll(new RegExp('<' + tag + '>([\\s\\S]*?)</' + tag + '>', 'g'))].map(m => m[1]);
function policy(file, html) {
  const scripts = blocks(html, 'script').map(hash).join(' '), styles = blocks(html, 'style').map(hash);
  const main = file === 'index.html';
  return ["default-src 'none'", "base-uri 'none'", "form-action " + (main ? "'self' https://formsubmit.co" : "'none'"), "connect-src " + (main ? 'https://formsubmit.co' : "'none'"), "font-src 'self'", "img-src 'self'", "style-src 'self'" + (styles.length ? ' ' + styles.join(' ') : ''), 'script-src ' + (scripts || "'none'")].join('; ');
}
const TAG = /<meta http-equiv="Content-Security-Policy" content="[^"]*">/;
function expectedTag(file, html) { return '<meta http-equiv="Content-Security-Policy" content="' + policy(file, html) + '">'; }
function check(file) { const html = fs.readFileSync(path.join(site, file), 'utf8'); const m = html.match(TAG); return { ok: !!m && m[0] === expectedTag(file, html), present: !!m }; }
function write(file) { const p = path.join(site, file); let html = fs.readFileSync(p, 'utf8'); const tag = expectedTag(file, html); if (TAG.test(html)) html = html.replace(TAG, tag); else html = html.replace('<meta charset="utf-8">', '<meta charset="utf-8">' + tag); fs.writeFileSync(p, html); }
module.exports = { PAGES, check, policy };
if (require.main === module) { if (process.argv.includes('--write')) { PAGES.forEach(write); console.log('CSP tags written'); } PAGES.forEach(f => { const r = check(f); console.log((r.ok ? 'ok   ' : 'STALE') + ' ' + f); if (!r.ok) process.exitCode = 1; }); }
