# Etape 1 

Designer ce systeme de reservation de billet d'avion.

La solution doit permettre:

de permettre à un utilisateur de voir la liste des voles disponible
de reservations des billets d'avion
de voir ce qu'il a reservé
Vous présenterez votre design à tous, vous êtes attendu sur:

L'architecture globale
Le modele de donnée stocké
La stack technique
Votre deisgn devra se trouver dans le fichier projet/E1-DESIGN.md

---

## Design Base de données:
#### Listes:
- aeroports
- billets
- users
- vols
- reservations

## Modèles: 
#### aeroport
- _id
- code
- nom

#### vol
- _id
- aeroport_depart
- aeroport_destination

#### user
- _id
- prenom
- nom

#### billet
- _id
- prix
- vol

#### réservation
- _id
- billet
- user


## Architecture globale

Plusieurs Clients (Front-End) pourront se connecter à un Server (Back-End) qui est relié à une base de données. 

Le Client sera une application web. 
Le Server sera une API RESTful. 
La Base de données sera démarée en local


## Stack technique
#### Front-End
- HTML
- CSS
- JavaScript
- Moteur de vues: Handlebar

#### Back-End
- NodeJS
- MongoDB