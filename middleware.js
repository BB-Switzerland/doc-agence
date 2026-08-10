export const config = {
  matcher: "/:path*",
};

// Liste des chemins privés (doit refléter static/auth.js)
const PRIVATE_PREFIXES = ["/digital", "/onboarding", "/monday"]; // ajuste ici si besoin

// IPs autorisées à crawler le contenu privé (ex: Algolia Crawler)
const CRAWLER_IPS = ["34.66.202.43"];

function isPrivatePath(pathname) {
  return PRIVATE_PREFIXES.some((p) => pathname.startsWith(p));
}

// ------------------------------
// Vérification du jeton Firebase (signé par Google)
// ------------------------------
const FIREBASE_PROJECT_ID = "bbs-doc";
const ALLOWED_DOMAIN = "@agence-bb.ch";
const JWK_URL =
  "https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com";

let jwkCache = { keys: null, expiresAt: 0 };

async function getGooglePublicKeys() {
  if (jwkCache.keys && Date.now() < jwkCache.expiresAt) return jwkCache.keys;
  const res = await fetch(JWK_URL);
  if (!res.ok) throw new Error(`JWK fetch failed: ${res.status}`);
  const data = await res.json();
  const maxAge = /max-age=(\d+)/.exec(res.headers.get("cache-control") || "");
  jwkCache = {
    keys: data.keys,
    expiresAt: Date.now() + (maxAge ? Number(maxAge[1]) : 3600) * 1000,
  };
  return data.keys;
}

function b64urlToBytes(str) {
  const b64 = str.replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(b64.padEnd(Math.ceil(b64.length / 4) * 4, "="));
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}

function decodeSegment(seg) {
  return JSON.parse(new TextDecoder().decode(b64urlToBytes(seg)));
}

// Renvoie les claims si le jeton est authentique et valide, sinon null.
async function verifyIdToken(token) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [rawHeader, rawPayload, rawSignature] = parts;

  let header, payload;
  try {
    header = decodeSegment(rawHeader);
    payload = decodeSegment(rawPayload);
  } catch (_) {
    return null;
  }
  if (header.alg !== "RS256" || !header.kid) return null;

  const keys = await getGooglePublicKeys();
  const jwk = keys.find((k) => k.kid === header.kid);
  if (!jwk) return null;

  const key = await crypto.subtle.importKey(
    "jwk",
    { kty: jwk.kty, n: jwk.n, e: jwk.e },
    { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const valid = await crypto.subtle.verify(
    "RSASSA-PKCS1-v1_5",
    key,
    b64urlToBytes(rawSignature),
    new TextEncoder().encode(`${rawHeader}.${rawPayload}`)
  );
  if (!valid) return null;

  const now = Math.floor(Date.now() / 1000);
  if (!payload.exp || payload.exp <= now) return null;
  if (payload.aud !== FIREBASE_PROJECT_ID) return null;
  if (payload.iss !== `https://securetoken.google.com/${FIREBASE_PROJECT_ID}`)
    return null;
  if (!payload.email || !payload.email.endsWith(ALLOWED_DOMAIN)) return null;

  return payload;
}

function parseCookies(cookieHeader) {
  const out = {};
  if (!cookieHeader) return out;
  for (const part of cookieHeader.split(";")) {
    const [k, ...v] = part.trim().split("=");
    out[k] = decodeURIComponent(v.join("="));
  }
  return out;
}

export default async function middleware(request) {
  const { pathname, search } = new URL(request.url);
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  // Filtrage IP global (si défini en variable d'environnement)
  try {
    const ALLOWED_IPS = (process.env.BB_IP_WHITELIST || '')
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    console.log('[mw] visitor ip', ip, 'allowed_ips_env', ALLOWED_IPS);
    if (ALLOWED_IPS.length && !ALLOWED_IPS.includes(ip)) {
      console.log('[mw] Access denied 🚫 for', ip);
      return new Response('Access denied', { status: 403 });
    }
  } catch (e) {
    console.warn('[mw] ip filtering check failed', e);
  }
  const cookies = parseCookies(request.headers.get("cookie"));
  const isPrivate = isPrivatePath(pathname);
  const isLogin = pathname === "/login";

  console.log("[mw] req", { pathname, search, ip, isPrivate, isLogin, bb_auth: cookies.bb_auth, bb_email: cookies.bb_email });

  // Laisse passer la page de login et les assets sans restriction
  if (isLogin || pathname.startsWith("/assets") || pathname.startsWith("/img") || pathname.startsWith("/auth.js") || pathname.startsWith("/static")) {
    return fetch(request);
  }

  if (!isPrivate) {
    // Public: pass-through
    return fetch(request);
  }

  // Privé: exige un jeton Firebase signé par Google. Le cookie bb_auth n'est
  // qu'un indicateur d'affichage côté client, il ne donne aucun droit ici.
  try {
    const claims = await verifyIdToken(cookies.bb_token);
    if (claims) {
      console.log("[mw] access granted ✅", claims.email);
      return fetch(request);
    }
    console.log("[mw] jeton absent ou invalide", cookies.bb_email || "(no email)");
  } catch (e) {
    console.error("[mw] token verification failed", e);
  }

  // Bypass auth pour les crawlers autorisés (Algolia)
  if (CRAWLER_IPS.includes(ip)) {
    console.log("[mw] crawler access granted 🤖", ip);
    return fetch(request);
  }

  // Non authentifié: redirige vers /login (conserve l'URL cible via sessionStorage côté client)
  console.log("[mw] redirect to /login (no cookie)");
  const loginUrl = new URL(request.url);
  loginUrl.pathname = "/login";
  return Response.redirect(loginUrl.toString(), 302);
}
