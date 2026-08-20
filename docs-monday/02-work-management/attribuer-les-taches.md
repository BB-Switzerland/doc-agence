---
sidebar_position: 3
---

# Attribuer les tâches

Sidekick a monté le projet. Avant que quiconque puisse travailler, il faut **attribuer** : dire qui fait quoi, quand, et en combien de temps.

C'est le travail du **chef de projet** ou du **responsable de pôle**. Pas celui de la personne qui exécute.

:::tip La règle en une phrase
Une tâche mal attribuée n'existe pas : invisible dans le Workload, absente de « Mes tâches », et sans rentabilité.
:::

## Deux niveaux, deux rôles

| Niveau | Ce que c'est | Ce que tu y règles |
|---|---|---|
| **Élément** | Un service vendu | Les heures et l'équipe |
| **Sous-élément** | Une tâche concrète | Qui, quand, combien de temps |

L'essentiel se joue sur le **sous-élément**.

---

## 1. Sur l'élément

- [ ] **Heures prévues** — Sidekick les reprend du catalogue [Services - BB®](../03-reference/boards-et-colonnes.md). En création manuelle, ou si Sidekick a raté la ligne, remplis-les à la main.
- [ ] **Equipes** (`multiple_person_mm44aavq`) — quel pôle prend le service. C'est cette colonne qui est recopiée dans *Team Local* sur Tasks BBS : **elle seule** décide dans quelle vue de pôle la tâche apparaîtra.

:::warning « ⛔ Calcul Heures » n'est pas décoratif
Sur l'élément, **Heures prévues** est un miroir : il additionne les sous-éléments et ne s'édite pas. C'est **« ⛔ Calcul Heures »** (`numeric_mm3x8ty`) qui alimente les formules *Heures restantes* et *Rentabilité*. Laissée vide, la rentabilité du service est fausse.
:::

---

## 2. Sur le sous-élément : les 5 colonnes requises

| Colonne | ID | Si elle est vide |
|---|---|---|
| **Responsable mission** | `person` | Personne n'est assigné : hors Workload, hors « Mes tâches » |
| **Timeline** | `timerange_mm447wb0` | Hors Workload — c'est elle qui l'alimente, **pas** la Deadline |
| **Deadline** | `date_mm44rnm8` | Pas de date de livraison |
| **Heures prévues** | `numeric_mm3xybp8` | Pas de budget, donc pas de rentabilité |
| **Entreprise** | `text_mm668kb0` | Le nom du client disparaît du nom de la tâche |

Sidekick remplit normalement **Heures prévues** et **Entreprise**. Les trois autres sont **toujours manuelles**.

:::note Pourquoi « Entreprise » compte autant
Sur Tasks BBS, les tâches de tous les clients sont mélangées. Le nom du client en préfixe est le seul repère : « DILYTICS Sàrl - Création visuelle », pas « Création visuelle ».

Et ce n'est pas qu'une question de lisibilité : deux automatisations extraient le nom du client **depuis le nom de la tâche** pour remplir la colonne *Entreprise Local*. Pas de client dans le nom, pas d'entreprise sur Tasks BBS.
:::

---

## 3. Le board Tasks BBS

