---
sidebar_position: 2
---

# Le prompt Sidekick

:::tip En 3 étapes
1. Copie le prompt ci-dessous **en entier**.
2. Colle-le dans **Sidekick**.
3. **Joins le PDF du devis signé.**

La procédure complète : [Monter un projet depuis un devis](../02-work-management/onboarding-projet-sidekick.md).
:::

---

```text
En te basant sur le PDF joint et les boards monday.com existants, effectue l'import complet du devis dans le board Projets en suivant exactement les étapes ci-dessous.

ÉTAPE 1. Lire le PDF : extrais le nom du client (entreprise), le numéro de l'offre, la durée de collaboration (ex. « Pour 12 mois »), et la liste des produits/services dans leur ordre exact d'apparition.

ÉTAPE 2. Pour chaque produit, retrouve l'item dans « Services - BB® » (board 5095856027) et récupère : Prix HT (numeric_mm332qx5), Heures (formula_mm3x3ff1), Équipes (multiple_person_mm44esqr), Catégorie (dropdown_mm341x54), Description FR (text_mm3ke73d ou text_mm327y81).
⚠️ SUBITEMS / RÈGLE CRITIQUE : récupère les sous-éléments via une requête GraphQL directe :
query { items(ids: [ITEM_ID]) { id name subitems { id name column_values { id text value } } } }
⛔ Ne jamais supposer l'absence de sous-éléments sans exécuter cette requête. Par subitem : nom exact, Heures par tâche (numeric_mm40b3mc), Phases créa (color_mm453hww).

ÉTAPE 3. Dans « Opportunités » (board 5093138639), retrouve l'opportunité du client/devis et récupère : Introduction (long_text_mm34mmtz), Mission (text_mm3qk3mr), e-mail du contact lié (relation deal_contact → Contacts → contact_email).

ÉTAPE 4. Dans « Projets » (board 5097430798), crée un nouveau groupe nommé :
[Nom de l'entreprise] - Offre [numéro] | Pour [durée] de collaboration

ÉTAPE 5. Crée chaque produit comme un item dans le groupe (même ordre que le PDF) :
numeric_mm3xgetk = Prix CHF · numeric_mm3x8ty = Calcul Heures · color_mm3s37zx = Category ·
email_mm3saq7m = Email client · text_mm41d7gm = Mission · multiple_person_mm44aavq = Equipes ·
long_text_mm3s3760 = Description.

ÉTAPE 6. Pour chaque item ayant des sous-éléments, crée les subitems dans le board 5097430830 (ordre exact) :
numeric_mm3xybp8 = Heures prévues · color_mm44djn3 = Phases créa · **text_mm668kb0 = Nom de l'entreprise**.
Pour chaque subitem créé, renseigne donc systématiquement dans `text_mm668kb0` le nom exact de l'entreprise extrait à l'ÉTAPE 1.
⛔ Ne jamais écrire quoi que ce soit dans « Services - BB® » (lecture seule).

ÉTAPE 7. Crée un monday Doc attaché à chaque item (location_type: item), nommé « Introduction - [nom du produit] », contenant l'Introduction de l'étape 3 formatée en « ## Introduction ».

RÉSUMÉ FINAL. Fournis un tableau : nom du groupe créé, items créés (Prix CHF, Heures, Catégorie), nombre de subitems + leurs noms par item, confirmation des docs créés.
```

---

:::danger Ne modifie pas le prompt à la légère
Deux blocs sont **critiques** et ne doivent jamais être retirés :

- la **requête GraphQL** de l'étape 2 : sans elle, les sous-éléments sont silencieusement ignorés ;
- le **⛔ lecture seule** sur Services - BB® aux étapes 2 et 6.
:::

:::note Si les IDs de colonnes changent
Ce prompt encode des IDs de colonnes en dur. S'ils changent, mets à jour **ce fichier** et [la référence des boards](./boards-et-colonnes.md) en même temps.
:::
