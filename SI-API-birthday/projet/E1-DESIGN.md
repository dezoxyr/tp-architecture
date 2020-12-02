# Résumé :

- Architecture : 3 tiers (Client-Application-Stockage).
- Modele de donnée stocké : 
![Error Moldave](https://raw.githubusercontent.com/MisterDelaunay/tp-architecture/SI-API-birthday/SI-API-birthday/projet/BDD.PNG)
- Stack technique : 
  - PHP 7/Symfony 4
  - MySQL

# Choix du design :
## Architecture
Nous avons décidé de faire une application web, car l'application se doit d'être facilement accessible depuis n'importe quel appareil mais également car les membres de notre équipe était plus à l'aise avec ce type de technologie.
Pour l'architecture nous avons choisi une architecture 3 tiers monolithique, qui est un modèle en couche. En effet, ce type d'architecture est particulièrement bien adapté aux applications web. D'autre part, elle a l'avantage de nous permettre de facilement séparer les différentes tâches selon les membres du groupe et est relativement simple, ce qui convient vis à vis du cahier des charges.  
Pour le choix du monolithique, l'architecture micro-service ne nous se semblait pas pertinente au vu du peu de fonctionnalités à implémenter.  
Nous sommes partie sur une architecture REST, qui n'est ni trop récente, ni trop ancienne et qui correspond au besoin.    

## Modèle de donnée stocké
Nous avons décidé de représenter chacun des éléments sous forme d'objets avec des liens entre chacun. Une autre possibilité aurait été de représenter les données sous forme de documents, mais ce choix n'est pertinent que pour certains type de données spécifiques ou lorsque l'on souhaite avoir de très bonnes performances.  

## Stack technique
Nous avons choisi PHP après un vote entre les technologies Java, Javascript et PHP, qui nous semblaient toutes pertinentes.
Par ailleurs, nous avons également choisi d'utiliser le framework Symfony car ce dernier permet de contruire facilement et rapidement des applications avec l'architecture REST.  
Concernant la base de donnée, nous avons choisi une base relationnelle SQL (ce qui est très courant et éprouvé). Pour le SGBD en lui-même, le choux de MySQL s'est fait car les membres étaient habituer à travailler avec.
