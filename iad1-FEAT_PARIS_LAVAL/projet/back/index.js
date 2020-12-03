const express = require('express');
const joi = require('joi');

const app = express();

const user_schema = joi.object().keys({
    mail: joi.string().email().required()
});

const booking_schema = joi.object().keys({
    id_flight: joi.number().min(0).required(),
    mail: joi.string().email().required()
});


const USERS = [
    {
        id_user: 1,
        mail: "michel@michel.be"
    }
];
const BOOKINGS = [
    {
        id_booking: 1,
        id_flight: 1,
        id_user: 1,
        booking_date : new Date()
    }
];
const FLIGHTS = [
    {
        id_flight: 1,
        id_airport_source: 1,
        id_airport_destination: 2,
        flight_date : new Date(2025, 11, 24, 10, 33, 30, 0),
        price: 100, 
        tickets : 0
    },
    {
        id_flight: 2,
        id_airport_source: 1,
        id_airport_destination: 3,
        flight_date : new Date(2028, 11, 24, 10, 33, 30, 0),
        price: 125,
        tickets : 128
    },
    {
        id_flight: 3,
        id_airport_source: 2,
        id_airport_destination: 3,
        flight_date : new Date(2028, 11, 24, 10, 33, 30, 0),
        price: 200, 
        tickets : 5000
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

let USERS_INDEX = USERS.length;
let BOOKINGS_INDEX = BOOKINGS.length;
let FLIGHTS_INDEX = FLIGHTS.length;
let AIRPORTS_INDEX = AIRPORTS.length;

function findUserByMail(mail) {
    return USERS.find(user => user.mail === mail);
}

// Middleware
app.use(express.json());

//Récupérer utilisateur
app.get('/users', (req,res) => {
    const input = user_schema.validate(req.query);

    if (!input.error) {
        const mail = input.value.mail;

        const user = findUserByMail(mail);
        if (user != null) {
            res.status(200).json(user);
        } else {
            res.send("User not found").status(404);
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }
});

//Créer utilisateur
app.post('/users', (req, res) => {
    const input = user_schema.validate(req.body);

    if (!input.error) {
        const mail = input.value.mail;
        const user = findUserByMail(mail);

        if (user == null) {
            USERS.push({
                id_user: ++USERS_INDEX,
                ...input.value
                
            });

            res.status(201).send();
        } else {
            res.status(409).send("User already created");
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }

});

//Récupérer réservations de l'utilisateur
app.get('/bookings', (req, res) => {
    const input = user_schema.validate(req.query);

    if (!input.error) {
        const mail = input.value.mail;
        const user = findUserByMail(mail);
        console.log(user);
        if (user != null) {
            const bookings = BOOKINGS
                             .filter(b => b.id_user === user.id_user)
                             .map(e => ({
                                flight: FLIGHTS.find(f => f.id_flight === e.id_flight)
                            })).filter(i => i.flight.flight_date.getTime() >= new Date().getTime());

            let ret = []
            bookings.forEach(e => {
                ret.push({
                    airport_source : AIRPORTS.find(i => i.id_airport === e.flight.id_airport_source).name,
                    airport_destination : AIRPORTS.find(i => i.id_airport === e.flight.id_airport_destination).name,
                    flight_date: e.flight.flight_date,
                    price : e.flight.price,
                    tickets: e.flight.tickets
                })
            });
            res.status(200).send(ret);
        } else {
            res.status(404).send("User not found");
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }
    
    
});
//Créer booking pour utilisateur
app.post('/bookings', (req, res) => {
    const booking_input = booking_schema.validate(req.body)
    if (booking_input.error) {
        res.status(400).send(booking_input.error.details[0].message);
    } 
    const id_flight = booking_input.value.id_flight;
    const user_mail = booking_input.value.mail;
    const user = USERS.find(f => f.mail === user_mail);
    if(user == null){
        res.status(404).send("User not found");
    }
    const booking_date = new Date();
    const flight = FLIGHTS
                    .find(f => f.id_flight === id_flight && f.flight_date.getTime() >= booking_date.getTime() && f.tickets > 0);
    if (flight == null) {
        res.status(400).send("Flight not available");
    }
    BOOKINGS.push({
        id_flight : flight.id_flight,
        id_booking: ++BOOKINGS_INDEX,
        id_user: user.id_user,
        booking_date: booking_date
    });
    res.status(200).send();
});

//Récupérer vols
app.get('/flights', (req, res) => {
    const flights = FLIGHTS
                    .filter(f => f.flight_date.getTime() >= new Date().getTime())
                    .map(f => ({
                        source_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_source),
                        destination_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_destination),
                        flight_date : f.flight_date,
                        price: f.price,
                        tickets: f.tickets
                    }));
    res.status(200).json(flights);
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute");
});