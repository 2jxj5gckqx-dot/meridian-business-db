# -*- coding: utf-8 -*-
"""Rapport de verification VAT Bridge : Markdown -> PDF paysage A4."""
import re, sys
from urllib.parse import quote
from bidi import get_display
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib.units import mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from reportlab.platypus import (BaseDocTemplate, PageTemplate, Frame, Paragraph,
                                Spacer, Table, TableStyle, PageBreak, CondPageBreak)

SRC, OUT = sys.argv[1], sys.argv[2]

D = '/usr/share/fonts/truetype/dejavu/'
pdfmetrics.registerFont(TTFont('DJ', D + 'DejaVuSans.ttf'))
pdfmetrics.registerFont(TTFont('DJ-B', D + 'DejaVuSans-Bold.ttf'))
pdfmetrics.registerFontFamily('DJ', normal='DJ', bold='DJ-B', italic='DJ', boldItalic='DJ-B')

# ---------------- bidi : on ne retourne QUE les sequences hebraiques ----------------
HEB = re.compile(r'[֐-׿]')
HEB_RUN = re.compile(
    r'[֐-׿](?:[֐-׿0-9\s.,;:\'"’׳״%()\[\]\-–—/]*'
    r'[֐-׿0-9%])?')

def bidi_line(line):
    return HEB_RUN.sub(lambda m: get_display(m.group(0), base_dir='R'), line)

def _bw(txt, font, size, bold_in):
    """Largeur reelle en tenant compte des segments gras (sentinelles)."""
    w, bold, buf = 0.0, bold_in, ''
    bf = 'DJ-B' if font == 'DJ' else font
    for ch in txt:
        if ch in ('\x01', '\x02'):
            w += pdfmetrics.stringWidth(buf, bf if bold else font, size); buf = ''
            bold = (ch == '\x01')
        else:
            buf += ch
    w += pdfmetrics.stringWidth(buf, bf if bold else font, size)
    return w, bold

def wrap_logical(text, font, size, maxw):
    """Decoupe en lignes a la largeur voulue, en suivant l'etat gras d'une ligne a l'autre."""
    out, bold_in = [], False
    for para in text.split('\n'):
        cur, cur_bold_in = '', bold_in
        for w in para.split(' '):
            trial = (cur + ' ' + w).strip()
            width, _ = _bw(trial, font, size, cur_bold_in)
            if not cur or width <= maxw:
                cur = trial
            else:
                out.append(cur)
                _, cur_bold_in = _bw(cur, font, size, cur_bold_in)
                cur = w
        out.append(cur)
        _, bold_in = _bw(cur, font, size, cur_bold_in)
    return out

def esc(t):
    return t.replace('&', '&amp;').replace('<', '&lt;').replace('>', '&gt;')

B1, B2 = '\x01', '\x02'

def md_inline(t):
    t = esc(t)
    t = re.sub(r'\*\*(.+?)\*\*', r'<b>\1</b>', t)
    return t.replace('`', '').replace('*', '')

def to_sentinels(t):
    t = re.sub(r'\*\*(.+?)\*\*', B1 + r'\1' + B2, t, flags=re.S)
    return t.replace('`', '').replace('*', '')

def sent_line(line, opened):
    """<b> equilibre sur chaque ligne ; renvoie (html, etat_gras)."""
    out = esc(line.replace(B1, '').replace(B2, ''))
    parts, idx, cur = [], 0, opened
    res = ''
    for ch in line:
        if ch == B1:
            res += '<b>'; cur = True
        elif ch == B2:
            res += '</b>'; cur = False
        else:
            res += esc(ch)
    if opened:
        res = '<b>' + res
    if cur:
        res = res + '</b>'
    return res, cur

def enc_urls(t):
    """Encode les caracteres non ASCII des URL pour qu'elles restent copiables."""
    return re.sub(r'https?://\S+',
                  lambda m: re.sub(r'[^\x00-\x7F]+',
                                   lambda n: quote(n.group(0), safe=''), m.group(0)), t)

STATUS = [('✅', 'CONFIRMÉ', colors.HexColor('#1a7f37')),
          ('⚠️', 'PARTIEL', colors.HexColor('#b26a00')),
          ('⚠',  'PARTIEL', colors.HexColor('#b26a00')),
          ('❌', 'FAUX', colors.HexColor('#b3261e')),
          ('❓', 'INTROUVABLE', colors.HexColor('#5f6368'))]

