const flights = require("./flights.json")

function showAll(req, res) {
    var templateParameters = {
        flights: flights
    };
    res.render(__dirname + '/templates/flight_list.ejs', templateParameters);
}

// Renvoie la liste des vols disponibles au format JSON.
function getAll(req, res) {
    res.status(200).json(flights)
}

// Renvoie la page HTML des détails d'un vol.
function showOneById(req, res) {
    const id = parseInt(req.params.id)
    res.status(200).send("<h1>Détails du vol " + id + "</h1>")
}

// Renvoie les détails d'un vol au format JSON.
function getOneById(req, res) {
    const id = parseInt(req.params.id)
    const flight = flights.find(flight => flight.id === id)
    res.status(200).json(flight)
}

exports.showAll = showAll;
exports.getAll = getAll;
exports.showOneById = showOneById;
exports.getOneById = getOneById;