const reservations = require("./reservations.json")

// Renvoie la page HTML de la liste des réservations de l'utilisateur.
function showAll(req, res) {
    var templateParameters = {
        reservations: reservations
    };
    res.render(__dirname + '/templates/reservations_list.ejs', templateParameters);
}

// Renvoie la liste des réservations de l'utilisateur au format JSON.
function getAll(req, res) {
    res.status(200).json(reservations)
}

// Renvoie la page HTML des détails d'une réservation.
function showOneById(req, res) {
    const id = parseInt(req.params.id)
    res.status(200).send("<h1>Détails de votre réservation (n°" + id + ")</h1>")
}

// Renvoie les détails d'une réservation au format JSON.
function getOneById(req, res) {
    const id = parseInt(req.params.id)
    const reservation = reservations.find(reservation => reservation.id === id)
    res.status(200).json(reservation)
}

exports.showAll = showAll;
exports.getAll = getAll;
exports.showOneById = showOneById;
exports.getOneById = getOneById;