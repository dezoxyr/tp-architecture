const express = require("express")
const app = express()

const flightsHandler = require("./flights_handler")
const reservationsHandler = require("./reservations_handler")

app.use(express.json())
app.use(express.urlencoded());

app.use(express.static(__dirname + '/public'));

var bodyParser = require('body-parser')
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

// La page d'accueil redirige vers la page de la liste des vols.
app.get(["/", "/index.html"], flightsHandler.showAll)

// = GESTION DES VOLS =
// Renvoie la page HTML des vols disponibles.
app.get("/flights", flightsHandler.showAll)

// Renvoie la liste des vols disponibles au format JSON.
app.get('/api/flights', flightsHandler.getAll)

// Renvoie la page HTML des détails d'un vol.
app.get('/flights/:id', flightsHandler.showOneById)

// Renvoie les détails d'un vol au format JSON.
app.get('/api/flights/:id', flightsHandler.getOneById)

// Permet de réserver un billet.
app.post('/api/flights/:id/book', reservationsHandler.add)

// = GESTION DES RESERVATIONS =
// Renvoie la page HTML de la liste des réservations de l'utilisateur.
app.get('/reservations', reservationsHandler.showAll)

// Renvoie la liste des réservations de l'utilisateur au format JSON.
app.get('/api/reservations', reservationsHandler.getAll)

// Renvoie les détails d'une réservation au format JSON.
app.get('/api/reservations/:id', reservationsHandler.getOneById)

// Lancer le serveur sur le port 8080.
app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})