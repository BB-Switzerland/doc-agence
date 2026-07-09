---
sidebar_position: 3
---

# Convertir une piste en Contact + Compte

Une fois la piste qualifiée, tu la transformes en **Contact** — la personne — rattaché à un **Compte** — l'entreprise.

## Le bouton « Créer un contact »

Sur le board Prospects / Pistes, chaque ligne porte un bouton **« Déplacer dans les contacts »**. Ouvre la piste qualifiée, clique dessus, et les données partent automatiquement vers le board [Contacts](https://agence-bb-ensemble.monday.com/boards/5093138641) : langue, e-mail, téléphone, nom, société.

:::note Capture à ajouter

- `./img/convertir-bouton.png` — la colonne bouton « Déplacer dans les contacts » sur une ligne de piste

:::

## Relier au Compte

Dans Contacts, la colonne « Comptes » pointe vers le board [Comptes](https://agence-bb-ensemble.monday.com/boards/5093138643).

Si l'entreprise existe déjà, rattache simplement le contact. Sinon, crée le Compte, puis rattache.

:::info Un contact, plusieurs comptes
Un même contact peut être lié à plusieurs comptes — un dirigeant avec deux sociétés, par exemple. Les colonnes miroir remontent l'information du Compte vers le Contact (adresse, secteur), donc tu n'as jamais à ressaisir ces données.
:::

:::note Capture à ajouter

- `./img/contact-lier-compte.png` — un Contact avec sa colonne « Comptes » reliée à une entreprise

:::

:::danger Ne crée jamais un Contact ou un Compte à la main
Hors de ce flux de conversion, la traçabilité est perdue : plus d'origine, plus de score, plus de lien avec la piste. **La piste est la source unique.** Si quelqu'un t'arrive « déjà connu », crée quand même la piste et convertis-la.
:::

## Checklist

- [ ] La piste est en statut **Qualifié** avant conversion
- [ ] Le bouton « Déplacer dans les contacts » a été utilisé, pas une saisie manuelle
- [ ] Le Contact est rattaché à un Compte, existant ou créé
- [ ] Les colonnes miroir remontent bien l'adresse et le secteur d'activité
- [ ] L'opt-in newsletter est positionné si le prospect a consenti

---

**Étape suivante :** [Créer l'opportunité & générer le devis](./opportunite-devis-creator.md).
