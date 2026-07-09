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

  // Privé: exige le cookie déposé par static/auth.js après login Firebase
  if (cookies.bb_auth === "1") {
    console.log("[mw] access granted ✅", cookies.bb_email || "(no email)");
    return fetch(request);
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
