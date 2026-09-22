# Annexe B – Rapport détaillé : chiffres utilisés dans le deck (points 11 à 18)

Date de consultation : 17 septembre 2026. Rapport brut de la recherche déléguée, reproduit tel quel (en anglais).

IMPORTANT METHOD CAVEAT (applies to every item): In this sandbox, WebFetch and curl were blocked by the egress proxy for EVERY external domain tried (boi.org.il, cbs.gov.il, gov.il, data.gov.il, globes.co.il, calcalist.co.il, ynet.co.il, themarker.com, bizportal.co.il, ice.co.il, israelidiamond.co.il, isde.co.il, rapaport.com, idexonline.com, edahngolan.com, instoremag.com, professionaljeweller.com, marketscreener.com, tradingeconomics.com, timesofisrael.com, fx.co, port2port.co.il, maya.tase.co.il, etc. — proxy returned 403 CONNECT). Only WebSearch worked, and the 200-search session budget was fully consumed. Therefore NO page was actually fetched; every "quote" below is the text the search tool returned in its result snippet for the named URL, not text copied from a fetched page. Treat all quotes as "snippet-level" and re-verify against the live page before publishing. Where I write CONFIRMED it means "consistent across multiple independent snippets", not "verified on the primary page".

## 11. USD/ILS exchange rate (deck: ₪3.04) and 2023 annual average

Status: PARTIALLY (current rate ≈3.03–3.05 in mid-Sept 2026 — consistent with ₪3.04; exact dated BoI representative rate NOT retrieved because boi.org.il is blocked). 2023 annual average: CONFIRMED (CBS/BoI: 3.6871).

Current rate — findings (all secondary, snippet-level):
- Investing.com "שער דולר יציג" historical-data page (snippet, returned on 2026-09-17, no explicit date in snippet): "The current exchange rate of the USD/ILS pair stands at 3.0433, with the previous closing rate at 3.0405." URL: https://il.investing.com/indices/usd-ils-fix-historical-data — secondary.
- MTFX historical table (snippet): "September 12, 2026: 1 USD = 3.03135 ILS"; "On September 10, 2026, the exchange rate reached 1 USD = 3.04638 ILS"; "approximately 3.00966 ILS per USD on September 3rd". URL: https://www.mtfxgroup.com/tools/historical-currency-exchange-rates/usd-to-ils-rate/ — secondary (market rates, not BoI fix).
- Investing.com continuous USD/ILS (snippet): "שער הדולר הרציף היום היה 3.0269 ... תאריך של 17/09/2026" (continuous market rate 3.0269 on 17/09/2026). URL: https://il.investing.com/currencies/usd-ils — secondary.
- Primary page (blocked, could not fetch): https://www.boi.org.il/roles/markets/exchangerates/usdollar/ (Hebrew) and https://www.boi.org.il/en/economic-roles/financial-markets/exchange-rates/ (English).
Recommendation: ₪3.04 is a fair rounding for early/mid-Sept 2026, but the deck should cite "Bank of Israel representative rate, [exact date]" pulled from boi.org.il by someone with access.

