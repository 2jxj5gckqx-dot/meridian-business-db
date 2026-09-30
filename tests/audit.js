// Regression audit for the VAT Bridge site. Run: node tests/audit.js
// Needs Playwright with Chromium (npm i -g playwright && npx playwright install chromium).
// Checks both languages on desktop and mobile: console errors, external requests, horizontal
// overflow, language leaks (including aria-labels), WCAG contrast, heading order, focus order,
// the compare slider (drag + keyboard), the form (validation + draft mode), internal links,
// the legal pages and the 404 page. Exits 1 when a check fails.
const path = require('path'), fs = require('fs');
let chromium; try { ({ chromium } = require('playwright')); } catch (e) { ({ chromium } = require('/opt/node22/lib/node_modules/playwright')); }
const http = require('http'), csp = require('./csp');
const root = path.resolve(__dirname, '..', 'site') + path.sep;
const out = path.join(__dirname, 'out') + path.sep; fs.mkdirSync(out, { recursive: true });
// serve the folder over http so that CSP 'self', fonts and relative links behave as on a real host
const TYPES = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'text/javascript', '.svg': 'image/svg+xml', '.png': 'image/png', '.woff2': 'font/woff2', '.txt': 'text/plain', '.xml': 'application/xml' };
const server = http.createServer((req, res) => { const f = path.join(root, decodeURIComponent(req.url.split('?')[0].split('#')[0]).replace(/\/$/, '/index.html')); if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); } res.writeHead(200, { 'Content-Type': TYPES[path.extname(f)] || 'application/octet-stream' }); fs.createReadStream(f).pipe(res); });
let base = ''; const url = f => base + f;
const failures = [];
const fail = (where, what) => failures.push(where + ': ' + what);