def demoji(t):
    for k, lab, _ in STATUS:
        t = t.replace(k, lab)
    return t

def status_color(t):
    for k, _, col in STATUS:
        if k in t:
            return col
    return colors.black

def split_status(t, limit=50):
    """'⚠️ (biens ✅ ...)' -> ('PARTIEL', 'biens CONFIRMÉ ...')"""
    t = t.strip()
    if len(demoji(t)) <= limit:
        return demoji(t), ''
    labels, rest = [], t
    m = re.match(r'^((?:[✅⚠️⚠❌❓]\s*(?:/|et|ou)?\s*)+)(.*)$', t)
    if m:
        labels = demoji(m.group(1)).strip()
        labels = re.sub(r'\s+', ' ', labels)
        rest = m.group(2).strip()
    else:
        labels, rest = demoji(t), ''
    rest = rest.strip(' :;-')
    if rest.startswith('(') and rest.endswith(')'):
        rest = rest[1:-1].strip()
    rest = re.sub(r'^nuance\s*:\s*', '', rest, flags=re.I)
    return labels or demoji(t), demoji(rest)

def P(text, style, width=None):
    """Paragraphe ; si hebreu present, pre-decoupe puis reordonne chaque ligne."""
    text = demoji(text)
    if HEB.search(text) and width:
        marked = to_sentinels(text)
        lines = wrap_logical(marked, style.fontName, style.fontSize, width - 8)
        html, opened = [], False
        for l in lines:
            h, opened = sent_line(bidi_line(l), opened)
            html.append(h)
        return Paragraph('<br/>'.join(html), style)
    return Paragraph(md_inline(text), style)

# ---------------- styles ----------------
def S(n, **kw):
    b = dict(fontName='DJ', fontSize=9, leading=12, textColor=colors.HexColor('#1b1b1b'))
    b.update(kw); return ParagraphStyle(n, **b)

INK  = colors.HexColor('#0b2a4a')
GRID = colors.HexColor('#b9c2cf')
ZEB  = colors.HexColor('#f4f7fb')

st_title = S('t', fontName='DJ-B', fontSize=22, leading=27, textColor=INK, spaceAfter=2)
st_sub   = S('s', fontSize=11, leading=15, textColor=colors.HexColor('#44506b'), spaceAfter=8)
st_h2    = S('h2', fontName='DJ-B', fontSize=13, leading=16, textColor=INK, spaceBefore=4, spaceAfter=6)
st_h3    = S('h3', fontName='DJ-B', fontSize=10.5, leading=13, textColor=INK, spaceBefore=6, spaceAfter=3)
PROSE = dict(leftIndent=14*mm, rightIndent=58*mm)
st_body  = S('b', fontSize=9.2, leading=13, spaceAfter=5, **PROSE)
st_li    = S('li', fontSize=9.2, leading=13, spaceAfter=4.5,
             leftIndent=14*mm + 12, bulletIndent=14*mm + 1, rightIndent=58*mm)
st_note  = S('n', fontSize=8.6, leading=11.5, spaceAfter=3, **PROSE)
st_chdr  = S('ch', fontName='DJ-B', fontSize=7.6, leading=9.4, textColor=colors.white)
st_c     = S('c', fontSize=7.1, leading=8.9)
st_cq    = S('cq', fontSize=6.9, leading=8.7, textColor=colors.HexColor('#33383d'))
st_cu    = S('cu', fontSize=5.9, leading=7.4, textColor=colors.HexColor('#1a4b8c'), wordWrap='CJK')
st_cn    = S('cn', fontName='DJ-B', fontSize=8, leading=9.5, alignment=TA_CENTER)
st_cs    = S('cs', fontName='DJ-B', fontSize=6.6, leading=8.4)
st_cnu   = S('cnu', fontSize=6.8, leading=8.5, textColor=colors.HexColor('#6b5300'))

