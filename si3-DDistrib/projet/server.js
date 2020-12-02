const express = require('express')
const app = express();

var clients = require('./data/clients.json');
var airfares = require('./data/airfares.json');
var airports = require('./data/airports.json');
var flights = require('./data/flights.json');

app.use(express.json());

app.get('/', (req, res) => {
	const data = {
		"clients":  (clients),
		"airports": (airports),
		"flights":  (flights),
		"airfares": (airfares)	
	}
	res.status(200).json(data);
});

app.get('/myFlights/:id', (req, res) => {
	res.send('Here are my personnal flights');
})

app.get('/Flights', (req, res) => {
	res.send('Here are all flights');
})

app.post('/Flights/:idFlight&:idClient', (req, res) => {
	res.send('Here is the new flight of a client');
})

app.put('/myFlights/:id', (res, req) => {
	res.send("Here is the update flight of a client");
})

app.delete('/myFlights/:id', (res, req) => {
	res.send("Here is the delete flight");
})

app.listen(8000, () => {
	console.log('Example app listening on port 8000!')
});