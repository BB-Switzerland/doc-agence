---
sidebar_position: 1
title: "Monday : CRM & Work Management"
description: De la piste au projet livré, en 6 étapes
---

# Monday chez BB® Switzerland

**monday.com remplace Salesforce.** Tout est sur `agence-bb-ensemble.monday.com` : les clients (CRM) et les projets (Work Management).

## Le parcours

```mermaid
flowchart TD
    A["1 · Piste"]
    B{"Qualifiée ?"}
    X["Abandon"]
    C["2 · Contact + Compte"]
    D["3 · Opportunité"]
    E["4 · Devis PDF"]
    F["5 · Signature"]
    G["6 · Projet"]

    A --> B
    B -- non --> X
    B -- oui --> C
    C --> D
    D -- Devis Creator --> E
    E -- DocuSign --> F
    F -- Sidekick --> G

    classDef etape fill:#487CBC,stroke:#487CBC,color:#ffffff
    classDef choix fill:#1E1F21,stroke:#1E1F21,color:#ffffff
    classDef abandon fill:#9ca3af,stroke:#9ca3af,color:#1E1F21
    classDef final fill:#DADD64,stroke:#DADD64,color:#1E1F21
    class A,C,D,E,F etape
    class B choix
    class X abandon
    class G final
```

Une fois le projet créé, il porte ses heures, ses statuts et sa rentabilité.

## Où aller

| Tu veux… | Va ici |
|---|---|
| Entrer un lead, faire un devis | **[CRM](./01-crm/index.md)** |
| Monter un projet, suivre tes heures | **[Work Management](./02-work-management/index.md)** |
| Un ID de colonne, le prompt Sidekick | **[Référence](./03-reference/boards-et-colonnes.md)** |

:::warning L'ancien process est mort
Salesforce → macro Excel → import Monday : **ne l'utilise plus**. Tout passe par [Sidekick](./02-work-management/onboarding-projet-sidekick.md).
:::

<details>
<summary>Pourquoi un seul board pour tous les projets ?</summary>

Notre licence monday est une **Pro** : 5 workflows actifs et 20 tableaux connectés maximum. Un board par client serait ingérable.

Et comme on traite 3 à 6 projets par mois, l'onboarding semi-automatique via Sidekick (quelques minutes) coûte moins cher qu'une automatisation lourde.

</details>