async function pageChecks(p, lang) {
  return p.evaluate(({ lang }) => {
    const W = document.documentElement.clientWidth;
    const vis = e => { const cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; };
    const overflow = []; if (document.documentElement.scrollWidth > W + 1) overflow.push('hscroll ' + document.documentElement.scrollWidth);
    document.querySelectorAll('body *').forEach(e => { const r = e.getBoundingClientRect(); if (r.width && (r.right > W + 1 || r.left < -1) && !e.closest('.orb, .geo, .skip') && vis(e)) overflow.push(e.tagName + '.' + e.className); });
    const HEr = /[֐-׿]/, LATr = /[A-Za-z]{3,}/;
    const brand = /MDPS|VAT Bridge|Mazalit|WhatsApp|Financial Services|HTTPS|WCAG|IP|AA|English|עברית/g;
    const allow = /^(\s|MDPS|VAT Bridge|Mazalit|Financial Services|WhatsApp|Email|Rubik|[\d,.:;()\-–—'’"·%₪+@a-z]|en-GB|English|עברית)+$/;
    const leaks = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT); let n;
    while ((n = walker.nextNode())) {
      const t = n.textContent.trim(); if (!t) continue; const el = n.parentElement; if (!el || el.closest('script,style,#langBtn,[hidden],.lang,.skip')) continue; if (!vis(el)) continue;
      if (allow.test(t) || /^[\w.+-]+@[\w.-]+$/.test(t)) continue;
      if (lang === 'he' && LATr.test(t.replace(brand, ''))) leaks.push('LAT in HE: ' + t.slice(0, 60));
      if (lang === 'en' && HEr.test(t)) leaks.push('HE in EN: ' + t.slice(0, 60));
    }
    const ariaLeaks = [];
    document.querySelectorAll('[aria-label],[title],[placeholder]').forEach(e => { for (const a of ['aria-label', 'title', 'placeholder']) { const v = e.getAttribute(a); if (!v || /^(MDPS|VAT Bridge|Mazalit)$/.test(v)) continue; if (lang === 'he' && LATr.test(v.replace(brand, ''))) ariaLeaks.push(a + '="' + v + '"'); if (lang === 'en' && HEr.test(v)) ariaLeaks.push(a + '="' + v + '"'); } });
    const lum = c => { const m = c.match(/[\d.]+/g).map(Number); const [r, g, b] = m.slice(0, 3).map(v => { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }); return { L: .2126 * r + .7152 * g + .0722 * b, a: m.length > 3 ? m[3] : 1 }; };
    // nearest solid background; elements inside the fixed nav or dark sections sit on navy
    const bgOf = e => { let x = e; while (x && x !== document.documentElement) { const cs = getComputedStyle(x); const bg = cs.backgroundColor; if (lum(bg).a >= .95) return bg; if (x.matches('.btn.white, .pill')) return 'rgb(255,255,255)'; if (x.matches('.card, .nav, .dark, footer.dark, .tile.dark')) return 'rgb(13,38,96)'; if (cs.backgroundImage !== 'none') return null; x = x.parentElement; } return getComputedStyle(document.body).backgroundColor; };
    const low = [], seen = new Set();
    document.querySelectorAll('h1,h2,h3,p,a,span,label,li,summary,button,small,b,em,td,th,input,dt,dd,div').forEach(e => {
      if (!vis(e) || e.closest('.skip')) return; const txt = [...e.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent.trim()).join('') || (e.tagName === 'INPUT' ? e.value : ''); if (!txt) return;
      const cs = getComputedStyle(e); if (lum(cs.color).a < .5) return; const bg = bgOf(e); if (!bg) return;
      const L1 = lum(cs.color).L, L2 = lum(bg).L; const ratio = (Math.max(L1, L2) + .05) / (Math.min(L1, L2) + .05);
      const size = parseFloat(cs.fontSize), bold = parseInt(cs.fontWeight) >= 700; const large = size >= 24 || (size >= 18.66 && bold); const need = large ? 3 : 4.5;
      if (ratio < need) { const k = e.tagName + '.' + e.className + '|' + cs.color + '|' + bg; if (!seen.has(k)) { seen.add(k); low.push({ el: e.tagName + '.' + e.className, text: txt.slice(0, 30), ratio: +ratio.toFixed(2), need }); } }
    });
    const hs = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].filter(vis).map(h => +h.tagName[1]); const hIssues = []; for (let i = 1; i < hs.length; i++) if (hs[i] > hs[i - 1] + 1) hIssues.push(hs[i - 1] + '->' + hs[i]); if (hs.filter(x => x === 1).length !== 1) hIssues.push('h1 count ' + hs.filter(x => x === 1).length);
    const noName = [...document.querySelectorAll('button,a[href],input:not([type=hidden]),select,textarea,[role=button],[role=slider]')].filter(vis).filter(e => { if (e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.getAttribute('title') || e.getAttribute('aria-hidden') === 'true') return false; if (e.tagName === 'INPUT') return !document.querySelector('label[for="' + e.id + '"]') && !e.closest('label') && !e.placeholder; return !e.textContent.trim() && !e.querySelector('img[alt],svg[role=img]'); }).map(e => e.tagName + '.' + e.className + '#' + e.id);
    const smallTargets = [...document.querySelectorAll('.fcol > a, button, summary, [role=slider]')].filter(vis).filter(e => { const r = e.getBoundingClientRect(); return r.width < 24 || r.height < 24; }).map(e => e.tagName + '.' + e.className + ' ' + Math.round(e.getBoundingClientRect().width) + 'x' + Math.round(e.getBoundingClientRect().height));
    return { lang: document.documentElement.lang, dir: document.documentElement.dir, title: document.title, overflow: [...new Set(overflow)], leaks: [...new Set(leaks)], ariaLeaks, low, hIssues, noName, smallTargets, rubik: document.fonts.check('400 16px Rubik') && document.fonts.check('700 16px Rubik') };
  }, { lang });
}
function judge(where, c, lang) {
  if (c.lang !== lang) fail(where, 'html lang is ' + c.lang);
  if (c.dir !== (lang === 'he' ? 'rtl' : 'ltr')) fail(where, 'dir is ' + c.dir);
  if (c.overflow.length) fail(where, 'overflow ' + c.overflow.join(', '));
  if (c.leaks.length) fail(where, 'language leaks ' + c.leaks.join(' | '));
  if (c.ariaLeaks.length) fail(where, 'aria/title leaks ' + c.ariaLeaks.join(' | '));
  if (c.low.length) fail(where, 'low contrast ' + JSON.stringify(c.low));
  if (c.hIssues.length) fail(where, 'headings ' + c.hIssues.join(', '));
  if (c.noName.length) fail(where, 'controls without a name ' + c.noName.join(', '));
  if (c.smallTargets.length) fail(where, 'small targets ' + c.smallTargets.join(', '));
  if (!c.rubik) fail(where, 'Rubik not loaded');
}

