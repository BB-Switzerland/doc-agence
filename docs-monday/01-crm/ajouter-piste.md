---
sidebar_position: 2
---

# Ajouter & qualifier une piste

Une piste, c'est le point d'entrée de tout le CRM. Cette page explique d'où elles viennent, comment les saisir et comment on les qualifie.

## D'où viennent les pistes

Toutes les pistes atterrissent dans le board [Prospects / Pistes](https://agence-bb-ensemble.monday.com/boards/5093138638), quelle que soit leur provenance. Sept canaux sont possibles : le site web, le téléphone, Sortlist, la newsletter, les deux boîtes e-mail génériques (impact et Influence Switzerland), et la saisie manuelle. La colonne « Origine de la piste » enregistre lequel.

## Entrée automatique via le site

Le formulaire maison et le chatbot BiBi, développés en interne par Charles et connectés à l'API monday, créent la ligne tout seuls : les colonnes sont mappées, l'origine est renseignée, et une notification part dans Slack. Tu n'as rien à faire.

:::note
Typeform a été abandonné au profit du formulaire maison. Si tu croises encore des références à Typeform, elles sont obsolètes.
:::

## Entrée manuelle

Quand un lead arrive par téléphone ou par un canal non automatisé :

1. Ouvre le board [Prospects / Pistes](https://agence-bb-ensemble.monday.com/boards/5093138638).
2. Place-toi dans le groupe « Prospects en cours de traitement ».
3. Clique sur **+ Ajouter**.

Renseigne au minimum :

- **l'e-mail** — sans lui, la conversion en Contact et la synchro Brevo sont bloquées,
- **l'origine de la piste**,
- **l'unité d'affaires** et **le principal intérêt**,
- **le budget potentiel** et **la langue**.

Les autres champs (secteur d'activité, type de contact, raison sociale) se complètent au fil des échanges.

:::tip Les IDs techniques des colonnes
Ils sont regroupés dans [Référence → Prospects / Pistes](../03-reference/boards-et-colonnes.md#prospects--pistes--5093138638), avec la liste complète des valeurs possibles.
:::

:::note Captures à ajouter

- `./img/piste-board.png` — le board Prospects / Pistes, groupe « Prospects en cours de traitement » visible
- `./img/piste-nouvelle.png` — le formulaire d'ajout d'une piste, colonnes principales visibles

:::

## Qualifier la piste

Amancio analyse chaque piste — profil LinkedIn, crédibilité de la demande, pertinence par rapport à nos offres — et lui attribue un score par tranches de 20 %. Ce score évolue après chaque interaction avec le prospect.

La colonne « Statut » suit un cycle simple. Une piste arrive en **Entrée non traitée**, passe en **Tentative de contact** dès qu'on essaie de la joindre, puis en **Contacté** quand le prospect répond. À l'issue de la qualification, elle devient **Qualifié** — et poursuit vers l'opportunité — ou **Non qualifié**, et on s'arrête là.

:::tip
Ne multiplie pas les statuts. Ce cycle couvre tous les cas réels : si tu hésites entre deux, c'est probablement que la piste n'a pas encore été travaillée.
:::

:::note Capture à ajouter

- `./img/piste-score.png` — les colonnes Score et Statut d'une piste qualifiée

:::

## Ce qui part automatiquement

Un e-mail de confirmation de réception est envoyé au prospect.

Si celui-ci a coché l'opt-in Newsletter, son contact est synchronisé vers **Brevo** (liste 11) via l'intégration **n8n**.

## Checklist

- [ ] E-mail renseigné et valide
- [ ] Origine de la piste sélectionnée
- [ ] Unité d'affaires et principal intérêt renseignés
- [ ] Budget potentiel renseigné, pas laissé sur « A clarifier » si l'info existe
- [ ] Langue du prospect définie
- [ ] Statut positionné

## Erreurs fréquentes

**E-mail manquant ou malformé.** C'est de loin la plus coûteuse : elle bloque la conversion en Contact et la synchro Brevo. Vérifie-le avant de valider.

**Doublon de piste.** Deux contacts finissent créés et l'historique du prospect se retrouve éclaté sur deux lignes.

**Budget laissé sur « A clarifier »** alors que l'information est connue. Le scoring est faussé et la priorisation devient impossible.

**Origine non renseignée.** On perd la capacité de mesurer quel canal rapporte.

---

**Étape suivante :** [Convertir la piste en Contact + Compte](./convertir-contact-compte.md).
