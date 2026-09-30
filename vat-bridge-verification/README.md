# VAT Bridge (Mazalit) – vérification factuelle du pitch deck

Travail réalisé le **17 septembre 2026** (premier jour de stage), sauvegardé ici le 22 septembre 2026.

## Contenu du dossier

| Fichier | Description |
|---|---|
| `00_brief_original.md` | La consigne de départ (en anglais) : les 30 points à vérifier, les règles, le format attendu. |
| `01_rapport_verification_2026-09-17.md` | Le rapport complet en français (tableaux A à F, corrections à faire dans le deck, questions pour Zeev / Mazalit, synthèse des 5 constats). Version texte, réutilisable dans un autre chat. |
| `01_rapport_verification_2026-09-17.pdf` | Le même rapport mis en page (12 pages A4 paysage, texte sélectionnable). |
| `annexes/B_chiffres_du_deck.md` | Rapport détaillé de la recherche sur les chiffres (points 11 à 18) : requêtes tentées, sources, chiffres contradictoires. |
| `annexes/C_mazalit.md` | Rapport détaillé sur Mazalit (points 19 à 22) : site, licence MDPS, actionnaires, outil de valorisation. |
| `annexes/D_concurrents_partenaires.md` | Rapport détaillé sur Peninsula, prêteurs TVA, banques, Owl, Nivoda, Malca-Amit (points 23 à 28). |
| `annexes/E_execution_arbitrage.md` | Rapport détaillé sur la WFDB, l'arbitrage de la bourse des diamants et les non-membres (points 29 et 30). |
| `annexes/A_notes_recherche_TVA.md` | Notes de recherche sur le droit de la TVA israélienne (points 1 à 10) : requêtes lancées et sources remontées. |
| `outils/build_pdf.py` | Script Python qui convertit le rapport Markdown en PDF (reportlab + python-bidi, police DejaVu Sans). |

## Limite importante

L'environnement utilisé bloquait l'ouverture de toutes les pages web (gov.il, nevo, boi.org.il, mazalit.com, isde.co.il, wfdb.com, presse israélienne). Seul le moteur de recherche fonctionnait, avec un quota de 200 requêtes qui a été épuisé. Toutes les « citations exactes » sont donc des extraits renvoyés par le moteur de recherche, pas du texte copié sur la page. Chaque URL doit être rouverte avant d'utiliser une citation dans le deck.

## Les 5 constats principaux

1. La Bourse israélienne des diamants n'est plus membre de la WFDB depuis avril 2025 : l'argument « suspension dans toutes les bourses mondiales » ne tient plus.
2. Les transactions sur diamants sont exonérées de TVA (art. 33), y compris import et export, sans droit à déduction (art. 41) : un pur diamantaire n'a pas de remboursement de TVA à avancer.
3. Le mécanisme central (compte de fiducie, cession ou nantissement du remboursement) n'a pas pu être vérifié.
4. La licence est celle de la filiale MDPS Ltd, avec deux jeux de numéros contradictoires.
5. Plusieurs chiffres à corriger : 2,4 Md$ = total brut H1 2026 ; 854 M$ (2023) en recul vs 873 M$ (2022) ; « > 160 M$ » Union Bank sans source ; Peninsula a fermé sa filiale diamants en 2024 ; coffre Malca-Amit à Ramat Gan non confirmé.

## Regénérer le PDF

```bash
pip install reportlab python-bidi
python3 outils/build_pdf.py 01_rapport_verification_2026-09-17.md sortie.pdf
```
