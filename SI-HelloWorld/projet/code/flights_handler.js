const axios = require('axios');

const flights = require("./flights.json");

// Renvoie la page HTML de la liste des vols.
// GET /flights/:date
function showAll(req, res) {
    // On récupère la date demandée.
    const date = req.params.date;

    retrieveAll(date, (jsonRes) => {
        var templateParameters = {
            flights: jsonRes,
            date: date
        };
        res.render(__dirname + '/templates/flight_list.ejs', templateParameters);
    });
}

// Renvoie au client la liste des vols disponibles au format JSON.
// GET /api/flights/:date
function getAll(req, res) {
    // On récupère la date demandée.
    const date = req.params.date;

    retrieveAll(date, (jsonRes) => {
        res.status(200).json(jsonRes);
    });
}

// Renvoie un object JSON de la liste des vols disponibles.
function retrieveAll(date, callback) {
    // Objet JSON à retourner au client.
    var jsonRes;
    var apiUrl = "https://app-air-travel.azurewebsites.net/flights/" + date;

    // On récupère la liste des vols de l'API tierce.
    axios({
            method: "get",
            url: apiUrl
        })
        .then(function(response) {
            var apiJsonString = JSON.stringify(response.data);

            // On normalise le JSON retourné par l'API tierce, afin de retourner un code JSON avec un schéma cohérent entre notre API et l'API tierce.
            // On renomme les propriétés "code" en "id".
            apiJsonString = apiJsonString.split('"code":').join('"id":');
            // On renomme les propriétés "departure" en "code_airport_dep".
            apiJsonString = apiJsonString.split('"departure":').join('"code_airport_dep":');
            // On renomme les propriétés "departure" en "code_airport_dep".
            apiJsonString = apiJsonString.split('"arrival":').join('"code_airport_dest":');

            var apiJson = JSON.parse(apiJsonString);

            // Pour chaque vol...
            for (var i = 0; i < apiJson.length; i++) {
                apiJson[i].flight.availability = apiJson[i].availability;
                delete apiJson[i].availability;

                // Déplacer tous les enfants de "flight" dans le parent supérieur.
                Object.keys(apiJson[i].flight).forEach(function(key) {
                    apiJson[i][key] = apiJson[i].flight[key];
                });
                delete apiJson[i].flight;
            }

            // On crée et renvoie un objet JSON contenant les vols de notre base de données et ceux de l'API tierce.
            jsonRes = flights.concat(apiJson);

            callback(jsonRes);
        })
        .catch(function(error) {
            console.log(error);

            // On ne renvoie que les vols de notre base de données.
            jsonRes = flights;

            callback(jsonRes);
        });
}

// Renvoie la page HTML des détails d'un vol.
function showOneById(req, res) {
    const id = req.params.id;
    const date = req.params.date;

    retrieveOneById(id, date, (jsonRes) => {
        var templateParameters = {
            flight: jsonRes,
            date: date
        };
        res.render(__dirname + '/templates/flight_details.ejs', templateParameters);
    });
}

// Renvoie les détails d'un vol au format JSON.
function getOneById(req, res) {
    const id = req.params.id;
    const date = req.params.date;

    retrieveOneById(id, date, (jsonRes) => {
        res.status(200).json(jsonRes);
    });
}

// Renvoie les détails d'un vol au format JSON.
function retrieveOneById(id, date, callback) {
    retrieveAll(date, (jsonRes) => {
        callback(jsonRes.find(flight => flight.id === id));
    });
}

exports.showAll = showAll;
exports.getAll = getAll;
exports.showOneById = showOneById;
exports.getOneById = getOneById;
exports.retrieveOneById = retrieveOneById;