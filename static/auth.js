// ------------------------------
// Auth sans backend pour Docusaurus (Firebase + Google + Firestore Roles)
// ------------------------------

const LOG_PREFIX = "[auth]";
function log(...args) {
  try {
    console.log(LOG_PREFIX, ...args);
  } catch (_) {}
}

// ------------------------------
// Config des routes protégées
// ------------------------------
// Chemins réservés aux rôles privilégiés (admin, collaborateur).
// Les stagiaires et les comptes en attente y sont refusés.
const privatePaths = [
  "/digital",   // toute la section Digital & Web, tracking compris
  "/monday",    // toute la doc Monday 2.0
];
function isPrivatePath(pathname) {
  return privatePaths.some((p) => pathname.startsWith(p));
}

// Chemins qui exigent seulement d'être connecté : le rôle n'entre pas en jeu.
// Nécessaire car Docusaurus est une SPA : une navigation interne ne déclenche
// aucune requête serveur, donc middleware.js ne s'exécute pas.
// À garder cohérent avec PRIVATE_PREFIXES dans middleware.js.
const loginRequiredPaths = [
  "/onboarding",
];
function isLoginRequiredPath(pathname) {
  return loginRequiredPaths.some((p) => pathname.startsWith(p));
}

// ------------------------------
// Restriction de domaine (optionnelle)
// ------------------------------
const allowedDomains = ["@agence-bb.ch"];
function isAllowedDomain(user) {
  if (!user || !user.email) return false;
  if (!allowedDomains.length) return true;
  return allowedDomains.some((suffix) => user.email.endsWith(suffix));
}



