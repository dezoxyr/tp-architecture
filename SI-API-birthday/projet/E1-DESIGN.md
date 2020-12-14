# Résumé :

- Architecture : 3 tiers (Client-Application-Stockage) :
![](https://raw.githubusercontent.com/MisterDelaunay/tp-architecture/SI-API-birthday/SI-API-birthday/projet/ARCHI.png)
- Modèle de donnée stockée : 
![](https://raw.githubusercontent.com/MisterDelaunay/tp-architecture/SI-API-birthday/SI-API-birthday/projet/BDD.PNG)
- Stack technique : 
  - PHP 7/Symfony 4
  - MySQL
  - VueJS/Vuetify

# Choix du design :
## Architecture
Nous avons décidé de faire une application web, car l'application se doit d'être facilement accessible depuis n'importe quel appareil, mais également, car les membres de notre équipe étaient plus à l'aise avec ce type de technologie.
Pour l'architecture nous avons choisi une architecture 3 tiers monolithique, qui est un modèle en couche. En effet, ce type d'architecture est particulièrement bien adaptée aux applications web. D'autre part, elle a l'avantage de nous permettre de facilement séparer les différentes tâches selon les membres du groupe et est relativement simple, ce qui convient vis-à-vis du cahier des charges.  
Pour le choix du monolithique, l'architecture microservices ne nous se semblait pas pertinente au vu du peu de fonctionnalités à implémenter.  
Nous sommes partis sur une architecture REST, qui n'est ni trop récente, ni trop ancienne et qui correspond au besoin.    
### Routes :
- Lister les tickets disponibles : http://example.com/tickets/available (GET) Paramètres : Aucun
- Faire une réservation : http://example.com/tickets/booking (POST) Paramètres : _id_customer_ = id du client qui souhaite réserver, _id_ticket_ = id du ticket à réserver.
- Lister les réservations par client ; http://example.com/booking/customer/:id (GET) Paramètres : _:id_ = id du client

## Modèle de donnée stocké
Nous avons décidé de représenter chacun des éléments sous forme d'objets avec des liens entre chacun. Une autre possibilité aurait été de représenter les données sous forme de documents, mais ce choix n'est pertinent que pour certains types de données spécifiques ou lorsque l'on souhaite avoir de très bonnes performances.  

## Stack technique
Nous avons choisi PHP après un vote entre les technologies Java, Javascript et PHP, qui nous semblaient toutes pertinentes.
Par ailleurs, nous avons également choisi d'utiliser le framework Symfony, car ce dernier permet de construire facilement et rapidement des applications avec l'architecture REST.  
Concernant la base de données, nous avons choisi une base relationnelle SQL (ce qui est très courant et éprouvé). Pour le SGBD en lui-même, le choix de MySQL s'est fait, car les membres étaient habitués à travailler avec.
Enfin, nous avons choisi de créer un front avec les technologies VueJS/Vuetify, car nous venions de les voir en cours de programmation web.

# Installation de l'application :
Pour mettre en place l'application, les logiciels suivants sont nécessaires :
- PHP 7
- Composer
- Un serveur web (Apache, Nginx ou IIS)
- MySQL

# Notes :
Pour gagner du temps, nous n'avons pas mis en place de mécanisme pour sécuriser l'application (Utilisateur avec un nom d'utilisateur + mot de passe). Cette application est donc, bien sûr, inutilisable telle quelle en production, dans un contexte réaliste. Par ailleurs, notre niveau en VueJS n'étant pas encore très satisfaisant, il subsiste plusieurs bugs que nous n'avons toujours pas résolus. 
