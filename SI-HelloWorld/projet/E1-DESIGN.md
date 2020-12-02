# Solution de réservation de billets d’avion - document de design
### Schéma d’architecture de notre solution
Le schéma d’architecture suivant présente, de manière synthétique, les entités constituant notre solution, leurs interactions et les technologies utilisées.

![Schéma d’architecture de notre solution de réservation de billets d’avion.](./schema-architecture.png?raw=true "Schéma d’architecture de notre solution de réservation de billets d’avion.")
- Le client de notre solution est le navigateur web de l’utilisateur. Le client présentera la vue à l’utilisateur, au travers des langages HTML, CSS et JavaScript. Ici, le terme “vue” est associé au modèle d’architecture Modèle-Vue-Contrôleur. Le langage JavaScript permettra de traiter et de modifier les informations présentées à l’utilisateur.
- Lorsque le client envoie une requête HTTPS POST à l’API web, cette dernière la traite grâce à un routage mis en place côté serveur. Cette API repose sur un serveur Node.js. Si la requête nécessite de renvoyer, au client, des informations contenues dans la base de données, une requête SQL est envoyée à la base de données. Cette dernière sera basée sur le système de gestion de base de données relationnelles MySQL. Notre choix du SQL, face au NoSQL, se justifie principalement par la nécessité d’un schéma structurel strict et prédéfini. En effet, comme le site permettra de gérer des réservations de vol, il nous semble important d’opter pour une rigidité de notre modèle de données, plutôt que pour une structure dynamique, permise par le NoSQL.
- Une fois la requête traitée par MySQL, une réponse au format JSON est renvoyée à la méthode JavaScript concernée du serveur Node.js. Ensuite, cette réponse est traitée, puis les données nécessaires et suffisantes, demandées par le client, sont renvoyées à ce dernier au format JSON.
- Enfin, le client reçoit les données au format JSON, puis sont traitées par du code JavaScript. Dans la plupart des cas, ce traitement se traduira par un affichage ou une modification des données.
### Modèle de données
Notre modèle de données contiendra les entités et attributs suivants :
- **Ticket :** id, id_airport_dep, id_airport_dest, dep_time, arrival_time, price, id_company, nb_seats
  - Un billet d’avion est identifié de manière unique par un *id* (entier auto-incrémenté).
  - Les heures d’arrivée et de départ, dans leurs représentations en format JSON, suivent le format du type *DATETIME* de MySQL : *YYYY-MM-DD hh:mm:ss*
  - Les heures de départ et d'arrivée sont les heures locales des aéroports de départ et d'arrivée.
  - Un ticket pour un vol est associé à une compagnie aérienne.
  - *nb_seats* est le nombre de places maximales qu’accepte le vol.
- **Company :** id, name
- **Reservation :** id, id_cust, id_ticket, id_reservation_status, nb_tickets, is_flight_cancelled
  - Une réservation est effectuée par un client, et concerne un seul vol.
  - Une réservation doit concerner au moins 1 ticket de vol.
  - Une réservation possède un état, représenté par un identifiant nommé *Id_Reservation_Status*.
  - *is_flight_cancelled* indique si le vol correspondant à la réservation a été annulé.
- **Reservation_Status :** id, label
  - Cette table de définition représente les états possibles des réservations.
  - Un état de réservation est identifié par un *id* (entier auto-incrémenté).
  - Les noms des différents états possibles sont :
    - “Réglé”
    - "Demande de remboursement en cours de traitement"
    - “Remboursé”
- **Airport :** code, name
  - Un aéroport est identifié de manière unique par son code : JFK, CDG, DTW.
- **Customer :** id, first_name, last name, mail, password
  - Un client est identifié de manière unique par un *id*.
  - Pour s’identifier, tout client doit posséder une adresse mail et un mot de passe.

### Stack technique
 - Pour l'application web mise à destination du client (navigateur) :
   - HTML/CSS
   - JavaScript
 - Pour l'API web traitant les requêtes HTTPS du client :
   - Node.js
 - Pour la base de données relationnelle :
   - MySQL