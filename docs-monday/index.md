---
sidebar_position: 1
title: Monday — CRM & Work Management
description: Le parcours complet de la piste au projet livré sur monday.com
---

# Monday chez BB® Switzerland

monday.com **remplace Salesforce**. Le compte `agence-bb-ensemble.monday.com` centralise désormais le **CRM** (pistes, contacts, comptes, opportunités, devis) et le **Work Management** (projets, tâches, heures, rentabilité).

Cette rubrique documente les **3 processus** que tu exécutes au quotidien :

1. **Ajouter & qualifier une piste** — elle entre dans le CRM, tu la scores.
2. **Créer l'opportunité & générer le devis** avec l'app **Devis Creator**.
3. **Onboarder le projet** dans le Work Management depuis le devis signé, via **Sidekick**.

---

## Le flux global

| # | Étape | Ce qui se passe |
|---|---|---|
| 1 | **Piste / Prospect** | Un lead arrive (site, téléphone, Sortlist, newsletter…) et atterrit dans **Prospects / Pistes**. |
| 2 | **Contact + Compte** | Une fois qualifiée, la piste est **convertie** — jamais ressaisie à la main. |
| 3 | **Opportunité (Deal)** | Le deal est créé, avec son **Introduction** et sa **Mission**. |
| 4 | **Devis** | L'app **Devis Creator** assemble les services du catalogue et produit le PDF. |
| 5 | **Signature** | DocuSign. Le statut passe à **Signé**. |
| 6 | **Projet** | **Sidekick** lit le PDF et crée le groupe, les items et les sous-items dans **Projets**. |

Le projet ainsi créé porte sa structure de travail — groupe pour l'offre, élément pour chaque service, sous-élément pour chaque tâche — ainsi que les heures prévues, le time tracking et le calcul de rentabilité.

---

## Les 3 guides

- **[CRM — Pistes, Contacts, Opportunités](./01-crm/index.md)** — de l'entrée du lead au devis signé.
- **[Work Management — Onboarding & Projets](./02-work-management/index.md)** — du devis signé au projet livré.
- **[Référence technique](./03-reference/boards-et-colonnes.md)** — IDs des boards, colonnes, prompt Sidekick, glossaire.

---

:::info Pourquoi c'est fait comme ça
Notre licence monday est une **Pro** : maximum **5 workflows actifs**, maximum **20 tableaux connectés**, et pas d'accès aux Portfolios (réservés à l'Enterprise).

Ces limites expliquent deux choix structurants :

- **Un seul board central « Projets »** avec des **vues filtrées** par équipe, plutôt qu'un board par client.
- Un onboarding **semi-automatique via Sidekick** (quelques minutes par projet) plutôt qu'une automatisation lourde — on ne traite que **3 à 6 projets par mois**.
:::

:::warning L'ancien process n'est plus d'actualité
Le flux **Salesforce → macro Excel → import Monday** décrit dans l'ancienne page d'onboarding est **obsolète**. Réfère-toi désormais à [Onboarder un projet depuis un devis](./02-work-management/onboarding-projet-sidekick.md).
:::

:::note Capture à ajouter

- `./img/flux-global.png` — schéma du parcours Piste → Contact → Opportunité → Devis → Signature → Projet

:::
