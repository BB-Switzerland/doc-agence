---
sidebar_position: 2
title: Configurateur de script
description: Génère le script head, la balise pont et les exceptions CSP Infomaniak
---

import InfomaniakTrackingConfigurator from '@site/src/components/InfomaniakTrackingConfigurator';

# Configurateur de script

Cet outil génère tout ce qu'il faut pour tracker une billetterie Infomaniak :

1. le code à coller dans **Développeur** > **Code HTML placé dans le head** ;
2. le script de la balise GTM **« Billetterie - Pont ike_* vers dataLayer »** ;
3. la liste des **exceptions CSP** à ajouter pour Meta.

:::tip Comment l'utiliser
1. Garde le mode **Via GTM (recommandé)**
2. Renseigne l'ID du conteneur GTM
3. Coche **Meta Pixel** si le client a un pixel, pour afficher les exceptions CSP
4. Copie chaque bloc à l'endroit indiqué
:::

<InfomaniakTrackingConfigurator />

---

## Notes

- En mode **GTM**, le head ne contient **que** GTM. GA4, Meta et le consentement se configurent dans GTM : voir la [page principale](./#5-éléments-gtm-à-créer).
- Le mode **Scripts directs** existe pour les cas sans GTM. Il ne gère **pas le consentement** : à éviter pour les clients soumis au RGPD ou à la nLPD.
- Ne mélange jamais les deux modes : un `gtag` ou un `fbq` dans le head en plus de GTM crée des doublons.
- Après les tests (Aperçu GTM et Évènements de test Meta), pense à **publier** le conteneur GTM.

## Où trouver les ID

- **GTM** : voir [Pour retrouver l'id du conteneur GTM](./#id-gtm)
- **GA4** : voir [Pour retrouver l'id de mesure GA4](./#id-ga4)
- **Meta Pixel** : voir [Pour retrouver l'id de l'ensemble de données Meta](./#id-fb-pixel)