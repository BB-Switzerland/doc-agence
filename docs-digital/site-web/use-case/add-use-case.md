import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

# Ajouter un Use Case

Une fois connecté dans le back-office rendez-vous dans l'onglet [Use Case](https://agence-bb.ch/wp-admin/edit.php?post_type=use_case).

## Différents champs à remplir

<Tabs groupId="operating-systems">
  <TabItem value="page" label="Information page use case">
  
| **Champs**          | **Utilité**                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| Phrase d'accroche   | Phrase d'accroche qui sera affichée en introduction du Use Case                         |
| Visuel Vignette     | Image de vignette pour la page Use Case                                                 |
| Visuel Header       | Image principale qui sera affichée en header sur la page du Use Case                   |
| Mission             | Première section de texte → décrivez la mission du projet                               |
| Logo Client         | Logo du client (prévoir version blanche si site sur fond noir)                         |
| Visuel principal    | Image principale du projet (version desktop)                                            |
| Visuel principal - Mobile | Image principale du projet (version mobile)                                        |
| Actions             | Deuxième section de texte → décrivez les actions pour accomplir la mission             |
| Groupe de 4 images/vidéos | 4 visuels qui illustrent les actions (Visuel 1, 2, 3, 4)                        |
| Résultats           | Section des résultats avec chiffres et performances                                     |
| Visuel de Cloture   | Image de fin de projet (version desktop)                                               |
| Visuel de Cloture - Mobile | Image de fin de projet (version mobile)                                           |
| Couleur fond client | Couleur de fond pour la section client                                                 |
| Couleur client      | Couleur principale du client                                                           |
  </TabItem>
  <TabItem value="slider" label="Informations slider home">
  | **Champs**          | **Utilité**                                                                             |
|---------------------|-----------------------------------------------------------------------------------------|
| Image du projet     | Image qui sera affichée dans le slider sur tablette et desktop                           |
| Image du projet mobile      | Image qui sera affichée dans le slider sur mobile   |
| Nom du projet          | Titre qui sera affiché dans le slider                               |
| Description du projet         | Texte court qui sera affiché dans le slider             |
| Lien vers le projet    | Lien du Use Case                         |
  </TabItem>
</Tabs>

## Section Résultats

La section **Résultats** permet d'afficher des chiffres clés avec les champs suivants :

### Configuration des chiffres
- **Texte introduction** : Texte d'introduction pour la section résultats
- **Chiffre 1, 2, 3, 4** : Jusqu'à 4 chiffres clés
- Pour chaque chiffre :
  - **Lettre chiffre avant +/-** : Préfixe (ex: +50%)
  - **Chiffre** : Valeur numérique
  - **Lettre chiffre** : Suffixe (%, K, M, etc.)
  - **Légende** : Description du chiffre

## Image de mise en avant

Renseignez l'image de mise en avant la même que **Visuel Vignette**.

:::info

L'image de mise en avant est indispensable pour que le Use Case s'affiche dans la page [Use Case](https://agence-bb.ch/use-case).

:::

:::warning

Après chaque modification sur le site web, il est **impératif** de vider le cache du site via le menu tout en haut ***WP Rocket*** > ***Vider et précharger le cache***.

Une fois le cache vidé il faut **naviguer** sur le site **sans être connecté à l'administration** pour que le cache se remette sur les pages principales ⚠️ ⚠️.

:::