# ---------------- lecture du markdown ----------------
raw = open(SRC, encoding='utf-8').read().split('\n')
blocks, i = [], 0
while i < len(raw):
    ln = raw[i]
    if ln.startswith('|'):
        tbl = []
        while i < len(raw) and raw[i].startswith('|'):
            tbl.append([c.strip() for c in raw[i].strip().strip('|').split('|')]); i += 1
        blocks.append(('table', [r for r in tbl if not all(set(c) <= set('-: ') for c in r)]))
        continue
    if   ln.startswith('### '): blocks.append(('h3', ln[4:]))
    elif ln.startswith('## '):  blocks.append(('h2', ln[3:]))
    elif ln.startswith('# '):   blocks.append(('h1', ln[2:]))
    elif re.match(r'^\d+\.\s', ln): blocks.append(('ol', ln.split('. ', 1)))
    elif ln.startswith('- '):   blocks.append(('ul', ln[2:]))
    elif ln.strip() == '---':   blocks.append(('hr', ''))
    elif ln.strip():            blocks.append(('p', ln.strip()))
    i += 1

# ---------------- document ----------------
LW, LH = landscape(A4)
doc = BaseDocTemplate(OUT, pagesize=landscape(A4),
                      title="VAT Bridge (Mazalit) - Rapport de verification factuelle",
                      subject="Verification factuelle du pitch deck VAT Bridge - 17/09/2026",
                      author="Rapport de verification",
                      leftMargin=11*mm, rightMargin=11*mm, topMargin=12*mm, bottomMargin=14*mm)

def deco(canv, d):
    canv.saveState()
    canv.setFont('DJ', 7); canv.setFillColor(colors.HexColor('#6b7280'))
    canv.drawString(11*mm, 8*mm,
        "VAT Bridge (Mazalit) — vérification factuelle — sources consultées le 17/09/2026")
    canv.drawRightString(LW - 11*mm, 8*mm, "Page %d" % canv.getPageNumber())
    canv.setStrokeColor(colors.HexColor('#d6dce5'))
    canv.line(11*mm, 10.5*mm, LW - 11*mm, 10.5*mm)
    canv.restoreState()

doc.addPageTemplates([PageTemplate(id='L', pagesize=landscape(A4),
        frames=[Frame(11*mm, 13*mm, LW-22*mm, LH-26*mm, id='f')], onPage=deco)])

COLS = [9*mm, 39*mm, 25*mm, 71*mm, 71*mm, 60*mm]
HDRS = ['#', 'Affirmation du deck', 'Statut', 'Information correcte',
        'Citation exacte (extrait du moteur de recherche)', 'Source : URL / type / date']

def tbl_main(tbl):
    data = [[Paragraph(h, st_chdr) for h in HDRS]]
    for r in tbl[1:]:
        r = (r + [''] * 8)[:8]
        num, claim, stat, info, quote, url, typ, date = r
        lab, nuance = split_status(stat)
        src = enc_urls(url) + ('  —  ' + ' / '.join(x for x in (typ, date) if x) if (typ or date) else '')
        infocell = [P(info, st_c, COLS[3])]
        if nuance:
            infocell.insert(0, P('▸ ' + nuance, st_cnu, COLS[3]))
        data.append([Paragraph(md_inline(num), st_cn),
                     P(claim, st_c, COLS[1]),
                     Paragraph(md_inline(lab), ParagraphStyle('s', parent=st_cs,
                               textColor=status_color(stat))),
                     infocell,
                     P(quote, st_cq, COLS[4]),
                     P(src, st_cu, COLS[5])])
    t = Table(data, colWidths=COLS, repeatRows=1, hAlign='LEFT')
    sty = [('BACKGROUND', (0, 0), (-1, 0), INK),
           ('GRID', (0, 0), (-1, -1), 0.4, GRID),
           ('VALIGN', (0, 0), (-1, -1), 'TOP'),
           ('LEFTPADDING', (0, 0), (-1, -1), 3), ('RIGHTPADDING', (0, 0), (-1, -1), 3),
           ('TOPPADDING', (0, 0), (-1, -1), 3.5), ('BOTTOMPADDING', (0, 0), (-1, -1), 3.5)]
    sty += [('BACKGROUND', (0, k), (-1, k), ZEB) for k in range(2, len(data), 2)]
    t.setStyle(TableStyle(sty)); return t

