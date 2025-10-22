// ------------------------------
// Auth sans backend pour Docusaurus (Firebase + Google)
// - Compatible même si le script n'est PAS chargé en type="module"
// - Utilise des imports dynamiques pour éviter l'erreur
//   "Cannot use import statement outside a module"
// ------------------------------

// Petit helper de log
const LOG_PREFIX = "[auth]";
function log(...args) {
  try {
    console.log(LOG_PREFIX, ...args);
  } catch (_) {}
}
log(
  "script loaded",
  typeof window !== "undefined" ? window.location.pathname : "(no-window)"
);

// ------------------------------
// Liste des routes protégées
// Adapter selon ta config Docusaurus actuelle:
// - /onboarding => toute la doc d'onboarding
// - /digital => toute la doc Digital & Web
// - /rh/interne => une sous-section précise
// ------------------------------
const privatePaths = [
  // Exemple: protège toute la doc Onboarding
  // "/onboarding",
  // Exemple: protège uniquement les pages sous /rh/interne
  // "/rh/interne",
  "/digital",
  "/onboarding",
];

function isPrivatePath(pathname) {
  return privatePaths.some((p) => pathname.startsWith(p));
}

// ------------------------------
// Restriction (optionnelle) à un ou plusieurs domaines Workspace
// Limite aux emails du domaine agence-bb.ch
const allowedDomains = ["@agence-bb.ch"];

function isAllowedDomain(user) {
  if (!user || !user.email) return false;
  if (!allowedDomains.length) return true; // Pas de restriction => OK
  return allowedDomains.some((suffix) => user.email.endsWith(suffix));
}

// ------------------------------
// Petit util: afficher le contenu
// ------------------------------
function showBody() {
  try {
    document.body.style.display = "block";
    log("showBody: display set to block");
  } catch (_) {
    // no-op
  }
}

// Au chargement: si la page n'est pas privée, on montre directement le contenu
if (typeof window !== "undefined" && !isPrivatePath(window.location.pathname)) {
  showBody();
}

