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
const privatePaths = [
  "/digital/category/-tracking",
  "/digital/Tracking/",
  "/onboarding",
];
function isPrivatePath(pathname) {
  return privatePaths.some((p) => pathname.startsWith(p));
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

// ------------------------------
// Utils DOM
// ------------------------------
function showBody() {
  try {
    document.body.style.display = "block";
  } catch (_) {}
}
function hideBody() {
  try {
    document.body.style.display = "none";
  } catch (_) {}
}

// Si la page n'est pas privée → afficher le contenu directement
if (typeof window !== "undefined" && !isPrivatePath(window.location.pathname)) {
  showBody();
}

(async () => {
  const dynamicImport = (url) => new Function("u", "return import(u)")(url);

  const { initializeApp } = await dynamicImport(
    "https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js"
  );
  const {
    getAuth,
    onAuthStateChanged,
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
    hideBody();

    const user = auth.currentUser;

    // 🧩 Correction : afficher le body si non connecté sur page publique ou login
    if (!user) {
      if (pathname === "/login" || !isPrivatePath(pathname)) {
        showBody();
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

    if (!allowed) {
      log(`Access denied for ${user.email} (${role})`);
      window.location.assign("/access-denied");
      return;
    }

    // ------------------------------
    // Cookie session (optionnel)
    // ------------------------------
    try {
      const maxAge = 60 * 60 * 8; // 8h
      document.cookie = `bb_auth=1; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
      document.cookie = `bb_email=${encodeURIComponent(
        user.email
      )}; Path=/; Max-Age=${maxAge}; SameSite=Lax`;
    } catch (_) {}

    log("✅ Access granted:", user.email, "role:", role);
    showBody();
  }

  // ------------------------------
  // Suivi des connexions
  // ------------------------------
  onAuthStateChanged(auth, async (user) => {
    const path = window.location.pathname;
    log("Auth state changed:", user ? user.email : "none");
    await checkAndHandleAccess(path);
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
      document.cookie = "bb_auth=; Path=/; Max-Age=0; SameSite=Lax";
      document.cookie = "bb_email=; Path=/; Max-Age=0; SameSite=Lax";
    } catch (_) {}
    return signOut(auth);
  };
})();
