
# Design du projet :

Pour ce projet nous avons imaginé une architecture avec 3 composantes principales :

## Le schéma d'architecture :

![](https://github.com/PierricL/tp-architecture/blob/si1-Softoucanandco/si1-Softoucanandco/projet/picture/sch%C3%A9maArchitecture.jpg)

Ce schéma illustre la manière dont notre projet va se comporter. Premièrement, il y a la partie client qui va être la face visible de tout le reste. C'est d'ici que l'utilisateur va accéder à notre site et va pouvoir faire toutes les actions voulut.
Ensuite il y a la partie serveur qui est l'endroit où les actions des utilisateurs sont traitées. Les technologies utilisés ici sont celles décrites dans le stack technique.
Et pour finir, il y a la partie base de donnée qui regroupe toutes les informations nécessaires au projet de manière relationnel. Pour plus de précisions, voir la structure de la base de donnée.

## Le stack technique :

![](https://github.com/PierricL/tp-architecture/blob/si1-Softoucanandco/si1-Softoucanandco/projet/picture/stackTechnique.png)

La Stack Technique est importante car elle permet de résumer de façon claire les différents langages de programmation, les frameworks et les outils dont les développeurs aura besoin pour interagir avec une application. 

Dans notre cas, nous avons utilisé les langages Html/Css pour le développement de la partie front. 

En ce qui concerne la partie back, nous souhaitons utiliser le langage PHP. 

La gestion de base de données se fera par le langage SQLite.

## Structure de la base de donnée :

![](https://github.com/PierricL/tp-architecture/blob/si1-Softoucanandco/si1-Softoucanandco/projet/picture/StructureBDD.png)

La base de données que nous avons imaginée regroupe les 3 tables suivantes permettant : 
- de définir le user et ses informations personnelles, 
- proposer l’accès aux billets d’avion, destination prix etc.. 
- et donner l’accès aux vols historiques, table qui permettra d’avoir une vue sur les vols réservés
