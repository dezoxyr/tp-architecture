# **Présentation du design**

## Architecture Globale :

Page d'acceuil :

- Affiche les vols disponibles en son centre, avec le nombre de billets restants.
- Contient une barre de recherche pour trouver le vol souhaité.
- Permet de selectionner un vol et de passer à la page de réservation.
- Possibilité de se connecter à son compte via un bouton « se connecter ».
- Possibilité de se crée un compte via un bouton « s'inscrire ».
- Si déjà connecté, possibilité de se déconnecter.

Page de réservation du billet :

- Affiche les informations sur le billet.
- Permet d'acheter un billet.

Page d'inscription :

- Crée un compte utilisateur en fonction des paramètres entrés.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.
- Doit contenir plusieurs champs de texte pour le nom d'utilisateur, nom prénom, mail etc.

Page de connexion :

- Connecte un utilisateur à sa session.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.



Modèle de données stockées :

![]()

Stack technique :

- Rendu visuel de l'API -> Python
- Gestion de la base de données -> SQL (Php My Admin)
- Fonctionnalités et interaction avec la base de données -> Python