(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r)); base = 'http://127.0.0.1:' + server.address().port + '/';
  const b = await chromium.launch(); // no proxy: the site must not need any network access beyond the local server
  for (const lang of ['he', 'en']) for (const [name, w, h] of [['desk', 1440, 900], ['mob', 390, 844], ['narrow', 320, 700]]) {
    const key = lang + '-' + name; const p = await b.newPage({ ignoreHTTPSErrors: true, viewport: { width: w, height: h } });
    const errs = [], ext = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); }); p.on('request', r => { if (!r.url().startsWith(base)) ext.push(r.url()); });
    await p.goto(url('index.html' + (lang === 'en' ? '?lang=en' : '')), { waitUntil: 'networkidle' }); await p.waitForTimeout(2600);
    if (errs.length) fail(key, 'console ' + errs.join(' | ')); if (ext.length) fail(key, 'external requests ' + ext.join(', '));
    judge(key + ' top', await pageChecks(p, lang), lang);
    // nav children must not overlap or be clipped
    const nav = await p.evaluate(() => { const W = innerWidth; const els = [...document.querySelectorAll('#nav > *')].filter(e => getComputedStyle(e).display !== 'none').map(e => { const r = e.getBoundingClientRect(); return { n: e.className, l: r.left, r: r.right, sw: e.scrollWidth, cw: e.clientWidth }; }); const ov = []; for (let i = 0; i < els.length; i++) for (let j = i + 1; j < els.length; j++) { const a = els[i], c = els[j]; if (a.l < c.r - 1 && c.l < a.r - 1) ov.push(a.n + ' x ' + c.n); } return { ov, clipped: els.filter(e => e.r > W + 1 || e.l < -1 || e.sw > e.cw + 1).map(e => e.n) }; });
    if (nav.ov.length) fail(key, 'nav overlap ' + nav.ov.join(', ')); if (nav.clipped.length) fail(key, 'nav clipped ' + nav.clipped.join(', '));
    await p.screenshot({ path: `${out}${key}-hero.png` });
    // tab order from a fresh load
    const stops = []; for (let i = 0; i < 8; i++) { await p.keyboard.press('Tab'); stops.push(await p.evaluate(() => { const a = document.activeElement, cs = getComputedStyle(a); return (a.id ? '#' + a.id : a.tagName + '.' + String(a.className).slice(0, 14)) + (cs.outlineStyle !== 'none' || cs.boxShadow !== 'none' ? '' : ' [no-ring]'); })); }
    if (stops[0] !== 'A.skip') fail(key, 'first tab stop is ' + stops[0]); if (!stops.includes('#langBtn') || !stops.includes('#cmp')) fail(key, 'tab order ' + stops.join(' > ')); if (stops.some(s => s.includes('[no-ring]'))) fail(key, 'missing focus ring ' + stops.join(' > '));
    // compare block
    await p.evaluate(() => document.getElementById('journey').scrollIntoView()); await p.waitForTimeout(6000);
    for (let i = 0, last = null; i < 25; i++) { const x = await p.evaluate(() => document.getElementById('cmp').style.getPropertyValue('--x')); if (x === last) break; last = x; await p.waitForTimeout(300); } // wait for the demo sweep to settle
    const badge = await p.evaluate(() => [...document.querySelectorAll('.badge')].map(bd => { const cs = getComputedStyle(bd), rr = bd.getBoundingClientRect(), c = bd.parentElement.querySelector('.card').getBoundingClientRect(); return cs.position === 'absolute' && cs.backgroundColor === 'rgb(129, 255, 236)' && rr.width > 0 && cs.opacity !== '0' && rr.left < c.right + 20 && rr.right > c.left - 20 && rr.top < c.bottom + 20 && rr.bottom > c.top - 20; }));
    if (!badge.length || badge.some(x => !x)) fail(key, 'badge not stamped on the card');
    const rest = await p.evaluate(() => ({ x: parseFloat(document.getElementById('cmp').style.getPropertyValue('--x')), amt: document.getElementById('cmpAmt').textContent, now: document.getElementById('cmp').getAttribute('aria-valuenow'), vt: document.getElementById('cmp').getAttribute('aria-valuetext') }));
    if (Math.abs(rest.x - (w <= 760 ? 50 : 58)) > 1) fail(key, 'compare rest position ' + rest.x); if (rest.amt !== '₪180,000') fail(key, 'compare amount ' + rest.amt); if (!rest.vt || rest.now === null) fail(key, 'slider aria values missing');
    await p.focus('#cmp'); await p.keyboard.press('ArrowLeft'); await p.keyboard.press('ArrowLeft'); await p.waitForTimeout(150);
    const afterKeys = await p.evaluate(() => parseFloat(document.getElementById('cmp').style.getPropertyValue('--x'))); if (Math.abs(afterKeys - (rest.x - 8)) > .5) fail(key, 'keyboard did not move the handle: ' + rest.x + ' -> ' + afterKeys);
    const hb = await p.evaluate(() => { const r = document.querySelector('#cmp .handle').getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; });
    await p.mouse.move(hb.x, hb.y); await p.mouse.down(); await p.mouse.move(hb.x + 120, hb.y, { steps: 8 }); await p.mouse.up(); await p.waitForTimeout(150);
    const afterDrag = await p.evaluate(() => parseFloat(document.getElementById('cmp').style.getPropertyValue('--x'))); if (Math.abs(afterDrag - afterKeys) < 5) fail(key, 'drag did not move the handle');
    await p.screenshot({ path: `${out}${key}-compare.png` });
    // form
    await p.evaluate(() => document.getElementById('request').scrollIntoView()); await p.waitForTimeout(700);
    if (name !== 'desk') { const pillOn = await p.evaluate(() => document.querySelector('.pill').classList.contains('on')); if (pillOn) fail(key, 'bottom pill covers the form'); }
    await p.click('#requestForm button[type=submit]'); await p.waitForTimeout(250);
    let m = await p.evaluate(() => ({ t: document.getElementById('formMsg').textContent, c: document.getElementById('formMsg').className })); if (m.c !== 'msg warn' || !m.t) fail(key, 'empty form not rejected');
    await p.fill('#f-first', 'Test'); await p.fill('#f-last', 'User'); await p.fill('#f-phone', '0500000000'); await p.fill('#f-email', 'bad'); await p.fill('#f-tax', '123456789'); await p.check('#f-consent');
    await p.click('#requestForm button[type=submit]'); await p.waitForTimeout(250); m = await p.evaluate(() => document.getElementById('formMsg').className); if (m !== 'msg warn') fail(key, 'bad email accepted');
    await p.fill('#f-email', 'a@b.co'); await p.click('#requestForm button[type=submit]'); await p.waitForTimeout(250);
    m = await p.evaluate(() => document.getElementById('formMsg').textContent); const FORM_TO = await p.evaluate(() => typeof FORM_TO === 'string' ? FORM_TO : null); if (FORM_TO === '' && !/Draft|טיוטה/.test(m)) fail(key, 'draft message missing: ' + m);
    await p.screenshot({ path: `${out}${key}-form.png` });
    judge(key + ' form', await pageChecks(p, lang), lang);
    // faq + footer
    await p.evaluate(() => document.getElementById('faq').scrollIntoView()); await p.waitForTimeout(600);
    const s0 = await p.$('#faq summary'); await s0.focus(); await p.keyboard.press('Enter'); await p.waitForTimeout(150); if (!await p.evaluate(() => document.querySelector('#faq details').open)) fail(key, 'FAQ does not open with the keyboard');
    await p.evaluate(() => scrollTo(0, document.body.scrollHeight)); await p.waitForTimeout(800); await p.screenshot({ path: `${out}${key}-footer.png` });
    judge(key + ' bottom', await pageChecks(p, lang), lang);
    const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))]);
    for (const h of links) { if (h.startsWith('#')) { if (h.length > 1 && !await p.evaluate(h => !!document.querySelector(h), h)) fail(key, 'anchor missing ' + h); } else if (!/^(https?:|mailto:|tel:)/.test(h) && !fs.existsSync(path.join(root, h.split(/[?#]/)[0]))) fail(key, 'file missing ' + h); }
    // language toggle keeps the transient message in the new language
    await p.click('#langBtn'); await p.waitForTimeout(700); const other = lang === 'he' ? 'en' : 'he';
    judge(key + ' toggled', await pageChecks(p, other), other);
    await p.close();
  }
  for (const f of ['legal/privacy.html', 'legal/terms.html', 'legal/accessibility.html', '404.html']) for (const [name, w] of [['desk', 1440], ['mob', 390]]) {
    const key = f + '-' + name; const p = await b.newPage({ ignoreHTTPSErrors: true, viewport: { width: w, height: 900 } }); const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') errs.push(m.text()); });
    await p.goto(url(f), { waitUntil: 'networkidle' }); await p.waitForTimeout(300); if (errs.length) fail(key, 'console ' + errs.join(' | '));
    judge(key + ' he', await pageChecks(p, 'he'), 'he');
    const links = await p.evaluate(() => [...new Set([...document.querySelectorAll('a[href]')].map(a => a.getAttribute('href')))]);
    for (const h of links) if (!/^(https?:|mailto:|tel:|#)/.test(h) && !fs.existsSync(path.resolve(path.dirname(path.join(root, f)), h.split(/[?#]/)[0]))) fail(key, 'file missing ' + h);
    if (name === 'desk') await p.screenshot({ path: `${out}${f.replace(/[\/.]/g, '_')}-he.png`, fullPage: true });
    await p.click('#langBtn'); await p.waitForTimeout(250); judge(key + ' en', await pageChecks(p, 'en'), 'en');
    if (name === 'desk') await p.screenshot({ path: `${out}${f.replace(/[\/.]/g, '_')}-en.png`, fullPage: true });
    await p.close();
  }
  await b.close(); server.close();
  // static checks: CSP tags up to date, no stray e-mail address or personal pattern, no stale claims
  for (const f of csp.PAGES) { const r = csp.check(f); if (!r.ok) fail(f, r.present ? 'CSP meta tag is stale, run node tests/csp.js --write' : 'CSP meta tag missing'); }
  const personal = (process.env.PRIVATE_PATTERNS || '').split(',').filter(Boolean).map(s => new RegExp(s, 'i'));
  const all = []; const walk = d => fs.readdirSync(d).forEach(n => { const q = path.join(d, n); fs.statSync(q).isDirectory() ? walk(q) : /\.(html|css|txt|xml|md|svg)$/.test(n) && all.push(q); }); walk(root);
  for (const q of all) { const t = fs.readFileSync(q, 'utf8'); const mails = (t.match(/[\w.+-]+@[\w-]+\.[\w.-]+/g) || []).filter(m => !/@(mdps\.co\.il|mazalit\.com)$/i.test(m)); if (mails.length) fail(q, 'unexpected e-mail address ' + [...new Set(mails)].join(', ')); if (personal.some(r => r.test(t))) fail(q, 'private pattern present'); if (/\bexempt\b|₪64|64B/i.test(t)) fail(q, 'forbidden wording'); if (/\d+ days (after|of) approval/i.test(t)) fail(q, 'a number of days after approval is promised'); }
  if (failures.length) { console.log('FAILED (' + failures.length + ')'); failures.forEach(f => console.log(' - ' + f)); process.exit(1); }
  console.log('OK: all checks passed. Screenshots in ' + out);
})().catch(e => { console.error('AUDIT CRASH', e); process.exit(1); });
