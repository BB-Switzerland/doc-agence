# Site Web

Ce site web est construit en utilisant [Docusaurus](https://docusaurus.io/), un générateur de site web statique moderne.

## Installation

```
$ npm install
```

### Développement local

```
$ npm run start
```


Cette commande démarre un serveur de développement local et ouvre une fenêtre de navigateur. La plupart des changements sont reflétés en direct sans avoir à redémarrer le serveur.

## Build

```
$ npm run build
```

Cette commande génère du contenu statique dans le répertoire `build` et peut être servi en utilisant n'importe quel service d'hébergement de contenu statique.


## Déploiement automatique sur Vercel

Toute mise à jour sur la branche `main` déclenche automatiquement le déploiement sur [Vercel](https://vercel.com) pour le site accessible à l'adresse : `docs.agence-bb.ch`.  

````
$ git add .
$ git commit -m "message"
$ git push origin main
````