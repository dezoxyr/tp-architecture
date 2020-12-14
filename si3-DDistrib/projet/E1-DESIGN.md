# si3-DDistrib - Design

## Schema architecture
<img src="./assets/schema_architecture.png" with="100px" />

### Explication
Le server client envoie les reqûetes sur le server NodeJS. Les requêtes sont des requêtes HTTP. Nous utilisons uniquement les GET et les POST pour obtenir ou envoyer de la données.

Le server NodeJS contient Express, une Interface API REST. Elle va gérer les requêtes HTTP en envoyant les données souhaitées par l'utilisateur.

La base de données dans notre cas est uniquement fais de fichiers locaux en JSON qui seront mis à jours avec Express.


## Modèle de données de stockage
<img src="./assets/data_model.png" with="100px" />
La base de données a été créé dans l'optique d'être intégré à une base de données relationnelle.
Elle comporte toute les caractérisitiques necessaire pour la réservation d'un vol classique.


## Définition du stack technique
- NodeJS 
- ExpressJS
- MySQL
- HTML / CSS / JS

## Démonstration
### Lancement du server de l'API
	- node code/server/server.js

### Lancement du server client
	- node code/client/index.js

### Aller sur le site client
	- Lancer votre navigateur l'url suivante : http://localhost:80
	- Les identifiants client sont :
		- ernult@et.esiea.fr
		- fenzar@et.esiea.fr
		- omrane@et.esiea.fr
		- serkesti@et.esiea.fr
		- sorel@et.esiea.fr
		- tourari@et.esiea.fr

### Remarque sur le site
#### D'un point de vu technique
Nous avons fait le choix de séparer la partie server de donnée de la partie server client dans le but de distinguer chaque utilisation.

#### D'un point de vu utilisation
Notre site client contient uniquement les fonctionnalités de base. Il n'a aucune sécurité pour la connexion et pour l'accès à la page d'un client.