(async () => {
  const dynamicImport = (url) => new Function("u", "return import(u)")(url);

  const { initializeApp } = await dynamicImport(
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js"
  );
  const {
    getAuth,
    onAuthStateChanged,
    onIdTokenChanged,
    GoogleAuthProvider,
    signOut,
  } = await dynamicImport(
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js"
  );
  const { getFirestore, doc, getDoc, setDoc } = await dynamicImport(
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-firestore.js"
  );

  log("Firebase SDKs loaded (dynamic)");

  // ------------------------------
  // Config Firebase
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
  // Init Firebase
  // ------------------------------
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  const provider = new GoogleAuthProvider();
  provider.setCustomParameters({
    prompt: "select_account",
    hd: "agence-bb.ch",
  });

  // ------------------------------
  // Gestion navigation SPA (Docusaurus)
  // ------------------------------
  function onRouteChange(cb) {
    const handler = () => cb(window.location.pathname);
    window.addEventListener("popstate", handler);
    const origPush = history.pushState;
    const origReplace = history.replaceState;
    history.pushState = function () {
      const ret = origPush.apply(this, arguments);
      window.dispatchEvent(new Event("bb:routechange"));
      return ret;
    };
    history.replaceState = function () {
      const ret = origReplace.apply(this, arguments);
      window.dispatchEvent(new Event("bb:routechange"));
      return ret;
    };
    window.addEventListener("bb:routechange", handler);
  }

  // Dépose le jeton Firebase dans un cookie. C'est lui que le serveur vérifie.
  async function setTokenCookie(user) {
    try {
      const token = await user.getIdToken();
      // Le jeton vit 1h ; onIdTokenChanged le renouvelle et rafraîchit le cookie.
      document.cookie = `bb_token=${token}; Path=/; Max-Age=3600; SameSite=Lax`;
      return true;
    } catch (e) {
      console.error("[auth] setTokenCookie failed", e);
      return false;
    }
  }

  async function redirectToLogin() {
    try {
      const returnUrl = `${window.location.pathname}${window.location.search}${window.location.hash}`;
      sessionStorage.setItem("returnUrl", returnUrl);
    } catch (_) {}
    window.location.assign("/login");
  }

  // ------------------------------
  // Lecture / création du rôle Firestore
  // ------------------------------
  async function getOrCreateUserRole(email) {
    try {
      const userRef = doc(db, "roles", email);
      const snap = await getDoc(userRef);
      if (snap.exists()) {
        const role = snap.data().role;
        log("role from Firestore:", role);
        return role;
      }
      await setDoc(userRef, {
        role: "pending",
        createdAt: new Date().toISOString(),
      });
      log("New user added to Firestore with role=pending");
      return "pending";
    } catch (err) {
      console.error("[auth] getOrCreateUserRole error:", err);
      return null;
    }
  }

  // ------------------------------
  // Contrôle d’accès complet
  // ------------------------------
  async function checkAndHandleAccess(pathname) {
    log("checkAndHandleAccess:", pathname);

    const user = auth.currentUser;

    // 🧩 Correction : afficher le body si non connecté sur page publique ou login
    if (!user) {
      if (pathname === "/login") return;
      if (!isPrivatePath(pathname) && !isLoginRequiredPath(pathname)) {
        return;
      }
      await redirectToLogin();
      return;
    }

    // Vérifie le domaine
    const domainOK = isAllowedDomain(user);
    if (!domainOK) {
      alert("Accès réservé au domaine agence-bb.ch");
      await signOut(auth);
      return;
    }

    const role = await getOrCreateUserRole(user.email);
    if (!role) {
      window.location.assign("/access-denied");
      return;
    }

    // ------------------------------
    // Permissions par rôle
    // ------------------------------
    const privilegedRoles = ["admin", "collaborateur"];
    const limitedRoles = ["stagiaire", "pending"];

    let allowed = false;

    // Admins & collaborateurs → accès complet aux privatePaths
    if (privilegedRoles.includes(role)) {
      allowed = true;
    }

    // Stagiaires & pending → accès à tout sauf privatePaths
    if (limitedRoles.includes(role)) {
      allowed = !isPrivatePath(pathname);
    }

    // Connexion suffisante : sur ces chemins le rôle n'est pas pris en compte,
    // n'importe quel compte @agence-bb.ch passe. La condition sur isPrivatePath
    // garantit qu'ajouter "/digital" ici n'ouvrirait jamais /digital/tracking.
    if (isLoginRequiredPath(pathname) && !isPrivatePath(pathname)) {
      allowed = true;
    }

    if (!allowed) {
      log(`Access denied for ${user.email} (${role})`);
      window.location.assign("/access-denied");
      return;
    }

    // ------------------------------
    // Cookie session
    // ------------------------------
    // bb_token est le seul cookie qui fait autorité : middleware.js en vérifie
    // la signature Google. bb_auth et bb_role ne servent qu'à l'affichage.
    await setTokenCookie(user);
    try {
      const maxAge = 60 * 60 * 8; // 8h
      document.cookie = `bb_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      document.cookie = `bb_email=${encodeURIComponent(
        user.email
      )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      document.cookie = `bb_role=${encodeURIComponent(
        role
      )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    } catch (_) {}

    log("✅ Access granted:", user.email, "role:", role);

    // Émettre un événement pour notifier les composants React
    window.dispatchEvent(new CustomEvent('bb:authchange', { detail: { role, email: user.email } }));
  }

  // ------------------------------
  // Suivi des connexions
  // ------------------------------
  onAuthStateChanged(auth, async (user) => {
    const path = window.location.pathname;
    log("Auth state changed:", user ? user.email : "none");
    await checkAndHandleAccess(path);
  });

  // Firebase renouvelle le jeton toutes les heures : on garde le cookie à jour.
  onIdTokenChanged(auth, async (user) => {
    if (user) await setTokenCookie(user);
  });

  onRouteChange((path) => {
    log("Route change:", path);
    checkAndHandleAccess(path);
  });

  // ------------------------------
  // Déconnexion globale
  // ------------------------------
  window.logout = () => {
    log("logout() called");
    try {
      document.cookie = "bb_token=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "bb_auth=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "bb_email=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "bb_role=; Path=/; Max-Age=0; SameSite=Lax";
    } catch (_) {}
    return signOut(auth);
  };
})();
