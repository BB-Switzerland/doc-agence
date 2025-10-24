---
sidebar_position: 4
---

# Intégration du conteneur serveur

Après avoir intégré l'API de Conversions sur votre conteneur serveur, il est temps de changer l'URL du conteneur serveur dans Google Tag Manager.

Cela permettra de déclencher les évènements personnalisés de Google Analytics côté serveur, et ainsi passer outre le blocage des cookies tiers.

## Changer l'URL du conteneur serveur

### Configuration des paramètres

Pour changer l'URL du conteneur serveur, rendez-vous dans les paramètres du conteneur.

- ***Admin*** > ***Paramètres du conteneur***
- Changer ***l'URL du conteneur serveur***

### Mise à jour du conteneur web

Dès que l'URL est changée, vous pouvez ensuite changer l'URL du conteneur web.

### Code d'intégration

```html
<!-- Google Tag Manager -->
<script>
  (function (w, d, s, l, i) {
    w[l] = w[l] || [];
    w[l].push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
    var f = d.getElementsByTagName(s)[0],
      j = d.createElement(s),
      dl = l != "dataLayer" ? "&l=" + l : "";
    j.async = true;
    j.src = "https://measmeasure.domain.com/gtm.js?id=" + i + dl;
    f.parentNode.insertBefore(j, f);
  })(window, document, "script", "dataLayer", "GTM-XXXXXXXX");
</script>
<!-- End Google Tag Manager -->
```

```html
<!-- Google Tag Manager (noscript) -->
<noscript><iframe src="https://measmeasure.domain.com/ns.html?id=GTM-XXXXXXXX"
height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<!-- End Google Tag Manager (noscript) -->
```

## Publication des modifications

:::warning
Pensez à bien publier les changement du conteneur serveur pour que le conteneur web puisse encore fonctionner.
:::