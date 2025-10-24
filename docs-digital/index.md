---
sidebar_position: 1
title: Introduction
description: Présentation de la documentation interne de l'agence
---

# Documentation Digitale

Bienvenue dans la documentation digitale. Cette section fournit toutes les informations nécessaires pour configurer, gérer et utiliser nos outils numériques. Que vous soyez un développeur, un administrateur ou un utilisateur final, vous trouverez ici des guides détaillés pour vous aider à tirer le meilleur parti des technologies numériques que nous proposons.

## Introduction

La section **Digital & Web** est dédiée à la gestion des outils de suivi, des campagnes, ainsi qu'à la migration et la gestion de sites web. Vous trouverez dans cette documentation des informations sur la mise en place des outils de tracking, la gestion des campagnes meta, ainsi que des instructions pour la migration de sites WordPress.

## Suivi et Tracking

Le suivi est une partie essentielle de la gestion des sites web et des applications. Cette section couvre l'intégration des outils de suivi comme **Google Tag Manager (GTM)**, **Meta Pixel** et les configurations spécifiques du **server container** pour des déploiements plus avancés.

### Étapes de configuration

1. **[Get Started](tracking/intro.md)**  
   Introduction générale au suivi et au tracking sur votre site.

2. **[Configuration Pixel Meta](tracking/configuration-meta/create-pixel.md)**  
   Créez et configurez votre **Pixel Meta** pour suivre les actions des utilisateurs.

   - **[Création du Pixel Meta](tracking/configuration-meta/create-pixel.md)**  
     Créez un Pixel Meta pour suivre les interactions avec votre site.
   - **[Intégration site web](tracking/configuration-meta/implement-pixel.md)**  
     Apprenez à intégrer le Pixel Meta sur votre site web.

3. **[Configuration du compte GTM](tracking/configuration-gtm/create-container.md)**  
   Créez et configurez votre compte **Google Tag Manager** (GTM) pour gérer facilement vos tags.

   - **[Création du compte Google Tag Manager](tracking/configuration-gtm/create-container.md)**  
     Démarrez avec la création de votre compte GTM.
   - **[Création de déclencheurs](tracking/configuration-gtm/create-trigger.md)**  
     Configurez des déclencheurs pour activer des balises en fonction des actions des utilisateurs.
   - **[Création d'un événement personnalisé avec GTM pour Google Ads (GADS)](tracking/configuration-gtm/create-tag.md)**  
     Configurez un événement personnalisé pour Google Ads via GTM.
   - **[Ajouter des modèles](tracking/configuration-gtm/models.md)**  
     Ajoutez des modèles pour faciliter l'intégration avec des outils externes.
   - **[Intégration de Google Analytics](tracking/configuration-gtm/integrate-analytics.md)**  
     Apprenez à intégrer Google Analytics avec GTM pour suivre le trafic de votre site.

4. **[Meta](tracking/gtm-x-meta/gtm-meta.md)**  
   Configurez GTM pour Meta et suivez les interactions via Pixel Meta.

   - **[Création d'un événement personnalisé Meta](tracking/gtm-x-meta/gtm-meta.md)**  
     Créez un événement personnalisé pour suivre des actions spécifiques sur Meta.

5. **[Conteneur serveur](tracking/server-container/server-deployment.md)**  
   Cette section concerne l'utilisation d'un **conteneur serveur** pour déployer des balises plus efficacement.

   - **[Création du conteneur serveur](tracking/server-container/server-container.md)**  
     Créez un conteneur serveur pour gérer les balises côté serveur.
   - **[Configuration du conteneur serveur avec Stape](tracking/server-container/stape.md)**  
     Configurez votre conteneur serveur avec **Stape**.
   - **[Installation de l'API de Conversions sur le conteneur serveur](tracking/server-container/api-conversions.md)**  
     Installez l'API de conversions pour collecter des données sur les actions des utilisateurs.
   - **[Intégration du conteneur serveur](tracking/server-container/server-deployment.md)**  
     Intégrez le conteneur serveur à votre infrastructure existante.

## Campagnes

La gestion des campagnes est essentielle pour suivre l'impact de vos efforts marketing. Cette section fournit des guides pour la création et la gestion des campagnes au sein de vos plateformes numériques.

- **[Création de Campagnes](campagne/index.md)**

## Migration WordPress

La migration d'un site WordPress se fait en plusieurs étapes clés. Suivez ce guide pour migrer votre site en toute sécurité.

### Étapes de la migration

1. **[Créer une sauvegarde](migration-wordpress/save-bdd.md)**  
   Avant de commencer, effectuez une sauvegarde complète de votre site WordPress (fichiers + base de données).

2. **[Créer une archive](migration-wordpress/create-archive.md)**  
   Créez une archive de votre site WordPress pour faciliter la migration.

3. **[Installation et migration](migration-wordpress/migration-install.md)**  
   Installez et migrez votre site WordPress vers le nouveau serveur.

4. **[Nouveau domaine](migration-wordpress/new-domain.md)**  
   Configurez le nouveau domaine pour votre site migré.

5. **[Informations de la base de données](migration-wordpress/bdd-infos.md)**  
   Gérez les informations de connexion à la base de données.

 
## Site Web

Cette section couvre les principales actions liées à la gestion du site web de l'agence, y compris la création d'article de blog, l'ajout de galeries photos dans **BB Studios**, la gestion des **BB Life**, ainsi que la publication de projets clients dans **Use Case**.

- **[Introduction](site-web/index.md)**
- **[Connexion au site BBS](site-web/connexion.md)**
- **[BB Life](site-web/bb-life/add-bb-life.md)**
- **[Use Case](site-web/use-case/add-use-case.md)**
- **[Ajout d'un article de blog BBS](site-web/bb-blog/add-blog.md)**
- **[Ajout de galeries](site-web/galeries-bb-studios/add-gallery.md)**


