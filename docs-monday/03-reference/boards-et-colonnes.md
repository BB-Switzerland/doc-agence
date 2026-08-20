---
sidebar_position: 1
---

# IDs des boards & colonnes

:::info Tu n'as pas besoin de cette page
C'est de la **maintenance technique**. Utile seulement si tu touches au prompt Sidekick, aux automatisations ou à l'API monday.

Et si tu modifies une colonne dans monday : mets à jour cette page **et** [le prompt Sidekick](./prompt-sidekick.md), où les IDs sont en dur.
:::

---

## Boards

| Board | ID | Workspace | Board des sous-éléments |
|---|---|---|---|
| Prospects / Pistes | `5093138638` | CRM - BB® | aucun |
| Contacts | `5093138641` | CRM - BB® | aucun |
| Comptes | `5093138643` | CRM - BB® | `5097045857` |
| Opportunités | `5093138639` | CRM - BB® | `5093138646` (vide) |
| **Services - BB®** | `5095856027` | CRM - BB® | `5097425516` |
| Activités CRM | `5093138642` | CRM - BB® | aucun |
| **Projets** (WM) | `5097430798` | BBS® - Work Management | `5097430830` |
| **Tasks BBS** (WM) | `5102159651` | BBS® - Work Management | `5102474491` |
| Project Plan | `5095065143` | BBS® - Work Management | `5095065148` (vide) |

---

## Prospects / Pistes · `5093138638`

| Colonne | ID | Valeurs |
|---|---|---|
| Prénom | `text_mm32bj3a` | texte |
| Nom | `text_mm32yg4k` | texte |
| E-mail | `lead_email` | e-mail, obligatoire pour la conversion |
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

## Contacts · `5093138641`

| Colonne | ID |
|---|---|
| Prénom | `text_mm3fzpb9` |
| Nom | `text_mm3f6gbt` |
| E-mail | `contact_email` |
| OptIn (Brevo) | `color_mm33h0xm` |
| Comptes | `contact_account` |

---

## Opportunités · `5093138639`

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

## Services - BB® · `5095856027` (lecture seule)

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

## Projets · `5097430798`

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
| Responsable mission | `person` | personne |
| Timeline | `timerange_mm447wb0` | plage de dates, alimente le Workload |
| Deadline | `date_mm44rnm8` | date |
| Entreprise | `text_mm668kb0` | texte, nom du client |
| Créatif | `multiple_person_mm44zf7v` | personne |
| Heures restantes | `formula_mm448zed` | formule |
| Rentabilité | `formula_mm44gysk` | formule |
| Tasks BBS | `board_relation_mm664xks` | lien vers `5102159651` |

### Colonnes métier Créa

| Colonne | ID | Valeurs |
|---|---|---|
| Statuts créa | `color_mm45ej0z` | Pas commencé · En Brief · En Cours · En Tournage · En Montage · En Validation · Modifications · Terminé |
| Type de Livrable | `dropdown_mm45khda` | Photo · Vidéo · Motion Design · Graphisme 2D |

:::note
Les statuts métier **Digital** ne sont pas encore figés, à définir avec Emmanuel.
:::

---

## Tasks BBS · `5102159651`

Board d'**agrégation**. La saisie se fait dans Projets ; l'essentiel des colonnes ici sont des miroirs, en lecture seule.

| Colonne | ID | Type |
|---|---|---|
| link to Subitems of Projets | `board_relation_mm668x6d` | lien vers `5097430830` |
| Responsable mission (miroir) | `lookup_mm66t63c` | miroir de `person` |
| Prise de la Mission (miroir) | `lookup_mm66naj1` | miroir de `status` |
| Miroir (time tracking) | `lookup_mm6be7x8` | miroir de `duration_mm40b29d` |
| **Responsable mission** | `multiple_person_mm66hjda` | personne, locale, max 1 |
| **Team Local** | `multiple_person_mm6bwtw6` | personne, locale, max 1 |
| **Entreprise Local** | `text_mm66kxbn` | texte, rempli par automatisation |

**Vues et filtres**

| Vue | ID | Filtre |
|---|---|---|
| Général | `55914130` | aucun |
| Créa/Photos/Vidéos | `55910475` | `multiple_person_mm6bwtw6` ∈ CREA · BRANDING · VIDEO |
| Digital/Web | `55914314` | `multiple_person_mm6bwtw6` ∈ DIGITAL · WEB · RS |
| Mes tâches | `55948518` | `multiple_person_mm66hjda` = utilisateur courant |

Les quatre vues sont regroupées par `multiple_person_mm66hjda`.

**Automatisations actives**

Deux recettes IA remplissent `text_mm66kxbn` en extrayant le nom de l'entreprise **depuis le nom de l'item** : l'une à la création de l'item, l'autre à chaque changement de nom. C'est la raison pour laquelle le nom du client doit figurer dans le nom de la tâche.

**Workflow « Création élément Créa »** · board hôte `5102160416`

C'est lui qui crée les items de Tasks BBS. L'API ne l'expose pas (`board_automations` renvoie vide, pour ce board comme au niveau du compte) : toute modification passe par l'éditeur monday.

| Étape | Configuration |
|---|---|
| Déclencheur | `When subitem column changes` → colonne *Responsable mission* |
| Condition | `Si la colonne est vide` → colonne *Responsable mission*, branche « Oui » |
| Action | `Create item` → board Tasks BBS, groupe du haut |

Mapping de l'action `Create item` :

| Colonne cible | Valeur |
|---|---|
| Nom | `Subitem » Entreprise` + `Subitem » Name` |
| `multiple_person_mm66hjda` (Responsable mission) | `Subitem » Responsable mission` |
| `multiple_person_mm6bwtw6` (Team Local) | `Item » Equipes` — la colonne de l'**élément parent** |
| `board_relation_mm668x6d` (link to Subitems of Projets) | non renseignée |
| `text_mm66kxbn` (Entreprise Local) | non renseignée — laissée aux recettes IA ci-dessus |

:::warning Deux conséquences
1. `board_relation_mm668x6d` restant vide, les colonnes miroir (`lookup_mm66t63c`, `lookup_mm66naj1`, `lookup_mm6be7x8`) n'affichent rien.
2. Les valeurs sont **copiées à la création**, pas synchronisées. Une réassignation ultérieure dans Projets ne remonte pas.
:::

Le workflow comporte une 4ᵉ étape non relevée ici.

**IDs des équipes**

| Équipe | ID | Vue |
|---|---|---|
| CREA | `13248232` | Créa/Photos/Vidéos |
| BRANDING | `13248241` | Créa/Photos/Vidéos |
| VIDEO | `13248238` | Créa/Photos/Vidéos |
| DIGITAL | `13248234` | Digital/Web |
| WEB | `13248233` | Digital/Web |
| RS | `13248235` | Digital/Web |
| PHOTO | `13248237` | ⚠️ aucune |
| STRATEGIE | `13248236` | ⚠️ aucune |

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
