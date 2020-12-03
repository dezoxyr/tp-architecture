const express = require('express')
const fs      = require('fs');
const app     = express();

var clients   = require('./data/clients.json');
var airfares  = require('./data/airfares.json');
var airports  = require('./data/airports.json');
var flights   = require('./data/flights.json');

app.use(express.json());

app.get('/', (req, res) => { // OK
	res.send("API REST Architecture Distribué");
});

app.get('/Flights', (req, res) => { // OK
	res.status(200).json(flights);
})

app.get('/myFlights/:id', (req, res) => {
	const id = parseInt(req.params.id)
	const myFlights = [];
	airfares.forEach((item) => {
		if (item.idClient == id) myFlights.push(item)
	})

	console.log(myFlights);
	res.status(200).json(myFlights)
})

app.post('/myFlights/:idFlight&:idClient', (req, res) => { // OK
	var id = 1;
	airfares.forEach((item) => {
		if (item.id >= id) {
			id = item.id+1;
		} 
	});
	
	var targetFlight = null;
	var fromLabel = null;
	var toLabel = null;

	flights.forEach((item) => {
		if (item.id == req.params.idFlight) {
			targetFlight = item;
		}
	});
	airports.forEach((item) => {
		if (item.name == targetFlight.from) fromLabel = item.label;
		else if (item.name == targetFlight.to) toLabel = item.label;
	})

	var price = targetFlight.price;
	var airfareLabel = fromLabel + "-" + toLabel + " " + price;

	const data = {
		id: id,
		idFlight: req.params.idFlight,
		idClient: req.params.idClient,
		label: airfareLabel
	}
	airfares.push(data);
	fs.writeFile('./data/airfares.json', JSON.stringify(airfares), 'utf8', (err) => {
		if (err) console.log('Error writing file : ' + err);
		else console.log("File is written successfully !");
	});
	res.status(200).json(airfares);
});

app.listen(8000, () => {
	console.log('Example app listening on port 8000!')
});