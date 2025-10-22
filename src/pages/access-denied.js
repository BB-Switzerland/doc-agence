import React from "react";

export default function AccessDenied() {
  return (
    <div style={{textAlign: 'center', marginTop: '10vh'}}>
      <h1>⛔ Accès refusé</h1>
      <p>Votre compte n'est pas autorisé à accéder à cette documentation.</p>
      <p>Si vous pensez qu'il s'agit d'une erreur, contactez l'administrateur.</p>
      <a href="/">Retour à la page d'accueil</a>
    </div>
  );
}
