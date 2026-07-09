---
sidebar_position: 1
---

# IDs des boards & mapping des colonnes

Page de **maintenance**. Elle sert à ceux qui touchent au prompt Sidekick, aux automatisations ou à l'API monday.

:::note
Si tu modifies une colonne dans monday, mets à jour cette page **et** [le prompt Sidekick](./prompt-sidekick.md) — les IDs y sont encodés en dur.
:::

---

## Boards

| Board | ID | Workspace | Board des sous-éléments |
|---|---|---|---|
| Prospects / Pistes | `5093138638` | CRM - BB® | — |
| Contacts | `5093138641` | CRM - BB® | — |
| Comptes | `5093138643` | CRM - BB® | `5097045857` |
| Opportunités | `5093138639` | CRM - BB® | `5093138646` (vide) |
| **Services - BB®** | `5095856027` | CRM - BB® | `5097425516` |
| Activités CRM | `5093138642` | CRM - BB® | — |
| **Projets** (WM) | `5097430798` | Tryve | `5097430830` |
| Project Plan | `5095065143` | Tryve | `5095065148` (vide) |

---

## Prospects / Pistes — `5093138638`

| Colonne | ID | Valeurs |
|---|---|---|
| Prénom | `text_mm32bj3a` | texte |
| Nom | `text_mm32yg4k` | texte |
| E-mail | `lead_email` | e-mail — obligatoire pour la conversion |
| Origine de la piste | `color_mm33kjd6` | Téléphone · Site Web · Sortlist · Newsletter · E-mail général (impact) · Email général (IS) · Manuelle |
| Principal intérêt | `color_mm329m9y` | Photos & Videos · Graphisme & Design · Digital & Web · Stratégie marketing · Fournisseur/Partenaire |
| Unité d'affaires | `color_mm3cfjxt` | BB® Switzerland · BB® Studio · MPO · Influence Switzerland |
| Type de lead/contact | `color_mm3crn0b` | Client · Prospect · Médias/Presse · Partenaires · Fournisseurs |
| Comment pouvons-nous vous aider ? | `color_mm323q69` | J'ai besoin de votre expertise · J'ai une question · Je souhaite un devis après une rencontre · Autre |
| Statut | `lead_status` | Entrée non traitée · Tentative de contact · Contacté · Qualifié · Non qualifié (déchet) |
| Budget potentiel | `color_mm32y6g` | 1-20K · 30-50K · 50-100K · plus de 100K · A clarifier |
| Langue | `color_mm3376j2` | Français · Anglais · Allemand · Italien · Espagnol |
| Compte - Raison sociale | `lead_company` | texte |
| Secteur d'activité | `dropdown_mm3fwvww` | 19 secteurs |
| Bouton de conversion | `button` | « Déplacer dans les contacts » |

---

## Contacts — `5093138641`

| Colonne | ID |
|---|---|
| Prénom | `text_mm3fzpb9` |
| Nom | `text_mm3f6gbt` |
| E-mail | `contact_email` |
| OptIn (Brevo) | `color_mm33h0xm` |
| Comptes | `contact_account` |

---

## Opportunités — `5093138639`

| Colonne | ID |
|---|---|
| Introduction | `long_text_mm34mmtz` |
| Mission | `text_mm3qk3mr` |
| Devis Vibe (fichier) | `file_mm3jmp2j` |
| Montant Net HT | `deal_value` |
| Statut de signature | `color_mm33sa23` |
| Étape officielle | `deal_stage` |
| Score | `color_mm3qj7yv` |
| Commercial BBS | `deal_owner` |
| Compte | `board_relation_mm3596kz` |
| Personne de contact | `deal_contact` |
| E-mail destinataire (miroir) | `lookup_mm339a4c` |

---

## Services - BB® — `5095856027` (lecture seule)

:::danger
Ce board est la **source de vérité** des prix, des heures et des sous-tâches de toute l'agence. **Aucune écriture**, ni manuelle, ni par Sidekick, ni par l'app Devis Creator.
:::

| Colonne | ID |
|---|---|
| Prix HT | `numeric_mm332qx5` |
| Heures | `formula_mm3x3ff1` |
| Équipes | `multiple_person_mm44esqr` |
| Catégorie | `dropdown_mm341x54` |
| Description FR | `text_mm3ke73d` / `text_mm327y81` |
| Récurrence | `color_mm3fvgzk` |

**Sous-éléments (`5097425516`)**

| Colonne | ID |
|---|---|
| Heures par tâche | `numeric_mm40b3mc` |
| Phases créa | `color_mm453hww` |

---

## Projets — `5097430798`

| Colonne | ID |
|---|---|
| Prix CHF | `numeric_mm3xgetk` |
| Calcul Heures | `numeric_mm3x8ty` |
| Category | `color_mm3s37zx` |
| Email client | `email_mm3saq7m` |
| Mission | `text_mm41d7gm` |
| Equipes | `multiple_person_mm44aavq` |
| Description | `long_text_mm3s3760` |
| Manager | `multiple_person_mm3sva6m` |
| Account Manager | `multiple_person_mm3s4fcw` |
| Overall Status | `color_mm3sh2j1` |
| Rentabilité | `formula_mm44wh4w` |

**Sous-éléments (`5097430830`)**

| Colonne | ID | Valeurs |
|---|---|---|
| Heures prévues | `numeric_mm3xybp8` | numérique |
| Phases créa | `color_mm44djn3` | Pré-production · Production · Post-Prod · Validation |
| Prise de la Mission | `status` | Non récupérée · En cours de production · Terminée · Bloqué |
| Time tracking | `duration_mm40b29d` | durée |

### Colonnes métier Créa

| Colonne | ID | Valeurs |
|---|---|---|
| Statuts créa | `color_mm45ej0z` | À faire · En Brief · En Tournage · En Montage · En Validation · Terminé |
| Type de Livrable | `dropdown_mm45khda` | Photo · Vidéo · Motion Design · Graphisme 2D |

:::note
Les statuts métier **Digital** ne sont pas encore figés — à définir avec Emmanuel.
:::

---

## Récupérer les sous-éléments (GraphQL)

Le chargement standard d'un item **ne renvoie pas** ses sous-éléments. Il faut les demander explicitement :

```graphql
query {
  items(ids: [ITEM_ID]) {
    id
    name
    subitems {
      id
      name
      column_values {
        id
        text
        value
      }
    }
  }
}
```
