---
sidebar_position: 3
---

# Attribuer les tâches

Sidekick a monté le projet. Reste à dire **qui fait quoi, quand, et en combien de temps**.

C'est le travail du chef de projet ou du responsable de pôle, pas de la personne qui exécute.

:::tip La règle
Une tâche mal attribuée n'existe pas : hors Workload, hors « Mes tâches », sans rentabilité.
:::

## Deux niveaux

| Niveau | Ce que c'est | Ce que tu y règles |
|---|---|---|
| **Élément** | Un service vendu | Les heures et l'équipe |
| **Sous-élément** | Une tâche concrète | Qui, quand, combien de temps |

---

## 1. Sur l'élément

- [ ] **Heures prévues** — Sidekick les reprend du catalogue Services - BB®. En création manuelle, ou s'il a raté la ligne, à la main.
- [ ] **⛔ Calcul Heures** — c'est elle qui alimente *Heures restantes* et *Rentabilité*. Vide, la rentabilité du service est fausse. À ne pas confondre avec *Heures prévues*, qui n'est qu'un total des sous-éléments et ne s'édite pas.
- [ ] **Equipes** — quel pôle prend le service. Elle est recopiée dans *Team Local* sur Tasks BBS : **elle seule** décide dans quelle vue de pôle la tâche apparaîtra.

---

## 2. Sur le sous-élément : 5 colonnes

| Colonne | Si elle est vide |
|---|---|
| **Responsable mission** | La tâche n'est pas créée sur Tasks BBS du tout |
| **Timeline** | Hors Workload — c'est elle qui l'alimente, **pas** la Deadline |
| **Deadline** | Pas de date de livraison |
| **Heures prévues** | Pas de budget, donc pas de rentabilité |
| **Entreprise** | Le nom du client disparaît du nom de la tâche |

Sidekick remplit **Heures prévues** et **Entreprise**. Les trois autres sont **toujours manuelles**.

:::note Pourquoi « Entreprise » compte
Sur Tasks BBS les clients sont mélangés : le nom du client en préfixe est le seul repère. « DILYTICS Sàrl - Création visuelle », pas « Création visuelle ».

Et une automatisation extrait ce nom **depuis le nom de la tâche** pour remplir *Entreprise Local*. Pas de client dans le nom, pas d'entreprise sur le board.
:::

---

## 3. Le board Tasks BBS

Un board de **pilotage** : toutes les tâches de l'agence, tous clients confondus. Tu n'y crées jamais rien à la main.

### Comment la tâche y arrive

Un workflow s'en charge :

| | |
|---|---|
| 1. Déclencheur | Le *Responsable mission* d'un sous-élément change |
| 2. Condition | Il n'est pas vide |
| 3. Action | Création de la tâche sur Tasks BBS |
| 4. Action | Liaison de la tâche au sous-élément d'origine |

**Rien ne se crée tant que tu n'as pas assigné un responsable.** C'est ce qui déclenche tout.

Il recopie le nom (*Entreprise* + nom du sous-élément), le **responsable**, et **Team Local** depuis les *Equipes de l'élément parent*.

:::danger Deux colonnes « Responsable mission », et elles divergent
Tasks BBS en porte deux : un **miroir**, branché sur Projets, qui suit les modifications et accepte plusieurs personnes — et une colonne **locale**, copiée à la création, **limitée à une personne**, jamais resynchronisée.

C'est la **locale** qui regroupe les vues et filtre « Mes tâches ».

Cas réel : « KATANA DIGITAL - Maquettes site web » porte *Sylvain Varnet et Nicole Arhanchet Alonso* dans le miroir, *Sylvain Varnet* seul en local. Nicole ne voit pas la tâche dans sa vue.

**Tu ajoutes ou changes un responsable après coup ? Corrige aussi la colonne locale sur Tasks BBS.**
:::

### Les vues

| Vue | Filtre |
|---|---|
| **Général** | aucun |
| **Créa/Photos/Vidéos** | Team Local = CREA · BRANDING · VIDEO |
| **Digital/Web** | Team Local = DIGITAL · WEB · RS |
| **Mes tâches** | Responsable mission = toi |

Toutes regroupées par **Responsable mission**.

:::warning Sans Team Local, la tâche n'est dans aucune vue de pôle
Elle reste dans « Général », nulle part ailleurs. Cause : l'élément parent n'avait pas d'*Equipes* à la création.
:::

---

## Points ouverts

- [ ] **« Mes tâches » n'exclut pas les tâches terminées.** Ajouter une règle *Prise de la Mission ≠ Terminée*.
- [ ] **L'équipe PHOTO n'est dans aucune vue.** Elle existe déjà : l'ajouter aux filtres de « Créa/Photos/Vidéos » dès qu'une tâche photo arrive.
- [ ] **L'équipe STRATEGIE non plus.** Nouvelle vue, ou rattachement à une vue existante ?
- [ ] **Responsable mission local plafonné à une personne.** Une tâche portée à deux n'en fait remonter qu'un. Autoriser plusieurs personnes, ou filtrer « Mes tâches » sur le miroir.

---

## Questions fréquentes

**Qui attribue nominativement ?** Sidekick assigne à l'**équipe**, jamais à une personne. Le responsable de pôle répartit ensuite.

**La tâche n'est pas dans le Workload.** Il manque la **Timeline**. C'est elle qui l'alimente, pas la Deadline.

**Ma tâche n'est pas sur Tasks BBS.** Le sous-élément n'a pas de *Responsable mission*.

**Une tâche n'est dans aucune vue de pôle.** Il lui manque *Team Local*. Renseigne-la, puis corrige *Equipes* sur l'élément pour les suivantes.

**Je modifie sur Tasks BBS, rien ne bouge dans Projets.** La saisie de référence est sur le sous-élément dans Projets.

:::info Les IDs de colonnes
Ils sont dans [IDs des boards & colonnes](../03-reference/boards-et-colonnes.md), avec le détail du workflow.
:::
