---
sidebar_position: 4
---

# Créer l'opportunité & générer le devis (Devis Creator)

C'est ici que le deal prend forme : tu crées l'opportunité, puis tu produis le devis PDF avec l'app **Devis Creator**.

## Créer l'opportunité

Rends-toi sur le board [Opportunités](https://agence-bb-ensemble.monday.com/boards/5093138639). Les groupes matérialisent le pipeline : Nouveau, Négociation, Conclu, Perdu.

Renseigne le nom du deal, le commercial, l'étape officielle, le compte et la personne de contact. Deux champs demandent une attention particulière :

- **Introduction** — le texte de présentation du projet,
- **Mission** — les précisions contractuelles, tâche par tâche.

:::warning Introduction et Mission sont critiques
Ces deux champs ne servent pas qu'au devis : ils sont **repris tels quels dans le projet** lors de l'onboarding Sidekick. C'est le principe d'omniprésence de l'information — ce que tu écris ici, l'équipe de production le lira des semaines plus tard.

Une Introduction vide, c'est un projet qui démarre sans contexte.
:::

Le **Montant Net HT** et le PDF se remplissent automatiquement quand l'app génère le devis. Tu n'y touches pas.

:::tip Les IDs techniques des colonnes
Ils sont regroupés dans [Référence → Opportunités](../03-reference/boards-et-colonnes.md).
:::

:::note Capture à ajouter

- `./img/oppo-board.png` — le board Opportunités, pipeline (groupes) visible

:::

## Ouvrir l'app Devis Creator

Depuis l'item de l'opportunité, ouvre l'onglet de l'app. Elle ne liste que les opportunités en statut Nouveau, Négociation ou Envoi au clic.

1. **Sélectionne l'opportunité.**
2. **Édite l'Introduction.** Le texte est sauvegardé automatiquement sur l'opportunité.
3. **Ajoute les produits** depuis le catalogue Services - BB®, regroupés par catégorie.
4. **Renseigne la Mission** ligne par ligne si des précisions contractuelles s'imposent.

Pour chaque produit ajouté, tu peux régler la **quantité** (les décimales et fractions sont acceptées, par exemple `1/2`), la **durée contractuelle** qui multiplie les produits facturés au mois, la **devise** parmi CHF, EUR et USD au taux du jour, un **rabais par catégorie**, et un **prix manuel** pour les produits à 0 comme le budget publicitaire, l'UX/UI ou la libération de droits.

:::note Captures à ajouter

- `./img/devis-creator-app.png` — l'app Devis Creator ouverte depuis un item, écran de sélection
- `./img/devis-creator-produits.png` — l'ajout de produits depuis le catalogue, regroupés par catégorie

:::

:::danger Le catalogue Services - BB® est en lecture seule
Ne modifie jamais le board [Services - BB®](https://agence-bb-ensemble.monday.com/boards/5095856027), ni depuis l'app ni ailleurs. C'est la source de vérité des prix, des heures et des sous-tâches. Une modification s'y propage à tous les devis futurs et à tous les onboardings.
:::

## Comprendre les totaux

L'app calcule une cascade de totaux. La distinction entre **budget publicitaire** et **agence** est imposée : le budget pub n'est pas une prestation d'agence, il doit être isolé.

Prenons un devis composé de 3 000.- de Création/Production, 5 000.- de Digital/Web avec 10 % de rabais catégorie, et 2 000.- de budget publicitaire :

| Ligne | Montant |
|---|---|
| Total HT | 10 000.00 |
| Rabais (10 % sur Digital/Web) | − 500.00 |
| Total net agence | 7 500.00 |
| Total net budget publicitaire | 2 000.00 |
| **Total net global** | **9 500.00** |
| TVA 8.1 % | 769.50 |
| **TTC** | **10 269.50** |
| Acompte 30 % | 3 080.85 |

:::note Capture à ajouter

- `./img/devis-creator-totaux.png` — la cascade des totaux : HT, rabais, agence vs budget pub, TVA, TTC, acompte

:::

## Générer le PDF

Quatre boutons de langue : français, anglais, allemand, italien. Un clic, et l'app dépose le PDF dans la colonne « Devis Vibe » de l'opportunité, y sauvegarde le Montant Net HT, et enregistre la date d'expiration du devis.

Le PDF contient le logo, les coordonnées du client, les produits avec leurs descriptions courtes, les conditions spéciales, le bloc de signature, et les CGV (case « J'accepte les CGV », renvoyant vers `agence-bb.ch/cgv`).

:::note Captures à ajouter

- `./img/devis-creator-boutons-langues.png` — les quatre boutons FR / EN / DE / IT
- `./img/oppo-colonne-devis.png` — la colonne « Devis Vibe » de l'opportunité, avec le PDF déposé

:::

## Envoyer & faire signer

Passe d'abord le **Statut de signature** à « Envoi au clic (devis envoyé) ». Télécharge ensuite le PDF depuis la colonne Devis Vibe, réimporte-le dans **DocuSign**, place les champs signature, nom et date, puis envoie.

Le document signé revient dans monday et le statut passe à **Signé**. Une relance automatique part tous les 3 jours jusqu'à signature.

:::warning Limite DocuSign connue
Le placement des champs et les parapheurs page à page ne sont pas automatisés. Tu dois les positionner à la main à chaque envoi. C'est une limite de DocuSign, pas un oubli de configuration.
:::

:::note Capture à ajouter

- `./img/docusign-flow.png` — l'écran DocuSign avec les champs signature / nom / date placés

:::

## Checklist

- [ ] Introduction rédigée — elle partira dans le projet
- [ ] Mission renseignée sur les lignes qui le nécessitent
- [ ] Durée contractuelle réglée pour tous les produits mensuels
- [ ] Prix manuel saisi pour chaque produit à 0
- [ ] Devise correcte
- [ ] PDF généré dans la bonne langue et présent sur l'opportunité
- [ ] Statut de signature mis à jour après envoi

## Erreurs fréquentes

**Introduction ou Mission vides.** Elles sont perdues au moment de l'onboarding projet, et l'équipe démarre à l'aveugle.

**Produit à 0 sans prix manuel.** La ligne part facturée à zéro dans le PDF envoyé au client.

**Oubli de la durée contractuelle** sur un produit mensuel : le devis sous-facture.

**Mauvaise devise.** Les totaux sont faux et le taux du jour ne s'applique pas.

---

**Étape suivante :** le devis est signé → [Onboarder le projet via Sidekick](../02-work-management/onboarding-projet-sidekick.md).
