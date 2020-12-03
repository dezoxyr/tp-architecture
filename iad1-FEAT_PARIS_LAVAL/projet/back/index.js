const express = require('express');
const joi = require('joi');

const app = express();

const user_schema = joi.object().keys({
    mail: joi.string().email().required()
});

const booking_schema = joi.object().keys({
    id_flight: joi.number().min(0).required(),
    id_user: joi.number().min(0).required(),
    price: joi.number().min(0).required(),
    booking_date: joi.date().min(new Date()),
});

const USERS = [
    {
        id_user: 1,
        name: "michel",
        mail: "michel@michel.be"
    }
];
const BOOKINGS = [
    {
        id_booking: 1,
        id_flight: 1,
        id_user: 1,
        price: 10
    }
];
const FLIGHTS = [
    {
        id_flight: 1,
        id_airport_source: 1,
        id_airport_destination: 2
    },
    {
        id_flight: 2,
        id_airport_source: 1,
        id_airport_destination: 3
    },
    {
        id_flight: 3,
        id_airport_source: 2,
        id_airport_destination: 3
    }
];
const AIRPORTS = [
    {
        id_airport: 1,
        name: "New-York",
        code: "JFK"
    },
    {
        id_airport: 2,
        name: "CDG Paris",
        code: "CDG"
    },
    {
        id_airport: 3,
        name: "Detroit",
        code: "DTW"
    }
];

const USERS_INDEX = USERS.length;
const BOOKINGS_INDEX = BOOKINGS.length;
const FLIGHTS_INDEX = FLIGHTS.length;
const AIRPORTS_INDEX = AIRPORTS.length;

function findUserByMail(mail) {
    return USERS.find(user => user.mail === mail);
}

// Middleware
app.use(express.json());

//Récupérer utilisateur
app.get('/users/:mail', (req,res) => {
    const input = user_schema.validate(req.params);

    if (!input.error) {
        const name = input.value.mail;

        const user = findUserByMail(mail);
        if (user != null) {
            res.status(200).json(user);
        } else {
            res.status(404).send("User not found");
        }
    }

    res.status(400).send(input.error[0]);
});

//Créer utilisateur
app.post('/users', (req, res) => {
    const input = user_schema.validate(req.params);

    if (!input.error) {
        const mail = input.value.mail;
        const user = findUserByMail(mail);

        if (user == null) {
            USERS.push({
                ...input.value,
                id_user: USERS_INDEX++
            });

            res.status(201).send();
        } else {
            res.status(409).send("User already created");
        }
    }

    res.status(400).send(input.error[0]);
});

//Récupérer réservations de l'utilisateur
app.get('/bookings/:mail', (req, res) => {
    const input = user_schema.validate(req.params);

    if (!input.error) {
        const mail = input.value.mail;
        const user = findUserByMail(mail);

        if (user != null) {
            const bookings = BOOKINGS
                             .filter(b => b.id_user === user.id_user)
                             .map(b => ({
                                flight: FLIGHTS.find(f => f.id_flight === b.id_flight)
                            })).filter(b => b.flight.flight_date >= new Date());

            res.status(200).json(bookings);
        } else {
            res.status(404).send("User not found");
        }
    }
    
    res.status(400).send(input.error[0]);
});

//Créer booking pour utilisateur
app.post('/bookings', (req, res) => {
    const user_input = user_schema.validate(req.body);
    const booking_input = booking_schema.validate(req.body)

    if (user_input.error) {
        res.status(400).send(user_input.error[0]);
    } else if (booking_input.error) {
        res.status(400).send(booking_input.error[0]);
    } 

    const id_flight = input.value.id_flight;
    const booking_date = input.value.booking_date;
    const flight = FLIGHTS
                    .find(f => f.id_flight = id_flight && f.flight_date >= booking_date);
    if (flight == null) {
        res.status(400).send("Flight not available");
    }

    BOOKINGS.push({
        ...input.value,
        id_user: BOOKINGS_INDEX++
    });

    res.status(200).send();
});

//Récupérer vols
app.get('/flights', (req, res) => {
    const flights = FLIGHTS
                    .filter(f => f.flight_date >= new Date())
                    .map(f => ({
                        source_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_source),
                        destination_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_destination)
                    }));

    res.status(200).json(flights);
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute");
});