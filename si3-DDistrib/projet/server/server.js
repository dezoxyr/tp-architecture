const express = require('express');
const fs      = require('fs');
const fetch   = require('node-fetch');
const app     = express();

var clients   = require('./data/clients.json');
var airfares  = require('./data/airfares.json');
var airports  = require('./data/airports.json');
var flights   = require('./data/flights.json');

function logInfo(str){
	console.log("[ INFO ] CLIENT CONNECTED TO : " + str)
}

// app.use(express.json());

app.get('/', (req, res) => { // OK
	logInfo("/");
	clients.forEach((c) => {
		console.log(c.firstname);
		if (c.email == req.query.email) {
			console.log("match and redirect")
			return res.redirect('/home')
		}
	})
	res.send("<!DOCTYPE html>" +
	"<html lang='en'>" +
	"<head>" +
	"	<meta charset='UTF-8'>" +
	"	<meta name='viewport' content='width=device-width, initial-scale=1.0'>" +
	"	<title>si3-DDistrib</title>" +
	"</head>" +
	"<body>" +
	"	<form>" +
	"		<input type='text' name='email' id='email'>" +
	"		<button onclick='submit()' type='button'>Se connecter</button>" +
	"	</form>" +
	"</body>" +
	"</html>");
});

app.get('/home', (req, res) => {
	logInfo("/home")
	res.send('hello world');
})

app.get('/Flights', (req, res) => { // OK
	logInfo("/Flight")
	res.status(200).json(flights);
})

app.get('/client/:email', (req, res) => {
	logInfo('/Client/' + req.params.email);
	clients.forEach((client) => {
		if (client.email == req.params.email) {
			res.status(200).json(client);
		}
	})
})

app.get('/myFlights/:id', (req, res) => {
	logInfo("/myFlight/" + req.params.id);
	const id = parseInt(req.params.id);
	const myFlights = [];
	airfares.forEach((item) => {
		if (item.idClient == id) myFlights.push(item)
	})
	res.status(200).json(myFlights)
})

app.post('/myFlights/:idFlight&:idClient', (req, res) => {
	logInfo("/myFlights/" + req.params.idFlight + "&" + req.params.idClient)
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
	var d_time = targetFlight.departure_time;
	var a_time = targetFlight.arrival_time;
	var date   = targetFlight.date;
	var airfareLabel = fromLabel + "-" + toLabel + " " + price;

	const data = {
		id: id,
		idFlight: req.params.idFlight,
		idClient: req.params.idClient,
		label: airfareLabel,
		departure_time: d_time,
		arrival_time: a_time,
		date: date
	}
	
	airfares.push(data);
	fs.writeFile('./data/airfares.json', JSON.stringify(airfares), 'utf8', (err) => {
		if (err) console.log('Error writing file : ' + err);
		// else console.log("File is written successfully !");
	});
	res.status(200).json(airfares);
});

app.listen(8000, () => {
	console.log('API server on http://localhost:8000')
});