2023 annual average USD/ILS — CONFIRMED:
- Quote (from CBS media release "שערי מטבעות החוץ בסוף שנת 2023", as relayed in snippet, English rendering of the search tool): "According to the Central Bureau of Statistics, based on the average monthly representative rates published by the Bank of Israel, the average exchange rate of the dollar in 2023 was 3.6871 shekel, which was 9.8% higher compared to 2022." Also: "In 2023, the shekel weakened against the dollar by 8.9%".
- URL: https://www.cbs.gov.il/he/mediarelease/DocLib/2024/002/16_24_002b.pdf — primary (CBS, based on BoI data). Secondary relay: https://passportnews.co.il/article/188017.
- Cross-check (secondary): OECD series via search: "the average exchange rate for 2023 was 3.68578 NIS per USD" (FRED/OECD https://fred.stlouisfed.org/series/CCUSMA02ILA618N). Minor rounding difference only.
- Correct value to use: 2023 average = ₪3.687 per USD (CBS/BoI: 3.6871).

## 12. Bank of Israel policy rate (deck: 3.25% since 1 Sept 2026) and prime (≈4.75%)

Status: CONFIRMED (multiple independent secondary sources; boi.org.il press release itself not fetchable and its URL did not surface in search).

Correct information: On Tuesday 1 September 2026 the Monetary Committee cut the rate by 0.25 pp from 3.50% to 3.25% — third consecutive cut (25 May 2026 → 3.75%; 6 July 2026 → 3.50%; 1 Sept 2026 → 3.25%), and fifth cut since Nov 2025 (24 Nov 2025 → 4.25%; 5 Jan 2026 → 4.00%; 23 Feb and 30 Mar 2026 unchanged at 4.00%). Prime = BoI rate + 1.5 pp = 4.75%.

Quotes (snippet-level):
- Bloomberg (2026-09-01): "The Bank of Israel cut interest rates to 3.25% from 3.5% on Tuesday, after lowering borrowing costs in May and July." URL: https://www.bloomberg.com/news/articles/2026-09-01/israel-slashes-interest-rates-for-third-consecutive-meeting — secondary.
- Hebrew (mortgage-advisory sites relaying the decision): "ב-1 בספטמבר 2026 החליטה הוועדה המוניטרית להוריד את הריבית ב-0.25% לרמה של 3.25%, על רקע התמתנות האינפלציה ל-1.5% בשנים-עשר החודשים שהסתיימו ביולי 2026." / "בהתאם לכך עומדת ריבית הפריים על 4.75%. היא מחושבת בצורה קבועה: ריבית בנק ישראל + 1.5%." URLs: https://mashkantaguru.co.il/ריבית-הפריים/ ; https://www.lsmashkanta.co.il/בנק-ישראל-הוריד-את-הריבית-ל־3-25/ — secondary.
- ynet headline: "בפעם השלישית ברציפות: בנק ישראל הוריד את הריבית ברבע אחוז ל-3.25%". URL: https://www.ynet.co.il/economy/article/cdo59v3t1 — secondary.
- TheMarker (2026-09-01) headline: "הפחתה חמישית בתוך פחות משנה: בנק ישראל מוריד את הריבית ל–3.25%". URL: https://www.themarker.com/news/macroeconomics/2026-09-01/ty-article/.premium/000001a0-5c77-d64c-a9a3-7c7f0f6c0000 — secondary.
- Globes EN: https://en.globes.co.il/en/article-bank-of-israel-cuts-interest-rate-again-1001547993 — secondary (not fetchable).
- Primary (prior decisions, URLs surfaced but not fetchable): BoI Monetary Policy page snippet: "The Monetary Committee decided on July 6, 2026 to lower the interest rate to 3.5 percent" — https://www.boi.org.il/en/economic-roles/monetary-policy/ ; earlier: https://www.boi.org.il/en/communication-and-publications/press-releases/24-11-25-en/ (4.25%, 24 Nov 2025), .../5-1-25-en/ (4.00%, 5 Jan 2026), .../23-2-26-en/ (unchanged 4.00%), .../the-monetary-committee-decides-on-march-30-2026-to-leave-the-interest-rate-unchanged-at-400-percent/ ; decision calendar: https://www.boi.org.il/en/economic-roles/monetary-policy/interest-rate-announcement-dates-2026/.
Note for deck: the phrase "since 1 Sept 2026" is correct. Next scheduled decision date should be checked on the BoI 2026 calendar page above.

## 13. Israeli jewelry exports (deck: $854M in 2023, Manufacturers Association)

Status: 2023 figure CONFIRMED; 2024/2025 figure NOT FOUND.

- Quote (Hebrew, MAI data relayed by trade press, Feb 2024): "בשנת 2023 יצוא התכשיטים הישראלי עמד על לא פחות מ-854 מיליון דולר". URLs: https://www.port2port.co.il/article/תעשיה-וסחר/תעשייה/לכבוד-הוולנטיינס-יצוא-התכשיטים-של-ישראל-עומד-על-כ-854-מיליון-דולר/ (secondary, citing MAI); https://www.ice.co.il/finance/news/article/1000345 (published 13 Feb 2024, secondary); MAI's own Instagram post: https://www.instagram.com/industry.org.il/p/C3UgeeYJSSV/ ("יצוא התכשיטים שלנו עומד על כ-854 מיליון דולר!") — primary-adjacent (MAI's own channel). Also snippet: "קפיצה של 62% במכירות התכשיטים בתוך עשור".
- Context (Globes EN, Oren Harambam/MAI, secondary): "Worldwide sales of Israeli jewelry totaled $873 million in 2022, which compares with $791 million in 2021 and just $552 million in 2020." and "the main countries to which Israel exports are the US (65%)..." URL: https://en.globes.co.il/en/article-israels-jewelry-industry-enjoying-an-upsurge-1001438453. NOTE: this implies 2023 ($854M) was slightly DOWN vs 2022 ($873M) — the deck should not describe 2023 as a record.
- 2024 / 2025: NOT FOUND. No MAI Valentine's-2025 or -2026 release and no CBS jewelry-line figure surfaced. Queries tried: "יצוא תכשיטים ישראל 2025 התאחדות התעשיינים"; "יצוא תכשיטים 2024 מיליון דולר ישראל"; "Israel jewelry exports 2025 million dollars Manufacturers Association"; "יצוא תכשיטים 2025 ישראל ירידה מיליון שקל הלמ"ס"; "Israel jewelry exports 2024 Oren Harambam million dollars"; "יצוא תכשיטים ישראל וולנטיינס 2026 התאחדות התעשיינים מיליון דולר 2025"; "Israel jewelry exports 2024 total declined million Manufacturers Association Valentine 2025". (Tangential: Walla reported total Israeli exports 2025 = $169B record — https://finance.walla.co.il/item/3855087 — not jewelry-specific.)

## 14. Israeli diamond exports H1 2026 (deck: $2.4B record low) and full-year 2025

Status: H1 2026 $2.4B — CONFIRMED as TOTAL diamond exports (all categories), with a definitional caveat; full-year 2025 — NOT FOUND (only partial-year 2025 figures found).

H1 2026:
- ynetnews (secondary, ~July 2026): "Cumulative exports from the beginning of 2026 through the end of June totaled just $2.4 billion, the lowest figure in the industry's history. By comparison, polished diamond exports from Israel reached approximately $7 billion in 2015, the sector's peak year, more than three times the current volume." and "Total trade in the industry, including rough diamond imports and diamond exports, also fell to a low of approximately $4 billion." URL: https://www.ynetnews.com/business/article/h100005gxrfg ; Hebrew original: https://www.ynet.co.il/economy/article/yokra14843154 ("המצב קטסטרופלי": ענף היהלומים בשפל היסטורי - נשיא הבורסה התפטר).
- IDEX (secondary, citing Ministry of Economy): "gross polished exports for January to June 2026 were down to $1.77 billion, a 22% decrease year-on-year." Diamond Controller Natalie Gutman quoted: "the volume of diamond trade is only one-third of what it was a decade ago" and "Since 2022, there has been a consistent decline, and we are now at an all-time low." URL: https://www.idexonline.com/FullArticle?Id=51308.
- Hebrew (Emess radio, citing Ministry of Economy): "במחצית הראשונה של 2026 הסתכם היצוא נטו של יהלומים מלוטשים ב־625.7 מיליון דולר, לעומת 804.5 מיליון דולר בתקופה המקבילה אשתקד – ירידה של 22.3%"; rough trade down "more than 34%". URL: https://www.emess.co.il/radio/1916092.
CAVEAT: the $2.4B is gross total diamond exports (rough + polished); gross polished alone was $1.77B and NET polished only $625.7M. The deck should label $2.4B precisely ("total diamond exports, gross, Jan–Jun 2026, Ministry of Economy data") to avoid conflating with "polished exports".

Full-year 2025: NOT FOUND as a single figure. Partial-year 2025 data found:
- CBS-based (via keif.co.il / Calcalist snippets, secondary): "יצוא יהלומים נטו (מלוטשים וגולמיים) הסתכם מתחילת שנת 2025 ב-7.1 מיליארד ש"ח, לעומת 8.8 מיליארד ש"ח אשתקד" — period is year-to-date through ~Sept/Oct 2025, not full year. URLs: https://keif.co.il/29639/ ; https://www.calcalist.co.il/local_news/article/hyolwoeh11l.
- "net exports of rough and polished diamonds fell 23 per cent year-on-year during January to August 2025 (from $2.1bn to $1.6bn) according to Israeli government figures" (Middle East Eye/JewelBuzz snippet, secondary): https://www.middleeasteye.net/news/israeli-diamond-exchange-crisis-exports-plummet-2024 / https://jewelbuzz.in/israels-diamond-industry-hits-record-lows/.
- Full-year 2024 (for baseline; Xinhua citing Ministry of Economy, Jan 2025, secondary): "Israel's polished diamond exports fell 35.7 percent to 1.87 billion dollars" and "Israel's rough diamond exports totaled 634.9 million U.S. dollars in 2024, a 24.1 percent drop". URL: http://english.news.cn/20250123/32b1607425624c9093f1e4552ebc246f/c.html.
- UN COMTRADE via TradingEconomics (secondary): "Israel's exports of diamonds to the United States were US$1.86 billion during 2025" (US only). URL: https://tradingeconomics.com/israel/exports/united-states/diamonds-worked-not-mounted-set.
Queries tried for FY2025: "Israel polished diamond exports 2025 full year Diamond Controller"; "יצוא יהלומים מלוטשים 2025 סיכום שנתי ירידה מיליארד דולר משרד הכלכלה"; "Israel polished diamond exports 2025 fell percent billion full year January 2026"; "Israel diamond exports 2025 annual total billion Natalie Gutman diamond controller January 2026"; "יצוא יהלומים מלוטשים 2025 הסתכם ב מיליארד דולר ירידה לעומת 2024 בורסת היהלומים סיכום שנה"; "Israel diamond exports 2025 full year total polished rough net exports billion Ministry of Economy annual summary"; "סיכום שנת 2025 ענף היהלומים יצוא נטו יהלומים מלוטשים מיליארד דולר ירידה". Primary pages not fetchable: gov.il (Diamond Controller), isde.co.il, israelidiamond.co.il.

## 15. Bank credit to Israel's diamond sector (deck: ₪1.88B in 2024)

Status: CONFIRMED for 2024 (Edahn Golan analysis of Bank of Israel Banking Supervision data); 2025 figure NOT FOUND.

- Quote (Edahn Golan, secondary, citing BoI Banks Supervisor data): "Bank financing for Israel's diamond industry has plummeted to $508 million (1.88 billion NIS) utilized in 2024, representing a historic low." and "According to data released by the Bank of Israel's Banks Supervisor, financing for the country's diamond sector contracted further in the fourth quarter of 2024, falling to $477 million." and "Financing reached its peak in 2008 at $2.24 billion, and current levels represent a 77% reduction from this peak". URLs: https://www.edahngolan.com/israels-diamond-financing-sinks-to-0-5-bln/ ; https://www.edahngolan.com/israeli-bank-financing-of-the-diamond-industry-slashed/ — secondary (derived from primary BoI data).
- 2025: NOT FOUND. The BoI half-year banking survey for H1 2025 exists (primary, blocked): https://boi.org.il/media/trqltwil/סקירת-מערכת-הבנקאות-מחצית-ראשונה-2025.pdf and https://www.boi.org.il/publications/regularpublications/banking-system/16-11-2025/ — a reader with access should check its sectoral credit table for "יהלומים". Queries tried: "אשראי בנקאי לענף היהלומים 2025"; "אשראי בנקאי ליהלומנים מיליארד שקל 2025 בנקים ענף היהלומים ירידה"; "אשראי לענף היהלומים 1.88 מיליארד שקל 2024 בנקים"; "Israeli banks diamond sector credit NIS billion 2025 Bank of Israel banking supervision diamonds"; "Edahn Golan Israel diamond financing 2025 bank credit diamond sector NIS billion"; "Israel bank financing diamond industry 2025 fell million Bank of Israel Banks Supervisor Q4 2025 diamond credit".
- Related (Calcalist, secondary): Peninsula's diamond-lending subsidiary is being closed — "החברה־הבת של פנינסולה למתן אשראי ליהלומנים תיסגר" — https://www.calcalist.co.il/market/article/sy00fmnnyt (supports the "credit is shrinking" narrative).

## 16. Share of midstream diamond credit from non-bank lenders (deck: >30% in 2023)

Status: CONFIRMED (as "one third" in 2023); newer figure NOT FOUND.

- Quote (World Diamond Council article "We're not just lenders—we're diamantaires too", secondary/industry body): "By 2023, financing had fallen to approximately $6 billion, and one third of that was being obtained outside of the traditional bank financing system." Also: "mid-stream diamond industry financing peaked in 2013 at $16 billion". URL: https://www.worlddiamondcouncil.org/were-not-just-lenders-were-diamantaires-too/.
- Older context (JewelleryNet, secondary): "Financing in the diamond industry has been shrinking over the last decade, declining from a peak of US$16.5 billion in 2014 to about US$9.8 billion by 2020." URL: https://news.jewellerynet.com/en/jnanews/features/24186/031021-Finding-the-money.
- Deck wording: "one third" ≈ 33%, so ">30%" is consistent; recommend citing "~1/3 (WDC, 2023)".
- 2024/2025 update: NOT FOUND. Queries tried: "diamond midstream non-bank lenders share of credit 2025 Rapaport"; "diamond industry financing non-bank lenders share 30% midstream 2023 2024"; "De Beers Diamond Insight Report midstream financing non-bank lenders percent 2024 2025"; "Edahn Golan diamond industry financing shrinking non-bank lenders share bank credit midstream"; "midstream diamond financing $6 billion 2023 one third outside traditional bank financing". Rapaport "Banking on Diamonds" (https://rapaport.com/news/banking-on-diamonds/) and Edahn Golan "Diamond Industry Financing Is Shrinking" (https://www.edahngolan.com/diamond-industry-financing-is-shrinking-this-is-what-it-means/) surfaced but were not fetchable.

## 17. Lab-grown diamond wholesale prices (deck: −14% in Q1 2026); Q2 2026 update

Status: CONFIRMED for Q1 2026 (−14% y/y); Q2 2026 update FOUND: −13% y/y.

- Q1 2026 (Edahn Golan LGD Wholesale Price List, secondary/analyst): headline "LGD Prices Down 14% in Q1 2026"; JCK: "midstream prices for loose lab-grown diamonds fell another 14% year over year in the first quarter." URLs: https://www.edahngolan.com/lgd-wholesale-price-list-down-14-a-q1-2026-roundup/ ; https://instoremag.com/wholesale-lab-grown-diamond-prices-down-14-in-q1-2026/ ; https://www.jckonline.com/editorial-article/lab-grown-wholesale-freefall/. Full-year 2025: "26% decline Golan logged for all of 2025" (https://www.edahngolan.com/lab-grown-diamond-wholesale-prices-2025/).
- Q2 2026 (Edahn Golan Q2 2026 LGD Wholesale Price List, released July 2026): "Wholesale lab-grown prices fell an average of 13% year over year in the second quarter, a milder drop than the 14% recorded in the first quarter and the 26% decline Golan logged for all of 2025." Details: "Wholesale prices for 1-carat round diamonds rose 1%"; "Wholesale prices for 1.50-1.99-carat round lab-grown diamonds declined 11% year-on-year, while prices for 2-carat round stones fell 20%"; fancy shapes "losing on average 17%"; "The LGD Wholesale Price Index declined 96% since tracking began in July 2018". URLs: https://www.edahngolan.com/after-a-96-decline-whats-next-for-lgd-prices/ ; https://instoremag.com/the-q2-2026-lgd-wholesale-price-list-not-all-lab-grown-diamond-prices-are-falling/ — secondary.
- Rough LGD counter-trend (Professional Jeweller, Q2 2026): "rough prices have recently moved higher, with producers in China increasing prices by at least 30%, while Diamond Foundry reportedly raised prices by about 25%." URL: https://www.professionaljeweller.com/q2-rise-rough-lab-grown-diamond-price/ — secondary.
- Recommendation: deck can say "−14% y/y Q1 2026; −13% y/y Q2 2026 (Edahn Golan LGD Wholesale Price Index)". Rapaport/Tenoris/Zimnisky indexes were not surfaced.

## 18. Union Bank diamond loan portfolio sold to Peninsula (2020): ≈$91M performing; >$160M bad & doubtful

Status: PARTIALLY — $91M performing portfolio CONFIRMED; the ">$160M bad and doubtful debts" figure NOT FOUND (no source surfaced with any dollar amount for the bad/doubtful book; sources only say they were transferred "without consideration"). Several conflicting figures on final size/price exist — listed below.

Confirmed (Hebrew, June/July 2020 announcements, secondary press relaying Peninsula's TASE filing):
- "היקף תיק האשראי ליהלומנים של אגוד הסתכם בסוף יוני בכ-91 מיליון דולר, כשהיקף מסגרות האשראי ללקוחות בתחום זה עומד על כ-250 מיליון דולר."
- "במסגרת העסקה, תרכוש פנינסולה גם את כלל החובות האבודים והמסופקים של בנק אגוד בתחום הפעילות, ללא תמורה."
- "בתמורה לרכישת תיק האשראי, תשלם החברה במועד ההשלמה סכום שינוע בשיעור של בין 70%-55% משווי התיק במועד ההשלמה בפועל."
URLs: https://www.ice.co.il/finance/news/article/782181 (headline: "סייל סוף עונה: פנינסולה רוכשת מבנק אגוד את תיק האשראי ליהלומנים בהיקף של 91 מיליון דולר"); https://www.bizportal.co.il/capitalmarket/news/article/782156 ; https://www.israelidiamond.co.il/חדשות-המכון/יהלומים-בישראל/פנינסולה-אגוד-אשראי-יהלומים/ ; https://www.globes.co.il/news/article.aspx?did=1001335680 — all secondary. Primary TASE filing (maya.tase.co.il) not fetchable.
- MarketScreener (secondary): "Peninsula Group Ltd agreed to acquire diamond dealers credit portfolio of Union Bank of Israel Ltd. on July 14, 2020." URL: https://www.marketscreener.com/quote/stock/UNION-BANK-OF-ISRAEL-LTD-56537310/news/Peninsula-Group-Ltd-agreed-to-acquire-diamond-dealers-credit-portfolio-of-Union-Bank-of-Israel-Ltd--33787904/

Conflicting / later figures (list both; deck should pick one basis and cite it):
- Calcalist (Sept 2020): portfolio shrank to $57M within a month; implied price ~37% discount: "בהנחה שהיקף האשראי יישאר כמו שהוא, התשלום עמד על 57 מיליון דולר - דיסקאונט של 37%" and "התיק התכווץ ב-35% בתוך חודש בלבד ל-57 מיליון דולר". URLs: https://www.calcalist.co.il/markets/articles/0,7340,L-3839547,00.html ; https://www.calcalist.co.il/markets/articles/0,7340,L-3847547,00.html ("תיק האשראי ליהלומים של אגוד צנח בגלל עזיבת מאירוב").
- Globes (2021, secondary): "Peninsula purchased the portfolio, which had a volume of $53.4 million in 2020, in return for only $21.3 million." URL: https://www.globes.co.il/news/article.aspx?did=1001364217.
- Calcalist (later, secondary): "התיק נרכש תמורת 76 מיליון שקל, בעוד שהיה רשום במאזני אגוד בשווי של 192 מיליון שקל" and "עבור הלוואות אלו [מסופקות] שילמה פנינסולה סכום של 1.1 מיליון שקל בלבד". URL: https://www.calcalist.co.il/market/article/s1euwga13.
- Conclusion for the deck: "≈$91M performing loans (as of 30 June 2020)" is supportable; ">$160M bad and doubtful debts" is NOT supported by anything found — the closest documented figures are ₪192M gross book value vs ₪76M paid (≈$55M vs ≈$22M at 2020 rates) and the $250M of credit *facilities*. Recommend removing or re-sourcing the $160M claim (check Peninsula's 2020 immediate report / Q3-2020 financials on maya.tase.co.il, or Mizrahi-Tefahot/Union Bank 2020 annual report note on the sale).
Queries tried for the $160M: "פנינסולה אגוד תיק אשראי יהלומנים 91 מיליון דולר חובות מסופקים"; "אגוד פנינסולה חובות אבודים ומסופקים 160 מיליון דולר יהלומנים ללא תמורה"; "Peninsula Union Bank diamond portfolio $91 million performing loans $160 million doubtful"; "בנק אגוד יהלומנים חובות אבודים ומסופקים היקף מיליון דולר פנינסולה תרכוש ללא תמורה 2020"; "מחירי סוף עונה תיק היהלומים של אגוד יימכר לפנינסולה בדיסקאונט חובות בעייתיים מיליון דולר"; "Peninsula Union Bank diamond credit portfolio 2020 Globes $53.4 million $21.3 million".

## Summary table

11. USD/ILS ₪3.04 — PARTIALLY (≈3.03–3.05 mid-Sept 2026, dated BoI fix not retrieved); 2023 avg — CONFIRMED 3.6871 (CBS/BoI, primary).
12. BoI 3.25% from 1 Sept 2026; prime 4.75% — CONFIRMED (secondary; BoI page blocked).
13. Jewelry exports $854M 2023 (MAI) — CONFIRMED; 2024/2025 — NOT FOUND; note 2022 was $873M (so 2023 was a slight decline).
14. Diamond exports H1 2026 $2.4B record low — CONFIRMED as gross total diamond exports (polished gross $1.77B, net polished $625.7M, −22.3%); FY2025 — NOT FOUND (YTD-2025 net ₪7.1B vs ₪8.8B; Jan–Aug 2025 net $1.6B vs $2.1B, −23%).
15. Bank credit ₪1.88B / $508M in 2024 — CONFIRMED (Edahn Golan on BoI data); 2025 — NOT FOUND.
16. Non-bank share >30% in 2023 — CONFIRMED ("one third", WDC); newer — NOT FOUND.
17. LGD −14% Q1 2026 — CONFIRMED; Q2 2026 — −13% y/y (Edahn Golan, July 2026).
18. Union Bank→Peninsula: $91M performing — CONFIRMED; >$160M bad/doubtful — NOT FOUND (conflicting sizes: $57M, $53.4M/$21.3M paid, ₪192M book/₪76M paid).
