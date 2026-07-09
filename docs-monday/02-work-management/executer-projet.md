---
sidebar_position: 3
---

# Piloter un projet : statuts, heures, rentabilité

Le projet est importé. Voici comment il vit.

## Prendre une mission

Chaque sous-item porte une colonne « Prise de la Mission ». Une tâche part en **Non récupérée**, passe en **En cours de production** dès que quelqu'un s'en charge, puis en **Terminée**. Si elle est empêchée — dépendance non levée, attente client — elle passe en **Bloqué**.

:::info Date de démarrage automatique
Une automatisation renseigne la date de démarrage dès que tu passes le sous-item en « En cours de production ». Le nombre d'automatisations est plafonné par la licence Pro : c'est pour ça qu'il n'y en a pas partout.
:::

:::note Capture à ajouter

- `./img/projet-sous-tache-statut.png` — la colonne « Prise de la Mission » sur un sous-item

:::

## Statuts métier Créa

Trois colonnes décrivent l'avancement d'un livrable créa.

Les **Phases créa** découpent le travail en Pré-production, Production, Post-Prod et Validation. Les **Statuts créa** suivent l'état concret de la tâche : À faire, En Brief, En Tournage, En Montage, En Validation, Terminé. Enfin le **Type de Livrable** précise s'il s'agit d'une Photo, d'une Vidéo, d'un Motion Design ou d'un Graphisme 2D.

:::tip Les IDs techniques des colonnes
Ils sont regroupés dans [Référence → Colonnes métier Créa](../03-reference/boards-et-colonnes.md).
:::

## Statuts métier Digital

:::note Section à compléter
Les statuts métier Digital ne sont pas encore figés — ils doivent être définis avec Emmanuel. Les phases Web pressenties : Conception, Maquettage, Validation client, Développement, Contrôle qualité, Mise en ligne.

Les liens Figma et autres ressources externes sont stockés directement dans l'item.
:::

## Heures & rentabilité

C'est le cœur du système, et il tient en trois temps.

Chaque sous-tâche arrive avec des **heures prévues**, héritées du catalogue Services. Chacun encode ensuite son **time tracking** sur la sous-tâche qu'il exécute. Le système en déduit les **heures restantes** et la **rentabilité**, qui s'affiche en vert quand on est dans le budget, en orange quand il est écoulé, et en rouge en cas de dépassement.

La rentabilité se lit à deux niveaux : celui de la tâche, et celui du service qui la contient.

:::note Captures à ajouter

- `./img/projet-time-tracking.png` — la colonne Time tracking en cours d'encodage
- `./img/projet-rentabilite.png` — la colonne Rentabilité montrant les trois états (vert / orange / rouge)

:::

## Dépendances & notifications

Les dépendances sont **manuelles**. Les enchaînements varient selon plus de 125 combinaisons de services possibles : aucune règle générique ne tient.

Une notification part au chef de projet quand un service passe en « Done ». Une vue Gantt est disponible au niveau du projet.

:::note Capture à ajouter

- `./img/projet-gantt.png` — la vue Gantt d'un projet

:::

## Workload

La vue Workload n'affiche une tâche que si elle porte les quatre informations suivantes : un **assigné**, une **date de début**, une **date de fin** et des **heures prévues**.

:::warning
Si une tâche n'apparaît pas dans le Workload, c'est presque toujours qu'il manque l'un de ces quatre champs.
:::

---

**Étape suivante :** [Vues Créa & Digital](./vues-crea-digital.md).
