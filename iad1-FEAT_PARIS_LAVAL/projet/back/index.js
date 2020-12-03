const express = require('express');
const app = express();

const USERS = [];
const BOOKINGS = [];
const FLYS = [];
const AIRPORTS = [];

// Middleware
app.use(express.json())

//Récupérer utilisateur
app.get('/users/:name', (req,res) => {
    const id = req.params.name;
    const user = USERS.find(user => user.name === name);
    res.status(200).json(user);
})

//Créer utilisateur
app.post('/users', (req,res) => {
    USERS.push(req.body);
    res.status(200);
})

//Récupérer réservations de l'utilisateur
app.get('/bookings/:username', (req,res) => {
    const username = req.params.username;
    const user = USERS.find(user => user.name === name);

    const bookings = BOOKINGS.find(booking => booking.id_user === user.id_user);
    res.status(200).json(bookings)
})

//Créer booking pour utilisateur
app.post('/bookings', (req,res) => {
    BOOKINGS.push(req.body);

    res.status(200);
})

//Récupérer vols
app.get('/flys', (req,res) => {
    const flys = FLYS.map(f => ({
        source_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_source),
        destination_airport: AIRPORTS.find(a => a.id_airport == f.id_airport_destination)
    }))

    res.status(200).json(flys);
})

app.listen(8080, () => {
    console.log("Serveur à l'écoute");
});