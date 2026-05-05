---
sidebar_position: 2
title: Configurateur de script
description: Génère ton script head Infomaniak en quelques clics
---

import InfomaniakTrackingConfigurator from '@site/src/components/InfomaniakTrackingConfigurator';

# Configurateur de script head

Cet outil génère le code à coller dans **Options Développeur** de la billetterie Infomaniak en fonction des trackers que tu actives et des ID que tu renseignes.

:::tip Comment l'utiliser
1. Coche les trackers à inclure (GTM, GA4, Meta Pixel, évènements Infomaniak)
2. Renseigne les ID correspondants
3. Sélectionne les évènements `ike_` à pousser vers GA4
4. Clique sur **Copier** et colle le résultat dans Infomaniak
:::

<InfomaniakTrackingConfigurator />

---

## Notes

- Les évènements Infomaniak (`ike_`) reposent sur `gtag()` et nécessitent **un ID GA4** (soit via la case GA4, soit en saisissant uniquement l'ID dans le bloc GA4 si tu ne veux pas charger le snippet complet).
- Si tu gères GA4 et Meta via **GTM**, désactive les snippets directs et configure les balises côté GTM — c'est plus simple à maintenir et à brancher au consentement.
- Pense à **publier** le conteneur GTM après tests (Aperçu GTM, DebugView GA4, Meta Pixel Helper).

## Où trouver les ID

- **GTM** : voir [Pour retrouver l'id du conteneur GTM](./#id-gtm)
- **GA4** : voir [Pour retrouver l'id de mesure GA4](./#id-ga4)
- **Meta Pixel** : voir [Pour retrouver l'id de l'ensemble de données Meta](./#id-fb-pixel)