(async () => {
  // ------------------------------
  // Imports dynamiques (fonctionnent en script classique)
  // ------------------------------
  // Charge dynamiquement les SDKs Firebase à l'exécution dans le navigateur.
  // On utilise `new Function('u', 'return import(u)')(url)` pour éviter que
  // Webpack (exécuté lors du build) tente de résoudre les URLs `https:`.
  const dynamicImport = (url) => new Function('u', 'return import(u)')(url);
  const { initializeApp } = await dynamicImport('https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js');
  const {
    getAuth,
    onAuthStateChanged,
    signInWithPopup,
    GoogleAuthProvider,
    signOut,
  } = await dynamicImport('https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js');
  log('Firebase SDKs loaded (dynamic)');

  // ------------------------------
  // Config Firebase (la tienne)
  // ------------------------------
  const firebaseConfig = {
    apiKey: "AIzaSyCOI4zCnBxJ00okt2xBvJhwfZeu4ULAy8s",
    authDomain: "bbs-doc.firebaseapp.com",
    projectId: "bbs-doc",
    storageBucket: "bbs-doc.firebasestorage.app",
    messagingSenderId: "202877079803",
    appId: "1:202877079803:web:bfa7530a95490c11a8605e",
  };

  // ------------------------------
  // Init Firebase + Auth
  // ------------------------------
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();
  // Améliore l'expérience et oriente vers ton domaine (indicatif, non bloquant côté Google)
  try {
    provider.setCustomParameters({
      prompt: "select_account",
      hd: "agence-bb.ch",
    });
    log("provider custom params set", { hd: "agence-bb.ch" });
  } catch (_) {}
  log("Firebase initialized");

  // ------------------------------
  // Gestion navigation SPA (Docusaurus/React)
  // - Détecte les changements de route (pushState/replaceState/popstate)
  // - Empêche l'affichage des pages privées si non connecté
  // ------------------------------
  function onRouteChange(cb) {
    const handler = () => cb(window.location.pathname);
    window.addEventListener("popstate", handler);
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function () {
      log("history.pushState called", arguments);
      const ret = origPush.apply(this, arguments);
      window.dispatchEvent(new Event("bb:routechange"));
      return ret;
    };
    history.replaceState = function () {
      log("history.replaceState called", arguments);
      const ret = origReplace.apply(this, arguments);
      window.dispatchEvent(new Event("bb:routechange"));
      return ret;
    };
    window.addEventListener("bb:routechange", handler);
    log("SPA route change listeners attached");
  }

  async function redirectToLogin() {
    try {
      const returnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      sessionStorage.setItem("returnUrl", returnUrl);
      log("redirectToLogin: saved returnUrl", returnUrl);
    } catch (_) {}
    log("redirectToLogin: navigating to /login");
    window.location.assign("/login");
  }

  function hideBody() {
    try {
      document.body.style.display = "none";
      log("hideBody: display set to none");
    } catch (_) {}
  }

  async function checkAndHandleAccess(pathname) {
    log("checkAndHandleAccess: start", pathname);
    if (!isPrivatePath(pathname)) {
      // Page publique
      log("checkAndHandleAccess: public route");
      showBody();
      return;
    }

    // Page privée: masquer vite le contenu le temps du check
    hideBody();
    const user = auth.currentUser;
    log(
      "checkAndHandleAccess: private route, currentUser =",
      user ? user.email : null
    );
    if (!user) {
      log("checkAndHandleAccess: no user, checking if on /login");
      // Si déjà sur /login, ne pas boucler
      if (window.location.pathname === "/login") {
        log("Déjà sur /login, attente login...");
        return;
      }
      await redirectToLogin();
      return;
    }

    // Liste blanche des utilisateurs autorisés
    const allowedUsers = [
      "charles@agence-bb.ch",
      "pierre@agence-bb.ch",
      "sylvain@agence-bb.ch",
      "mael@agence-bb.ch",
      "amancioluis@agence-bb.ch",
      "estefania@agence-bb.ch",
      "nicole@agence-bb.ch",
      "emmanuel@agence-bb.ch",
      "carlos@agence-bb.ch",
      "e.doffou@agence-bb.ch",
      "steven@agence-bb.ch",
      "bruno@agence-bb.ch",
      "lisannys@agence-bb.ch",
      "dany@agence-bb.ch",
      "doriane@agence-bb.ch",
      "martin@agence-bb.ch",
    ];

    if (!allowedUsers.includes(user.email)) {
      log(
        "checkAndHandleAccess: user not in whitelist, redirecting to /access-denied"
      );
      if (window.location.pathname !== "/access-denied") {
        window.location.assign("/access-denied");
      }
      return;
    }
    const domainOK = isAllowedDomain(user);
    log("checkAndHandleAccess: domain check", {
      email: user.email,
      domainOK,
      allowedDomains,
    });
    if (!domainOK) {
      alert(
        allowedDomains.length
          ? `Accès réservé aux membres des domaines: ${allowedDomains.join(
              ", "
            )}`
          : "Accès refusé"
      );
      await signOut(auth);
      return;
    }
    // Marque une session simple via cookie (pour middleware/edge)
    try {
      const maxAge = 60 * 60 * 8; // 8h
      document.cookie = `bb_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      document.cookie = `bb_email=${encodeURIComponent(
        user.email
      )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      log("cookie set: bb_auth=1, bb_email");
    } catch (_) {}
    log("checkAndHandleAccess: access granted, showing body");
    showBody();
  }

  // ------------------------------
  // Écoute l’état de connexion
  // ------------------------------
  onAuthStateChanged(auth, async (user) => {
    const pathname = window.location.pathname;
    // Réévalue l'accès sur changement d'état de session
    log("onAuthStateChanged:", user ? user.email : null);
    if (user) {
      const domainOK = isAllowedDomain(user);
      if (domainOK) {
        try {
          const maxAge = 60 * 60 * 8; // 8h
          document.cookie = `bb_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
          document.cookie = `bb_email=${encodeURIComponent(
            user.email
          )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
          log("cookie set (onAuthStateChanged): bb_auth=1, bb_email");
        } catch (_) {}
      }
    }
    await checkAndHandleAccess(pathname);
    if (user) {
      log("✅ Connecté :", user.email);
    }
  });

  // Ecoute les changements de route SPA et réévalue l'accès
  onRouteChange((pathname) => {
    log("route change detected:", pathname);
    checkAndHandleAccess(pathname);
  });

  // ------------------------------
  // Optionnel : bouton de déconnexion global
  // ------------------------------
  window.logout = () => {
    log("logout() called");
    try {
      // Invalide les cookies
      document.cookie = "bb_auth=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "bb_email=; Path=/; Max-Age=0; SameSite=Lax";
      log("cookies cleared");
    } catch (_) {}
    return signOut(auth);
  };
})();