[Tasks BBS](https://agence-bb-ensemble.monday.com/boards/5102159651) est un board de **pilotage**, pas de travail. Ses colonnes *Responsable mission* et *Prise de la Mission* sont des **miroirs** des sous-éléments de Projets : tu modifies dans Projets, ça se répercute ici. L'inverse n'est pas vrai.

Trois colonnes lui appartiennent en propre :

| Colonne | ID | À quoi elle sert |
|---|---|---|
| **Responsable mission** | `multiple_person_mm66hjda` | Regroupe toutes les vues et pilote « Mes tâches » |
| **Team Local** | `multiple_person_mm6bwtw6` | Pilote les filtres Créa et Digital |
| **Entreprise Local** | `text_mm66kxbn` | Rempli automatiquement depuis le nom de la tâche |

:::danger Sans Team Local, la tâche n'est dans aucune vue de pôle
Elle reste visible dans « Général », nulle part ailleurs. C'est le cas aujourd'hui de « KATANA DIGITAL - TEST KATANA ».

*Team Local* est recopiée depuis la colonne **Equipes de l'élément parent** à la création de la tâche. Élément sans équipe = tâche orpheline.
:::

### Comment la tâche arrive sur ce board

Tu ne crées jamais d'item ici à la main. C'est le workflow **« Création élément Créa »** (hébergé sur le board `5102160416`) qui s'en charge.

| Étape | |
|---|---|
| 1. **Déclencheur** | La colonne *Responsable mission* d'un sous-élément change |
| 2. **Condition** | Cette colonne **n'est pas vide** (`is not empty`) |
| 3. **Action** | Création d'un item sur Tasks BBS, dans le groupe du haut |
| 4. **Action** | *Connect boards* : relie l'item créé au sous-élément d'origine |

Autrement dit : **la tâche n'arrive sur Tasks BBS qu'au moment où tu assignes un responsable** sur le sous-élément. Tant que la case est vide, rien ne se crée.

Ce qu'il recopie :

| Colonne Tasks BBS | Source |
|---|---|
| **Nom** | *Entreprise* + nom du sous-élément |
| **Responsable mission** | *Responsable mission* du sous-élément |
| **Team Local** | **Equipes de l'élément parent** |

:::warning Deux colonnes « Responsable mission », et elles peuvent diverger
Tasks BBS en porte **deux** :

- la **locale** (`multiple_person_mm66hjda`), recopiée à la création et **limitée à une personne**. C'est elle qui regroupe les vues et qui alimente « Mes tâches » ;
- le **miroir** (`lookup_mm66t63c`), branché en direct sur le sous-élément, qui suit toutes les modifications et accepte plusieurs personnes.

Grâce à l'étape 4, le lien vers Projets est bien établi : *Prise de la Mission* et le time tracking remontent en direct.

Mais la colonne locale, elle, est figée. Exemple réel : la tâche « KATANA DIGITAL - Maquettes site web » affiche *Sylvain Varnet et Nicole Arhanchet Alonso* dans le miroir, et **Sylvain Varnet seul** en local. Nicole ne verra donc jamais cette tâche dans sa vue « Mes tâches ».

**Si tu ajoutes ou changes un responsable après coup, corrige aussi la colonne locale sur Tasks BBS.**
:::

### Les vues

| Vue | Ce qu'elle montre | Filtre |
|---|---|---|
| **Général** | Toutes les tâches | aucun |
| **Créa/Photos/Vidéos** | Le pôle création | Team Local = CREA · BRANDING · VIDEO |
| **Digital/Web** | Le pôle digital | Team Local = DIGITAL · WEB · RS |
| **Mes tâches** | Les tiennes | Responsable mission = toi |

Les quatre sont regroupées par **Responsable mission**.

---

## Points ouverts sur le board

Relevés sur la configuration actuelle, à traiter :

- [ ] **« Mes tâches » ne masque pas les tâches terminées.** Le filtre ne porte que sur le responsable. Ajouter une règle **Prise de la Mission ≠ Terminée** pour ne pas polluer la vue.
- [ ] **L'équipe PHOTO n'est dans aucune vue.** Elle existe (`13248237`) mais ne figure dans aucun filtre. À ajouter aux groupes de filtre de « Créa/Photos/Vidéos » dès qu'une tâche photo arrive.
- [ ] **L'équipe STRATEGIE non plus** (`13248236`). À trancher : nouvelle vue, ou rattachement à une vue existante.
- [ ] **Responsable mission local plafonné à une personne.** Une tâche portée à deux n'en fait remonter qu'un dans « Mes tâches ». Soit on autorise plusieurs personnes sur la colonne locale, soit on filtre « Mes tâches » sur le miroir plutôt que sur elle.

---

## Questions fréquentes

**Qui attribue nominativement ?** Sidekick assigne à l'**équipe**, jamais à une personne. Le responsable de pôle répartit ensuite.

**J'ai rempli le responsable et la tâche n'est pas dans le Workload.** Il manque la **Timeline**. C'est elle qui alimente le Workload, pas la Deadline.

**Je modifie sur Tasks BBS, rien ne bouge dans Projets.** Normal, la saisie de référence se fait sur le sous-élément dans **Projets**. Les colonnes miroir de Tasks BBS suivent automatiquement ; la colonne locale *Responsable mission*, non — elle reste figée à la création.

**Ma tâche n'est pas sur Tasks BBS.** Le sous-élément n'a pas de *Responsable mission* : c'est ce qui déclenche la création.

**Une tâche n'apparaît dans aucune vue de pôle.** Il lui manque **Team Local**, parce que l'élément parent n'avait pas d'**Equipes** au moment de la création. Renseigne Team Local sur Tasks BBS, puis corrige Equipes sur l'élément pour les tâches suivantes.
