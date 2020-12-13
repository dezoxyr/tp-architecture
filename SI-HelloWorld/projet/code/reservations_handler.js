const reservations = require("./reservations.json");
var qs = require('querystring');

// Renvoie la page HTML de la liste des réservations de l'utilisateur.
function showAll(req, res) {
    var templateParameters = {
        reservations: reservations
    };
    res.render(__dirname + '/templates/reservations_list.ejs', templateParameters);
}

// Renvoie la liste des réservations de l'utilisateur au format JSON.
function getAll(req, res) {
    res.status(200).json(reservations);
}

// Permet d'ajouter une réservation.
// Renvoie 200 si le billet a bien été réservé, sinon 500.
function add(req, res) {
    const flightId = parseInt(req.params.id);
    const nbPassengers = req.body.nbPassengers;

    const flights = require("./flights.json");
    const theFlight = flights.find(flight => flight.id === flightId);

    var newReservation = {
        "id": reservations.length + 1,
        "flight": theFlight,
        "id_reservation_status": 1,
        "nb_passengers": nbPassengers,
        "amount_paid": parseInt(theFlight.price * nbPassengers),
        "date_paid": "12/03/2020 09:35:43",
        "is_flight_cancelled": "false"
    };

    reservations.unshift(newReservation);

    res.status(200).json("");
}

// Renvoie la page HTML des détails d'une réservation.
function showOneById(req, res) {
    const id = parseInt(req.params.id);
    res.status(200).send("<h1>Détails de votre réservation (n°" + id + ")</h1>");
}

// Renvoie les détails d'une réservation au format JSON.
function getOneById(req, res) {
    const id = parseInt(req.params.id);
    const reservation = reservations.find(reservation => reservation.id === id);
    res.status(200).json(reservation);
}

exports.showAll = showAll;
exports.getAll = getAll;
exports.add = add;
exports.showOneById = showOneById;
exports.getOneById = getOneById;