# Prompt à donner à l'extension Claude (navigateur)

Copie tout le bloc ci-dessous et colle-le dans l'extension, avec un onglet déjà connecté à `agence-bb-ensemble.monday.com`.

---

Tu vas m'aider à produire 24 captures d'écran pour la documentation interne de notre agence. Le compte monday est `agence-bb-ensemble.monday.com` et je suis déjà connecté dans cet onglet.

## Règles absolues

1. **Tu ne modifies rien.** Navigation, ouverture d'items, changement de vue et captures uniquement. Tu ne changes aucune valeur de colonne, tu ne crées ni ne supprimes rien, tu ne déplaces aucun item.
2. **Dans l'app « Devis Creator », ne clique jamais sur les boutons de génération de PDF (FR / EN / DE / IT) ni sur « Sauvegarder ».** Ils écrivent pour de vrai sur l'opportunité du client. Tu peux ouvrir l'app et faire défiler, rien de plus.
3. **Ne touche jamais au board « Services - BB® » (`5095856027`).** Il est en lecture seule pour toute l'agence.
4. **Si un écran est introuvable ou inaccessible, dis-le-moi et passe au suivant.** Ne me livre pas une capture approchante en la faisant passer pour la bonne, et n'invente pas de contenu.

## Consignes de cadrage

- **Format PNG**, largeur environ 1400 px.
- **Cadre serré** sur l'élément décrit. Pas de capture plein écran dans laquelle il faut chercher l'information.
- **Toutes les captures dans le même thème** (le thème clair de monday, par défaut). Ne bascule pas d'un thème à l'autre en cours de route.
- **Anonymise** : évite les e-mails de clients réels et les montants confidentiels. Privilégie un client de démonstration quand c'est possible.
- **Évite les données de test** : les items « Project Alpha », « Project Beta », « Julie test », et les groupes en double dans Projets (VENDITUM, NEPSA).

## Comment me livrer le résultat

Traite les captures **une par une, dans l'ordre**. Pour chacune, annonce d'abord ce que tu vas cadrer, prends la capture, puis donne-moi le nom de fichier et le dossier de destination. Si tu peux déclencher un téléchargement, nomme le fichier exactement comme indiqué.

---

## Groupe 1 : le CRM

Destination : `docs-monday/01-crm/img/`

| # | Fichier | Où | Quoi cadrer |
|---|---|---|---|
| 1 | `piste-board.png` | [Prospects / Pistes](https://agence-bb-ensemble.monday.com/boards/5093138638) | Le board avec le groupe « Prospects en cours de traitement » visible |
| 2 | `piste-nouvelle.png` | idem | Le formulaire d'ajout d'une piste, colonnes principales visibles |
| 3 | `piste-score.png` | idem | Les colonnes Score et Statut sur une piste qualifiée |
| 4 | `convertir-bouton.png` | idem | Le bouton « Déplacer dans les contacts » sur une ligne de piste |
| 5 | `contact-lier-compte.png` | [Contacts](https://agence-bb-ensemble.monday.com/boards/5093138641) | Un Contact dont la colonne « Comptes » est reliée à une entreprise |
| 6 | `oppo-board.png` | [Opportunités](https://agence-bb-ensemble.monday.com/boards/5093138639) | Le board avec les groupes du pipeline visibles (Nouveau, Négociation, Conclu, Perdu) |
| 7 | `devis-creator-app.png` | Opportunités, onglet de l'app depuis un item | L'app Devis Creator ouverte, écran de sélection |
| 8 | `devis-creator-produits.png` | idem | L'ajout de produits depuis le catalogue, groupés par catégorie |
| 9 | `devis-creator-reglages.png` | idem | Le bloc des réglages globaux : durée contractuelle, devise, budget publicitaire avancé, expiration |
| 10 | `devis-creator-totaux.png` | idem | La cascade des totaux : Total HT, rabais, budget publicitaire, agence, TVA, TTC, acompte |
| 11 | `devis-creator-boutons-langues.png` | idem | Les quatre boutons FR / EN / DE / IT. **Cadre-les sans cliquer dessus.** |
| 12 | `oppo-colonne-devis.png` | Opportunités | La colonne « Devis Vibe » d'une opportunité, avec son PDF déposé |

## Groupe 2 : les projets

Destination : `docs-monday/02-work-management/img/`

| # | Fichier | Où | Quoi cadrer |
|---|---|---|---|
| 13 | `projets-structure.png` | [Projets](https://agence-bb-ensemble.monday.com/boards/5097430798) | Un groupe déplié, avec un item lui-même déplié montrant ses sous-items |
| 14 | `projets-groupe-cree.png` | idem | Un groupe créé par Sidekick, ses items dans l'ordre du devis |
| 15 | `projets-doc-introduction.png` | idem | Un monday Doc « Introduction » attaché à un item |
| 16 | `projet-sous-tache-statut.png` | idem | La colonne « Prise de la Mission » sur un sous-item |
| 17 | `projet-time-tracking.png` | idem | La colonne Time tracking en cours d'encodage |
| 18 | `projet-rentabilite.png` | idem | La colonne Rentabilité. Si possible, cadre trois lignes montrant les états vert, orange et rouge |
| 19 | `projet-gantt.png` | idem, vue Gantt | La vue Gantt d'un projet |
| 20 | `vue-mes-taches-crea.png` | idem, vue « Mes tâches Créa » | La vue filtrée |
| 21 | `vue-workload.png` | idem, vue Workload | La charge de travail d'une équipe |
| 22 | `sidekick-ouvrir.png` | N'importe où dans monday | L'ouverture du panneau Sidekick |
| 23 | `sidekick-prompt-pdf.png` | Sidekick | Un prompt collé **avec un PDF joint**. La pièce jointe doit être visible. **N'envoie pas le prompt**, cadre juste la zone de saisie remplie. |

## Groupe 3 : hors monday

Destination : `docs-monday/01-crm/img/`

| # | Fichier | Où | Quoi cadrer |
|---|---|---|---|
| 24 | `docusign-flow.png` | DocuSign | L'écran de préparation avec les champs signature, nom et date placés sur le document |

Cette dernière capture est en dehors de monday. Si tu n'as pas accès à DocuSign, dis-le-moi et arrête-toi là.

---

## Une fois les 24 fichiers déposés

Dans chaque page concernée, remplace le bloc placeholder :

```markdown
> 📸 **Capture à venir** : le board Prospects / Pistes, groupe « Prospects en cours de traitement » visible.
> Fichier attendu : `./img/piste-board.png`
```

par le tag image, en reprenant la description comme texte alternatif :

```markdown
![Le board Prospects / Pistes, groupe « Prospects en cours de traitement »](./img/piste-board.png)
```

Puis relance `npm run build` pour vérifier qu'aucune image n'est manquante : Docusaurus échoue au build si un chemin d'image ne pointe sur rien.
