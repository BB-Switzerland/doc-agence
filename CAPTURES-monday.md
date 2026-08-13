# Captures d'écran à réaliser : rubrique Monday 2.0

**15 des 24 captures sont faites.** Il en reste **9**, listées ci-dessous.

Les originaux plein écran sont conservés dans `docs-monday/monday-v2-assets/`. Les versions publiées sont redimensionnées à 1600 px de large et déposées dans le dossier `img/` **à côté** du `.md` qui les référence.

Pour ajouter une capture manquante :

1. Dépose l'original dans `docs-monday/monday-v2-assets/`.
2. Redimensionne-la dans le bon dossier :
   ```bash
   sips --resampleWidth 1600 docs-monday/monday-v2-assets/NOM.png \
        --out docs-monday/DOSSIER/img/NOM.png
   ```
3. Ajoute le tag image dans la page, à l'endroit décrit :
   ```markdown
   ![Description de la capture](./img/NOM.png)
   ```
4. Relance `npm run build`. Docusaurus échoue si un chemin d'image ne pointe sur rien.

> **Avant les captures :** nettoyer les doublons de groupes dans Projets (VENDITUM, NEPSA) et éviter les items de test (Project Alpha/Beta, Julie test).
>
> **Données personnelles :** les captures déjà publiées montrent des noms, e-mails et téléphones de prospects réels. Pour les suivantes, privilégier un client de démonstration.

---

## Ce qu'il reste à faire

### `docs-monday/01-crm/img/`

| Fichier | Page | Quoi cadrer |
|---|---|---|
| `piste-score.png` | ajouter-piste | Les colonnes Score et Statut sur une piste qualifiée |
| `contact-lier-compte.png` | convertir-contact-compte | Un Contact dont la colonne « Comptes » est reliée à une entreprise |
| `docusign-flow.png` | opportunite-devis-creator | L'écran DocuSign avec les champs signature, nom et date placés |

### `docs-monday/02-work-management/img/`

| Fichier | Page | Quoi cadrer |
|---|---|---|
| `projets-groupe-cree.png` | onboarder-un-projet | Un groupe créé par Sidekick, ses items dans l'ordre du devis |
| `projets-doc-introduction.png` | onboarder-un-projet | Un monday Doc « Introduction » attaché à un item |
| `projet-sous-tache-statut.png` | gerer-mes-taches | La colonne « Prise de la Mission » sur un sous-item |
| `projet-rentabilite.png` | gerer-mes-taches | La colonne Rentabilité, si possible trois lignes montrant vert, orange et rouge |
| `projet-gantt.png` | gerer-mes-taches | La vue Gantt d'un projet |
| `vue-workload.png` | gerer-mes-taches | La vue Workload d'une équipe |

---

## Ce qui est déjà publié

### `docs-monday/01-crm/img/`

`piste-board.png` · `piste-nouvelle.png` · `convertir-bouton.png` · `oppo-board.png` · `devis-creator-app.png` · `devis-creator-produits.png` · `devis-creator-reglages.png` · `devis-creator-totaux.png` · `devis-creator-boutons-langues.png` · `oppo-colonne-devis.png`

### `docs-monday/02-work-management/img/`

`projets-structure.png` · `sidekick-ouvrir.png` · `sidekick-prompt-pdf.png` · `projet-time-tracking.png` · `vue-mes-taches-crea.png`

### `docs-monday/img/`

Aucune capture. Le parcours est un schéma Mermaid écrit directement dans `index.md`.