def tbl_f(tbl):
    data = [[Paragraph(h, st_chdr) for h in ('#', 'Élément', 'Statut')]]
    for r in tbl[1:]:
        r = (r + [''] * 3)[:3]
        data.append([Paragraph(md_inline(r[0]), st_cn), P(r[1], st_c, 110*mm),
                     Paragraph(md_inline(demoji(r[2])),
                               ParagraphStyle('f', parent=st_cs, textColor=colors.HexColor('#5f6368')))])
    t = Table(data, colWidths=[12*mm, 110*mm, 80*mm], repeatRows=1, hAlign='LEFT')
    t.setStyle(TableStyle([('BACKGROUND', (0, 0), (-1, 0), INK),
                           ('GRID', (0, 0), (-1, -1), 0.4, GRID),
                           ('VALIGN', (0, 0), (-1, -1), 'TOP'),
                           ('TOPPADDING', (0, 0), (-1, -1), 4),
                           ('BOTTOMPADDING', (0, 0), (-1, -1), 4)]))
    return t

def legend():
    cells = []
    for _, lab, col in [STATUS[0], STATUS[1], STATUS[3], STATUS[4]]:
        cells.append(Paragraph('<b>%s</b>' % lab,
                     S('lg', fontName='DJ-B', fontSize=8, leading=10, textColor=colors.white)))
    t = Table([cells], colWidths=[34*mm]*4, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), colors.HexColor('#1a7f37')),
        ('BACKGROUND', (1, 0), (1, 0), colors.HexColor('#b26a00')),
        ('BACKGROUND', (2, 0), (2, 0), colors.HexColor('#b3261e')),
        ('BACKGROUND', (3, 0), (3, 0), colors.HexColor('#5f6368')),
        ('ALIGN', (0, 0), (-1, -1), 'CENTER'),
        ('TOPPADDING', (0, 0), (-1, -1), 4), ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
        ('LEFTPADDING', (0, 0), (-1, -1), 6), ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('BOX', (0, 0), (-1, -1), 0.4, colors.white),
        ('INNERGRID', (0, 0), (-1, -1), 1.2, colors.white)]))
    return t

SOMMAIRE = [
    ('A', 'Droit et pratique de la TVA israélienne (10 points)'),
    ('B', 'Chiffres utilisés dans le deck (8 points)'),
    ('C', 'Mazalit : site, licence, actionnaires, outil (4 points)'),
    ('D', 'Concurrents et partenaires (6 points)'),
    ('E', 'Exécution et recouvrement (2 points)'),
    ('F', 'Non vérifiable en ligne : données internes Mazalit (5 points)'),
    ('+', 'Corrections à faire dans le deck (23 items, texte anglais prêt à coller)'),
    ('+', 'Questions à poser à Zeev / Mazalit (14 questions)'),
    ('+', 'Synthèse : les 5 constats les plus importants'),
]

story, first_table = [], True
for kind, val in blocks:
    if kind == 'h1':
        story.append(Paragraph(md_inline(val), st_title))
    elif kind == 'h2':
        if val[:2] in ('A.', 'B.', 'C.', 'D.', 'E.', 'F.'):
            if first_table:
                story.append(PageBreak()); first_table = False
            else:
                story.append(CondPageBreak(75*mm))
        else:
            story.append(CondPageBreak(70*mm))
        story.append(Paragraph(md_inline(demoji(val)), st_h2))
    elif kind == 'h3':
        story.append(Paragraph(md_inline(val), st_h3))
    elif kind == 'p':
        if val.startswith('Légende'):
            story.append(Spacer(1, 3)); story.append(legend()); story.append(Spacer(1, 6))
            story.append(Paragraph('<b>Sommaire</b>', st_h3))
            for k, lab in SOMMAIRE:
                story.append(Paragraph(lab, st_li, bulletText=k))
            continue
        story.append(Paragraph(md_inline(demoji(val)),
                               st_note if val.startswith('Date de consultation') else st_body))
    elif kind == 'ul':
        story.append(Paragraph(md_inline(demoji(val)), st_li, bulletText='•'))
    elif kind == 'ol':
        n, txt = val
        story.append(Paragraph(md_inline(demoji(txt)), st_li, bulletText=n + '.'))
    elif kind == 'table':
        story.append(Spacer(1, 2))
        story.append(tbl_f(val) if len(val[0]) <= 3 else tbl_main(val))

doc.build(story)
print('OK ->', OUT)
