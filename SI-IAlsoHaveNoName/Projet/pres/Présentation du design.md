# **Présentation du design**

## Architecture Globale :

Page d'acceuil :

- Affiche les vols disponibles en son centre, avec le nombre de billets restants.
- Contient une barre de recherche pour trouver le vol souhaité.
- Possibilité de se connecter à son compte via un bouton « se connecter ».
- Possibilité de se crée un compte via un bouton « s&#39;inscrire ».
- Si déjà connecté, possibilité de se déconnecter.

Page d'inscription :

- Crée un compte utilisateur en fonction des paramètres entrés.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.
- Doit contenir plusieurs champs de texte pour le nom d'utilisateur, nom prénom, mail etc.

Page de connexion :

- Connecte un utilisateur à sa session.
- Accessible depuis toutes les pages lorsque l'on n'est pas connecté.

Page utilisateur :

-

Page d'achat :

-

Modèle de données stockées :

![](/Users/nathan/Documents_Session/ETUDES/ESIEA/Programmation Distib/image.png)

Stack technique :

- Rendu visuel de la page web -> HTML/CSS
- Gestion de la base donnée -> SQL (Php My Admin)
- Fonctionnalités et interaction avec la base de données -> php