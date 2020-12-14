# **Présentation du design**

## Architecture Globale :

Page d'acceuil :

- Affiche les vols disponibles en son centre, avec le nombre de billets restants.
- Contient une barre de recherche pour trouver le vol souhaité.
- Permet de selectionner un vol et de passer à la page de réservation.
- Possibilité de se connecter à son compte via un bouton « se connecter ».
- Possibilité de se crée un compte via un bouton « s'inscrire ».
- Si déjà connecté, possibilité de se déconnecter.

Page d'inscription :

- Crée un compte utilisateur en fonction des paramètres entrés.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.
- Doit contenir plusieurs champs de texte pour le nom d'utilisateur, nom prénom, mail etc.

Page de connexion :

- Connecte un utilisateur à sa session.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.



## Modèle de données stockées :

![](/SI-IAlsoHaveNoName/Projet/pres/image.png)

## Stack technique :

- Rendu visuel de l'application -> Html
- Ressources de l'API -> JavaScript

Fichiers:
- "data.json" contient les informations des 3 aéroports
- "server.js" récupère les données enregistrées dans la page Web
- Les fichiers Html restants servent à la navigation utilisateur
 