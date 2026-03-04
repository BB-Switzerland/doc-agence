/**
 * Script pour masquer dynamiquement la section Tracking dans la sidebar
 * en fonction du rôle de l'utilisateur (stocké dans le cookie bb_role)
 */

(function() {
  function updateTrackingVisibility() {
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

    // Ajouter ou retirer la classe sur le body
    if (hasTrackingAccess) {
      document.body.classList.add('has-tracking-access');
      document.body.classList.remove('no-tracking-access');
    } else {
      document.body.classList.add('no-tracking-access');
      document.body.classList.remove('has-tracking-access');
    }

    console.log('[tracking-visibility]', { role, isAuthenticated, hasTrackingAccess });
  }

  // Mise à jour initiale
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateTrackingVisibility);
  } else {
    updateTrackingVisibility();
  }

  // Écouter les changements d'authentification
  window.addEventListener('bb:authchange', updateTrackingVisibility);

  // Écouter les changements de route (SPA)
  window.addEventListener('bb:routechange', updateTrackingVisibility);

  // Observer les mutations du DOM pour réagir aux changements de sidebar
  const observer = new MutationObserver(updateTrackingVisibility);
  observer.observe(document.body, { childList: true, subtree: true });
})();
