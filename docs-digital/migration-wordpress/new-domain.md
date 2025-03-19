---
sidebar_position: 4
---

# Créer un nouveau site

Cette documentation explique les étapes à suivre pour commander un nouvel hébergement sur Infomaniak afin de mettre en production un site web que vous souhaitez migrer.

:::info[Différence entre un domaine de production et un domaine de développement]

Le **domaine de production** est l'URL publique de votre site web, celle à laquelle vos utilisateurs finaux accèdent.

- **Exemple** : [https://sakuralab.ch](https://sakuralab.ch)
- **Utilisation** : C'est le domaine où le site est mis en ligne et accessible au public.

Le **domaine de développement** est une version temporaire utilisée pour tester ou développer votre site. Il permet de prévisualiser les changements avant leur mise en production.

- **Exemple** : [https://sakuralab.businessbooster.agency](https://sakuralab.businessbooster.agency)
- **Utilisation** : Développement et test des nouvelles fonctionnalités, ainsi que vérification de l'intégration des nouvelles versions du site.

Dans ce cas, nous souhaitons migrer le site qui se trouve actuellement sur le domaine de développement [https://sakuralab.businessbooster.agency](https://sakuralab.businessbooster.agency) vers le nouveau domaine [https://sakuralab.ch](https://sakuralab.ch).

Pour cela, il est nécessaire de disposer d'un hébergement et d'un domaine pour la mise en production.

:::

## 1. Étapes pour commander un nouvel hébergement sur Infomaniak

1. **Se connecter à votre compte Infomaniak**

   Rendez-vous sur le site [Infomaniak](https://www.infomaniak.com/) et connectez-vous à votre compte.

2. **Accéder à la gestion des hébergements**

   Une fois connecté, dans le menu principal, cliquez sur **Hébergement**, puis sélectionnez **Commander un hébergement**.

3. **Choisir le type d'hébergement**

   Infomaniak propose différents types d’hébergement (Hébergement Web, Hébergement Cloud, etc.). Sélectionnez l'option la plus adaptée à vos besoins. Pour un site classique, un **hébergement Web** suffit généralement.

   **Exemple** : Si vous souhaitez héberger un site web professionnel avec une bande passante élevée et des options de sécurité avancées, optez pour un plan comme **Hébergement Web Pro**.

4. **Sélectionner un domaine ou en acheter un**

   Vous serez invité à choisir un domaine pour votre hébergement. Si vous n'avez pas encore de domaine, vous pouvez en acheter un directement sur Infomaniak.

   **Exemple** : Si vous possédez déjà un domaine, vous pouvez le lier à votre nouvel hébergement. Sinon, vous pouvez en acheter un, comme `sakuralab.ch`.

5. **Configurer les options de l'hébergement**

   Après avoir sélectionné votre plan d'hébergement, configurez les options supplémentaires (sauvegardes, sécurité SSL, etc.). Il est important de choisir un certificat SSL pour sécuriser votre site, en particulier pour les sites en production.

6. **Finaliser la commande et effectuer le paiement**

   Une fois toutes les options sélectionnées, passez à la validation et au paiement de votre commande. Vous recevrez ensuite les informations nécessaires pour accéder à votre hébergement.

## 2. Creer un site wordpress avec l'admin d'infomaniak
 > ajouter texte et captures d'écrant ici

## 3. Déploiement du site sur le nouveau hébergement
Une fois l’hébergement configuré et le nouveau site worppress installer, vous pouvez migrer votre site web en utilisant l'outil FTP d'Infomaniak.
