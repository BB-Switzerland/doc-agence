/**
 * Script pour masquer dynamiquement la section Tracking dans la sidebar
 * en fonction du rôle de l'utilisateur (stocké dans le cookie bb_role)
 */

(function() {
  // Dernier état appliqué. Le MutationObserver plus bas se déclenche à chaque
  // rendu React : sans ce garde, on referait le travail (et on spammerait la
  // console) des dizaines de fois par navigation.
  let applied = null;

  function updateTrackingVisibility() {
    const body = document.body;
    if (!body) return;

    // Lire le cookie bb_role
    const cookies = document.cookie.split(';').reduce((acc, cookie) => {
      const [key, value] = cookie.trim().split('=');
      acc[key] = decodeURIComponent(value || '');
      return acc;
    }, {});

    const role = cookies.bb_role || '';
    const isAuthenticated = cookies.bb_auth === '1';

    // Seuls les admins et collaborateurs peuvent voir le tracking
    const privilegedRoles = ['admin', 'collaborateur'];
    const hasTrackingAccess = isAuthenticated && privilegedRoles.includes(role);

    // On réapplique si le rôle a changé, mais aussi si les classes ont disparu :
    // l'hydratation React réécrit l'attribut `class` du body et les efface.
    const state = hasTrackingAccess ? 'has' : 'no';
    if (state === applied && body.classList.contains(state + '-privileged-access')) {
      return;
    }
    applied = state;

    // Ajouter ou retirer la classe sur le body
    // no-privileged-access masque aussi les entrées de menu Digital & Web
    // et Monday 2.0, réservées aux mêmes rôles (voir src/css/custom.css).
    if (hasTrackingAccess) {
      body.classList.add('has-tracking-access', 'has-privileged-access');
      body.classList.remove('no-tracking-access', 'no-privileged-access');
    } else {
      body.classList.add('no-tracking-access', 'no-privileged-access');
      body.classList.remove('has-tracking-access', 'has-privileged-access');
    }

    console.log('[tracking-visibility]', { role, isAuthenticated, hasTrackingAccess });
  }

  function start() {
    updateTrackingVisibility();

    // Observer les mutations du DOM pour réagir aux changements de sidebar,
    // et pour reposer les classes que l'hydratation React vient d'effacer.
    const observer = new MutationObserver(updateTrackingVisibility);
    observer.observe(document.body, { childList: true, subtree: true });
  }

  // Ce script est injecté dans le <head> (voir `scripts` dans
  // docusaurus.config.js) : il s'exécute pendant le parsing, alors que
  // `document.body` n'existe pas encore. Tout doit attendre le DOM.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }

  // Écouter les changements d'authentification
  window.addEventListener('bb:authchange', updateTrackingVisibility);

  // Écouter les changements de route (SPA)
  window.addEventListener('bb:routechange', updateTrackingVisibility);
})();
