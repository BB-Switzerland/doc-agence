import React, { useEffect, useState } from "react";

export default function CustomLogin() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Vérifie si l'utilisateur est connecté via le cookie
    setLoggedIn(document.cookie.includes("bb_auth=1"));

    // Écoute les changements d'état d'authentification
    const handleAuthChange = () => {
      setLoggedIn(document.cookie.includes("bb_auth=1"));
    };
    window.addEventListener("bb:authchange", handleAuthChange);

    return () => {
      window.removeEventListener("bb:authchange", handleAuthChange);
    };
  }, []);

  const handleLogin = () => {
    window.location.assign("/login");
  };

  const handleLogout = () => {
    if (window.logout) window.logout();
    setTimeout(() => window.location.reload(), 500);
  };

  return loggedIn ? (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleLogout} style={{ marginLeft: 8, cursor: 'pointer' }}
      >
        <path
          fill="currentColor"
          d="M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h7v2H5v14h7v2zm11-4l-1.375-1.45l2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5z"
        />
      </svg>
  ) : (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleLogin} style={{ marginLeft: 8, cursor: 'pointer' }}
      >
        <path
          fill="currentColor"
          d="M12 21v-2h7V5h-7V3h7q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21zm-2-4l-1.375-1.45l2.55-2.55H3v-2h8.175l-2.55-2.55L10 7l5 5z"
        />
      </svg>
  );
}
