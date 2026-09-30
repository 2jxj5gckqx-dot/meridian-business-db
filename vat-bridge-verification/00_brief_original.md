# Brief original (reçu le 17 septembre 2026)

You are a fact-checking research assistant. Use a web browser (Safari or any available browsing/web-search tool) to verify, in real time, every open or weak point in a business pitch deck. Do NOT invent anything. If you cannot find a reliable source, write "NOT FOUND" and explain what you searched.

## Context
- Project: "VAT Bridge", a new strategy for MAZALIT (Israeli fintech lending to diamond and jewelry businesses, Ramat Gan, CEO Zeev Maimon, website mazalit.com).
- Product: Mazalit advances up to 85% of a business's Israeli VAT refund within days; the client repays when the Israel Tax Authority pays. The advance is secured by goods (diamonds/jewelry) valued by Mazalit and held at Malca-Amit, or (option 2) a smaller advance without moving goods.
- Confirmed by Mazalit's CEO (Sept 2026): all amounts are in shekels (ILS); there is no VAT on diamonds; VAT applies to imported and exported products (exports at 0%) and to services.
- Today's date: check it and date every finding.

## Rules
1. Prefer primary sources: gov.il, Israel Tax Authority (misim.gov.il), Nevo or Knesset for law texts, Bank of Israel (boi.org.il), Israel Diamond Controller / Ministry of Economy, company websites, official filings. Use secondary sources (CPA firm blogs, news) only if no primary source exists, and label them "secondary".
2. Search in Hebrew AND English for every Israeli legal or tax point (e.g. חוק מע"מ סעיף 39, החזר מע"מ, יבוא מע"מ מכס, שעבוד, חשבון נאמנות החזר מע"מ).
3. Quote the exact sentence supporting each finding (short quote) and give the URL.
4. Never change a number because it "sounds right". If sources conflict, list both.
5. Do not edit any files. Only research and report.

## What to verify

### A. Israeli VAT law and practice (highest priority)
1. VAT Law s.39: is a VAT refund due within 30 days of filing, 90 days if the books are audited, 180 days if a criminal investigation is opened? Find the official law text and any recent amendment.
2. Monthly VAT returns: are they due on the 15th of the following month? What is the current turnover threshold for monthly vs bi-monthly filing?
3. s.30: are exported goods zero-rated (0%)? Are exported services also zero-rated, and under what conditions?
4. Import VAT: is VAT charged at customs on imported goods at 18%, and is it deductible as input tax? Are there any deferral or bonded/free-zone schemes that let importers avoid paying it in cash?
5. s.33: exact wording of the VAT exemption for diamond transactions. Does it also cover diamond exports? Can a pure diamond dealer reclaim any input VAT (s.41)?
6. Refund payment: must the refund go only to a bank account in the business's own name? Is a trust account (חשבון נאמנות) for the business's benefit accepted for VAT refunds? Can a VAT refund right be assigned or pledged to a lender (המחאת זכות / שעבוד)?
7. Is there a fast-track ("green track") for VAT refunds for clean filers? Official source only.
8. "Israel Invoices" allocation numbers: confirm the ₪5,000 threshold from 1 June 2026 on gov.il.
9. Current standard VAT rate in Israel (confirm 18%) and any planned change.
10. Status today of the proposed diamond free-trade zone in Israel (2026 budget proposal): approved, pending or dropped? Does it affect VAT or only duties and income taxes?

### B. Numbers used in the deck (in shekels)
11. Current USD/ILS rate (deck uses ₪3.04) and the 2023 average USD/ILS rate.
12. Bank of Israel policy rate (deck: 3.25% since 1 Sept 2026) and the current prime rate (deck: ≈4.75%).
13. Israeli jewelry exports: latest year available (deck uses $854M in 2023, Manufacturers Association of Israel). Find 2024 or 2025 data if published, ideally in ILS.
14. Israeli diamond exports H1 2026 (deck: $2.4B, record low) and full-year 2025.
15. Bank credit to Israel's diamond sector (deck: ₪1.88B in 2024). Look for a 2025 figure.
16. Share of midstream diamond credit from non-bank lenders (deck: >30%, 2023). Any newer figure?
17. Lab-grown diamond wholesale prices (deck: −14% in Q1 2026). Any Q2 2026 update?
18. Union Bank diamond portfolio sold to Peninsula (2020): confirm ≈$91M performing loans and >$160M bad and doubtful debts.

### C. Mazalit (confirm it is still current, not just 2022 web content)
19. Does mazalit.com still describe: loans, lines of credit, advance payments, funding against diamonds and jewelry collateral, digital valuation, insured inspection via logistics partners, answer within 24 hours, partnership with Malca-Amit, subsidiary MDPS? Note the page's last-modified date.
20. Is Mazalit regulated or licensed as a credit provider by the Israel Capital Market Authority? Find it in the official regulator register (רשות שוק ההון, רישיון למתן אשראי).
21. Current shareholders (reported 2017–2019: MID House of Diamonds, Malca-Amit, Benma Diamonds, Novel/Noble Collection, Ari Wolf, H.N.D.). Any newer funding round?
22. Can Mazalit's valuation tool value jewelry, or only loose diamonds?

### D. Competitors and partners
23. Peninsula (Israel): does it still lend to diamond dealers? Its interest rates or pricing for business credit? Any VAT-refund financing product?
24. Any Israeli bank or non-bank lender offering loans against VAT refunds (הלוואה כנגד החזר מע"מ / מימון החזרי מע"מ)? Name, terms, pricing.
25. Mizrahi-Tefahot and Israel Discount Bank: do they still serve diamond dealers at the Israel Diamond Exchange?
26. Owl Financial Group (NY): still offering purchase-buyback financing within ~48 hours?
27. Nivoda Capital: confirm the $60M i80 Group facility (2025) and any newer facility.
28. Malca-Amit: does it offer vault storage and inspection services in Israel (Ramat Gan) specifically, not only abroad?

### E. Enforcement
29. WFDB Inner Rules: confirm that non-compliance with an arbitration award leads to suspension from all affiliated bourses. Can a non-member company (like a lender) bring a claim at the Israel Diamond Exchange if the client signed an arbitration undertaking?
30. Israel Diamond Exchange bylaws on arbitration for disputes with non-members.

### F. Cannot be verified online (list them, do not guess)
- The 40% / 50% / 20% market assumptions, typical refund size per client, Malca-Amit custody fees, Mazalit's pricing, the option-2 advance percentage. Mark these "REQUIRES MAZALIT INTERNAL DATA".

## Output format
Produce ONE report, written in French, with:
1. A table per section (A to F) with columns: # | Claim in the deck | Status (✅ Confirmé / ⚠️ Partiellement / ❌ Faux / ❓ Introuvable) | Correct information | Exact quote | Source URL | Source type (primaire/secondaire) | Date consulted.
2. A list "Corrections à faire dans le deck": each item gives the slide concerned (Problem, Who carries the burden, Severity, How it works, Risk model, VRIO, Market, Competitors, Business model, Financing, Risks, Next steps) and the exact replacement text in English.
3. A list "Questions à poser à Zeev / Mazalit" for everything marked REQUIRES MAZALIT INTERNAL DATA or not found.
4. A short final summary: the 5 most important findings.
