---
sidebar_position: 3
---

# Rapport Campagnes & GA4

## Étapes de configuration

1. Ouvrir **Google Chrome** avec le compte **analytics@agence-bb.ch**.
2. Accéder à [Google Looker Studio](https://lookerstudio.google.com).
3. **Dupliquer** le rapport **"01 - Modèle"**.
4. **Changer les connecteurs** :  
   - Aller dans l'onglet **"Ressource"** > **"Gérer les nouvelles sources de données"**.
5. **Modifier les indicateurs clés** si nécessaire.
6. **Masquer les pages sans données** :  
   - Onglet **"Page"** > **"Gérer les pages"**.  
   - Cliquer sur **les 3 points** d'une page > **"Masquer en mode Vue"** (panneau de droite **"Pages du rapport"**).

---

## Paramétrer l'envoi automatique

1. **Accéder au bouton "Planifier l'envoi"** (flèche à droite du bouton **"Partager"**).
2. **Remplir les champs de la fenêtre "Envoi par e-mail"** :
   - **À** : Ajouter l'email du client.
   - **Cocher** la case **"Personnaliser l'objet et le contenu de l'email"**.
   - **Objet** : `Rapport de performance des campagnes digitales`.
   - **Message** :  
     > Cher XY,  
     > Nous vous transmettons le rapport de performance pour le mois dernier.  
     > La période peut être modifiée dans le coin supérieur droit du rapport interactif.  
     > Vous y trouverez les données des campagnes digitales.  
     > Nous restons à votre entière disposition en cas de questions.  
   - **Heure du début** : Sélectionner le **5 du mois prochain**.
   - **Répéter** :  
     - Choisir **"Personnalisé"**.
     - Sélectionner **"Chaque : 1 mois, le 5e jour"**.

