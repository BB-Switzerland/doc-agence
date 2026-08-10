import React, { useEffect, useState } from "react";

export default function LoginPage() {
  const [message, setMessage] = useState(
    "Connecte-toi avec Google pour continuer."
  );
  const [error, setError] = useState(null);
  const [deps, setDeps] = useState(null); // { auth, provider, signInWithRedirect }

  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        // Si déjà authentifié via cookie (middleware/client), renvoie direct
        try {
          const hasCookie = document.cookie.includes("bb_auth=1");
          if (hasCookie) {
            const returnUrl = sessionStorage.getItem("returnUrl");
            window.location.replace(returnUrl || "/");
            return;
          }
        } catch (_) {}

        // Import dynamique des SDK Firebase côté client
        // Utilise la même technique que dans static/auth.js pour éviter que
        // Webpack (au build sur Vercel) tente de résoudre les URLs https:.
        const dynamicImport = (url) => new Function('u', 'return import(u)')(url);
        const { initializeApp } = await dynamicImport(
          'https://www.gstatic.com/firebasejs/11.0.0/firebase-app.js'
        );
        const {
          getAuth,
          onAuthStateChanged,
          signInWithRedirect,
          signInWithPopup,
          GoogleAuthProvider,
          getRedirectResult,
          browserLocalPersistence,
          setPersistence,
        } = await dynamicImport(
          'https://www.gstatic.com/firebasejs/11.0.0/firebase-auth.js'
        );

        const firebaseConfig = {
          apiKey: "AIzaSyCOI4zCnBxJ00okt2xBvJhwfZeu4ULAy8s",
          authDomain: "bbs-doc.firebaseapp.com",
          projectId: "bbs-doc",
          storageBucket: "bbs-doc.firebasestorage.app",
          messagingSenderId: "202877079803",
          appId: "1:202877079803:web:bfa7530a95490c11a8605e",
        };

        const app = initializeApp(firebaseConfig);
        const auth = getAuth(app);
        try {
          await setPersistence(auth, browserLocalPersistence);
          console.log("[login] persistence set to local");
        } catch (e) {
          console.warn("[login] setPersistence failed", e);
        }
        const provider = new GoogleAuthProvider();
        try {
          // Améliore l'expérience et oriente vers un domaine (indicatif)
          provider.setCustomParameters({ prompt: "select_account" });
          // Si tu veux cibler un domaine précis, remplace ci-dessous:
          // provider.setCustomParameters({ hd: 'agence-bb.ch' });
        } catch (_) {}

        // Si on revient de Google, finalise le résultat (optionnel, utile pour erreurs explicites)
        try {
          const result = await getRedirectResult(auth);
          // Debug: affiche le type de résultat obtenu
          console.log(
            "[login] getRedirectResult:",
            !!result,
            result?.user?.email
          );
        } catch (e) {
          console.error("[login] getRedirectResult error", e);
          if (!cancelled) setError(e?.message || String(e));
        }

        onAuthStateChanged(auth, async (user) => {
          if (cancelled) return;
          console.log("[login] onAuthStateChanged:", user ? user.email : null);
          if (user) {
            // Pose le jeton AVANT de rediriger : c'est lui que le middleware
            // vérifie. Sans ça, la page de destination renvoie sur /login.
            try {
              const token = await user.getIdToken();
              document.cookie = `bb_token=${token}; Path=/; Max-Age=3600; SameSite=Lax`;
              document.cookie = `bb_auth=1; Path=/; Max-Age=${60 * 60 * 8}; SameSite=Lax`;
            } catch (e) {
              console.error("[login] impossible de poser le jeton", e);
              setError("Connexion impossible, réessaie.");
              return;
            }
            const returnUrl = sessionStorage.getItem("returnUrl");
            // Nettoie la valeur et redirige
            try {
              sessionStorage.removeItem("returnUrl");
            } catch (_) {}
            window.location.replace(returnUrl || "/");
          } else {
            // Ne pas rediriger automatiquement; attendre un clic utilisateur
            setDeps({ auth, provider, signInWithRedirect, signInWithPopup });
            setMessage("Connecte-toi avec Google pour continuer.");
          }
        });
      } catch (e) {
        console.error("[login] init error", e);
        if (!cancelled) setError(e?.message || String(e));
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <main className="container margin-vert--lg">
      <div className="row">
        <div className="col col--8 col--offset-2 text--center">
          <h1>Connexion</h1>
          {error ? (
            <>
              <p className="text--danger">Une erreur s'est produite: {error}</p>
              <p>Tu peux réessayer la connexion Google.</p>
            </>
          ) : (
            <p>{message}</p>
          )}
          <button
            className="button button--primary button--lg"
            onClick={async () => {
              try {
                if (!sessionStorage.getItem("returnUrl")) {
                  const fallback = "/";
                  sessionStorage.setItem("returnUrl", fallback);
                }
              } catch (_) {}
              if (deps?.auth && deps?.provider && deps?.signInWithPopup) {
                setMessage("Connexion en cours…");
                try {
                  // Essaye le popup d'abord (meilleur UX desktop). Si bloqué, on bascule en redirect.
                  await deps.signInWithPopup(deps.auth, deps.provider);
                } catch (e) {
                  console.warn(
                    "[login] signInWithPopup failed, fallback to redirect",
                    e?.code || e
                  );
                  if (deps?.signInWithRedirect) {
                    setMessage("Redirection vers Google…");
                    await deps.signInWithRedirect(deps.auth, deps.provider);
                  } else {
                    setError("Erreur d'authentification");
                  }
                }
              } else {
                window.location.reload();
              }
            }}
            style={{ marginTop: "1rem" }}
          >
            Continuer avec Google
          </button>
        </div>
      </div>
    </main>
  );
}
