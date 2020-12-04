# Design du projet : réservation de billet d’avion

 Equipe MalESIEA-Airlines

## Présentation
Projet de site web réalisant un système de réservation de billet d'avion

## architecture
* 1	Tout d’abord une page d’accueil présentant les vols disponibles pour les trois aéroports JFK, CDG et DTW. Un tableau sous cette forme représentera les billets :

| Code départ	| Code arrivé	| Prix (euro) |
|-------------|:-----------:|------------:|
|     JFK     |     CDG     |     800     |

* 2 Pour réserver le billet, le client devra remplir un formulaire pour réserver son billet en donnant le nombre de billet, un nom, un prénom et le code du vol. 

* 3	Lorsqu’il entrera les informations, il sera amené à une page d’authentification ou il rentrera un nom et un mot de passe.

* 4	Une fois authentifié, il sera amené à une page ou il pourra consulter ses réservations.

## Données à stocker
Concernant les données à stocker, nous pouvons noter le code départ, le code d’arrivée, le prix du billet, le nom de l’utilisateur, le mot de passe et l'adresse mail.  
Principalement des char, un integer et un string pour l'adresse mail. 

Nous aurions donc deux tables : 
connexion : adresse mail, mot de passe, nom utilisateur (clé)
Réservation : Code départ, code arrivée, prix, nom utilisateur 

## Technologie utilisée

Pour réaliser le projet, nous comptons le faire en html php sql . via WAMP






