export const config = {
  matcher: "/:path*",
};

export default function middleware(request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  console.log("Visitor IP:", ip);
  const ALLOWED_IP = "185.109.164.10";

  if (ip === ALLOWED_IP) {
    console.log("Access granted ✅");
    return fetch(request);
  }

  console.log("Access denied 🚫 for", ip);
  return new Response("Access denied", { status: 403 });
}
