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

1. **[Get Started](Tracking/intro.md)**  
   Introduction générale au suivi et au tracking sur votre site.

2. **[Configuration Pixel Meta](Tracking/configuration-meta/create-pixel.md)**  
   Créez et configurez votre **Pixel Meta** pour suivre les actions des utilisateurs.

   - **[Création du Pixel Meta](Tracking/configuration-meta/create-pixel.md)**  
     Créez un Pixel Meta pour suivre les interactions avec votre site.
   - **[Intégration site web](Tracking/configuration-meta/implement-pixel.md)**  
     Apprenez à intégrer le Pixel Meta sur votre site web.

3. **[Configuration du compte GTM](Tracking/configuration-gtm/create-container.md)**  
   Créez et configurez votre compte **Google Tag Manager** (GTM) pour gérer facilement vos tags.

   - **[Création du compte Google Tag Manager](Tracking/configuration-gtm/create-container.md)**  
     Démarrez avec la création de votre compte GTM.
   - **[Création de déclencheurs](Tracking/configuration-gtm/create-trigger.md)**  
     Configurez des déclencheurs pour activer des balises en fonction des actions des utilisateurs.
   - **[Création d'un événement personnalisé avec GTM pour Google Ads (GADS)](Tracking/configuration-gtm/create-tag.md)**  
     Configurez un événement personnalisé pour Google Ads via GTM.
   - **[Ajouter des modèles](Tracking/configuration-gtm/models.md)**  
     Ajoutez des modèles pour faciliter l'intégration avec des outils externes.
   - **[Intégration de Google Analytics](Tracking/configuration-gtm/integrate-analytics.md)**  
     Apprenez à intégrer Google Analytics avec GTM pour suivre le trafic de votre site.

4. **[Meta](Tracking/gtm-x-meta/gtm-meta.md)**  
   Configurez GTM pour Meta et suivez les interactions via Pixel Meta.

   - **[Création d'un événement personnalisé Meta](Tracking/gtm-x-meta/gtm-meta.md)**  
     Créez un événement personnalisé pour suivre des actions spécifiques sur Meta.

5. **[Conteneur serveur](Tracking/server-container/server-deployment.md)**  
   Cette section concerne l'utilisation d'un **conteneur serveur** pour déployer des balises plus efficacement.

   - **[Création du conteneur serveur](Tracking/server-container/server-container.md)**  
     Créez un conteneur serveur pour gérer les balises côté serveur.
   - **[Configuration du conteneur sur Google Cloud Platform](Tracking/server-container/cloud-platform.md)**  
     Configurez votre conteneur serveur sur **Google Cloud Platform**.
   - **[Installation de l'API de Conversions sur le conteneur serveur](Tracking/server-container/api-conversions.md)**  
     Installez l'API de conversions pour collecter des données sur les actions des utilisateurs.
   - **[Intégration du conteneur serveur](Tracking/server-container/server-deployment.md)**  
     Intégrez le conteneur serveur à votre infrastructure existante.

## Campagnes

La gestion des campagnes est essentielle pour suivre l'impact de vos efforts marketing. Cette section fournit des guides pour la création et la gestion des campagnes au sein de vos plateformes numériques.

- **[Création de Campagnes](campagne/index.md)**

## Migration WordPress

La migration d'un site WordPress se fait en plusieurs étapes clés. Suivez ce guide pour migrer votre site en toute sécurité.

### Étapes de la migration

1. **[Créer une sauvegarde](migration-wordpress/save-bdd.md)**  
   Avant de commencer, effectuez une sauvegarde complète de votre site WordPress (fichiers + base de données).

2. **[Copier les informations de la BDD](migration-wordpress/save-bdd.md)**  
   Exportez la base de données WordPress pour conserver toutes vos données.

3. **[Création du paquet de migration](migration-wordpress/duplicator-create-package.md)**  
   Utilisez **Duplicator** pour créer un paquet qui contient à la fois les fichiers du site et la base de données.

4. **[Créer un nouveau site](migration-wordpress/new-site-setup.md)**  
   Installez une nouvelle instance de WordPress sur votre serveur de destination.

5. **[Migration](migration-wordpress/duplicator-migration.md)**  
   Enfin, restaurez le paquet de migration sur le nouveau site pour transférer toutes les données et fichiers.

 
## Site Web

Cette section couvre les principales actions liées à la gestion du site web de l'agence, y compris la création d'article de blog, l'ajout de galeries photos dans **BB Studios**, la gestion des **BB Life**, ainsi que la publication de projets clients dans **Use Case**.

- **[Introduction](site-web/intro.md)**
- **[Connexion au site BBS](site-web/connexion.md)**
- **[BB Life](site-web/bb-life.md)**
- **[Use Case](site-web/use-case.md)**
- **[Ajout d'un article de blog BBS](site-web/bb-blog/add-blog.md)**
- **[Ajout de galeries](site-web/galeries-bb-studios/add-gallery.md)**


