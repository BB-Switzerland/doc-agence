export const config = {
  matcher: "/:path*",
};

// Liste des chemins privés (doit refléter static/auth.js)
const PRIVATE_PREFIXES = ["/digital", "/onboarding"]; // ajuste ici si besoin

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
  const cookies = parseCookies(request.headers.get("cookie"));
  const isPrivate = isPrivatePath(pathname);
  const isLogin = pathname === "/login";

  console.log("[mw] req", { pathname, search, ip, isPrivate, isLogin, bb_auth: cookies.bb_auth, bb_email: cookies.bb_email });

  // --- Filtrage IP (whitelist) ---
  // Format attendu : BB_IP_WHITELIST="1.2.3.4,5.6.7.8"
  try {
    const raw = process.env.BB_IP_WHITELIST || "";
    const allowedIps = raw.split(",").map((s) => s.trim()).filter(Boolean);
    if (allowedIps.length) {
      if (!ip) {
        console.log("[mw] no x-forwarded-for header present, cannot match IP whitelist");
      } else if (allowedIps.includes(ip)) {
        console.log("[mw] access granted by IP whitelist ✅", ip);
        return fetch(request);
      } else {
        console.log("[mw] ip not in whitelist:", ip, "allowed:", allowedIps);
      }
    }
  } catch (e) {
    console.warn("[mw] ip whitelist check failed", e);
  }

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

  // Non authentifié: redirige vers /login (conserve l'URL cible via sessionStorage côté client)
  console.log("[mw] redirect to /login (no cookie)");
  const loginUrl = new URL(request.url);
  loginUrl.pathname = "/login";
  return Response.redirect(loginUrl.toString(), 302);
}
