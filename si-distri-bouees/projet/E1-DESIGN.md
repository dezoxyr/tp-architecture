# Description de notre solution technique
 
## Interface utilisateur
 
L'utilisateur a accès à 4 pages. Une page de connexion et de création de compte permettent à l'utilisateur de s'identifer et d'accéder aux deux autres pages. Ces pages affichent les vols disponibles et vols réservés. Pour chaque vol et suivant la page, l'utilisateur peut réserver et annuler un billet.
 
## Stockage des données

Les données sont stockées dans une base de données relationnelle. Nous optons pour PostgreSQL pour sa licence et ses possibilités de mise à l'échelle.

Elle comporte 5 tables:
    - `users` contient les informations de l'utilisateur telles que le nom d'utilisateur, le mot de passe, le nom et le prénom,
    - `cities` répertorie les villes,
    - `travels` liste les vols disponibles et leur prix,
    - `booking` contient les réservations de tous les utilisateurs et la date des réservations,
    - `travel_booking` fait le lien entre la table `travels` et `booking`
    
*Dans notre implémentation, nous utilisons une base de données in-memory. La structure des donénes reste la même à l'exception de* `travel_booking` *, qui est confondu dans la table `booking` au travers d'un tableau.* 

## Stack technique

L'interface utilisateur est un site web. Un serveur NodeJS traite les requêtes HTTP. Il utilise les bibliothèques `express`, `bod-parser` et `cookie-parser`. L'utilisateur arrive sur la page de connexion. Quand il se connecte, un cookie `id` est ajouté et détient l'id de l'utilisateur dans la base de données. Il permet d'identifier l'utilisateur pour ses réservations. Sur les pages de réservations, des requêtes AJAX permettent de réserver ou annuler un vol sans rechargement de la page.

Le site est en ligne et acessible via ce [lien](https://si.cgarnier.dev/). Pour mettre en place le serveur, il faut se placer dans le dossier `projet/code` et exécuter la commande `npm install`. Une fois celle-ci terminée, la commande `node server.js` permet de lancer le serveur.
