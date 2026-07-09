---
sidebar_position: 2
---

# Onboarder un projet depuis un devis (Sidekick)

Le devis est signé. Il faut maintenant en faire un projet exploitable dans le board Projets. C'est **Sidekick**, l'IA de monday, qui fait le gros du travail — à partir du PDF et d'un prompt.

:::warning Cette page remplace l'ancien process
Le flux Salesforce → macro Excel `onboarding_template_def.xlsm` → import Monday n'est plus utilisé.
:::

## Pré-requis

Avant de lancer Sidekick, vérifie que l'opportunité est bien en statut **Signé**, que le **PDF du devis** est présent dans la colonne « Devis Vibe », et que tu as accès à **Sidekick**.

:::info Pourquoi Sidekick plutôt qu'une automatisation native ?
Décision prise au Workshop #4. La majorité des informations utiles sont dans le PDF, pas dans des colonnes structurées. Une automatisation complète serait coûteuse à construire et fragile à maintenir, pour 3 à 6 projets par mois. Sidekick lit le PDF, interroge les boards, et crée la structure en quelques minutes.
:::

## La vision

Trois principes guident cet import.

**Chaque ligne vendue devient une tâche exploitable.** Pas de « projet » vague : des items et des sous-items, avec leurs heures.

**L'Introduction et les Missions restent omniprésentes.** Ce que le commercial a écrit dans l'opportunité doit être lisible par la personne qui exécute la tâche.

**L'assignation se fait par pôle**, puis le responsable l'affine nominativement.

## Ce que fait Sidekick

Tu n'as pas à exécuter ces étapes à la main, mais tu dois savoir ce qu'il fait pour vérifier son travail.

1. **Il lit le PDF** et en extrait l'entreprise, le numéro d'offre, la durée de collaboration et la liste des produits, dans leur ordre exact d'apparition.
2. **Il cherche chaque produit** dans le catalogue Services - BB® pour récupérer son prix, ses heures, ses équipes, sa catégorie, sa description — et ses sous-éléments via GraphQL.
3. **Il retrouve l'opportunité** pour en tirer l'Introduction, la Mission et l'e-mail du contact.
4. **Il crée le groupe** dans Projets, nommé d'après l'entreprise, le numéro d'offre et la durée.
5. **Il crée les items**, un par produit, dans l'ordre du devis.
6. **Il crée les sous-items**, dans l'ordre exact.
7. **Il crée un monday Doc « Introduction »** attaché à chaque item.

:::warning L'étape 2 est la plus fragile
Le chargement standard d'un item monday **ne renvoie pas ses sous-éléments**. Sidekick doit exécuter une requête GraphQL explicite. Sans elle, il conclura à tort que le service n'a pas de sous-tâches — et ton projet arrivera vide de ses étapes opérationnelles.
:::

Le groupe créé porte un nom de cette forme :

```text
VENDITUM - Section de Genève - Offre 2961195802 | Pour 1 mois de collaboration
```

## Le prompt à utiliser

:::tip Comment faire
1. Ouvre la page [Référence → Prompt Sidekick](../03-reference/prompt-sidekick.md).
2. Copie le prompt en entier.
3. Colle-le dans Sidekick et **joins le PDF du devis signé**.
:::

:::note Captures à ajouter

- `./img/sidekick-ouvrir.png` — l'ouverture de Sidekick dans monday
- `./img/sidekick-prompt-pdf.png` — le prompt collé avec le PDF joint — la pièce jointe doit être visible

:::

## Vérifications post-import

Sidekick termine par un tableau récapitulatif. Contrôle-le :

- [ ] Le **groupe** porte le bon nom — entreprise, numéro d'offre, durée
- [ ] Il y a un **item par ligne du devis**, avec son prix, ses heures et sa catégorie
- [ ] L'**ordre des items** est identique à celui du PDF
- [ ] Les **sous-items** sont présents, dans l'ordre, avec leurs heures prévues
- [ ] Chaque item a son **doc « Introduction »**, et il n'est pas vide
- [ ] Le **Responsable** est assigné : Emmanuel pour les pôles Digital, Estefanía pour la Créa

:::note Captures à ajouter

- `./img/projets-groupe-cree.png` — le groupe créé par Sidekick, items dans l'ordre du devis
- `./img/projets-doc-introduction.png` — un monday Doc « Introduction » attaché à un item

:::

## Règles d'or

:::danger Ne jamais écrire dans Services - BB®
Ce board est en lecture seule. C'est la source des prix, des heures et des sous-tâches de toute l'agence. Sidekick le lit, il ne l'écrit pas — et toi non plus.
:::

:::warning Toujours récupérer les sous-éléments via GraphQL
Le prompt contient la requête. Ne la retire pas, ne la « simplifie » pas.
:::

:::warning Respecter l'ordre exact des lignes du devis
L'ordre du devis est l'ordre contractuel. Il structure la lecture du projet, par le client comme par l'équipe.
:::

## Exemple réel

Dans le groupe « Paillasse Marketing SA - Offre 2956253282 | Pour 12 mois », l'item **« Pré-production pour prise de vue (storyboard) »** est facturé 590.- pour 4 heures, en catégorie Shooting/Tournage.

Il se décompose en quatre sous-tâches : Réception brief (1 h 30), Présentation équipe (0 h 30), Validation client (0 h 52) et Storyboarding (2 h 30).

## Erreurs fréquentes

**Sous-éléments manquants.** La requête GraphQL n'a pas été exécutée. Le projet n'a alors aucune étape opérationnelle et les heures ne se calculent pas.

**Ordre des items non respecté.** Sidekick a réordonné, et le projet ne correspond plus au devis contractuel.

**Caractères invisibles dans les numéros de téléphone**, copiés depuis le PDF. La colonne devient invalide.

**Doc « Introduction » vide.** L'Introduction était vide sur l'opportunité — voir [la page devis](../01-crm/opportunite-devis-creator.md).

---

**Étape suivante :** [Piloter le projet](./executer-projet.md).
