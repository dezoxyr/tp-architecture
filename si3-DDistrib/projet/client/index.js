const express = require('express');
const fetch   = require('node-fetch');

const app = express();

app.use(express.static('public'));

app.get('/home', (req, res) => {
	res.send('welcome to home');
});

function logInfo(str){
	console.log("[ INFO ] CLIENT CONNECTED TO : " + str);
}

app.get('/client/:email', async (req, res) => {
	logInfo('/client/' + req.params.email);
	const url = "http://localhost:8000/client/" + req.params.email;
	const fetch_response = await fetch(url);
	const json = await fetch_response.json();
	res.json(json);
});

app.get('/Flights', async (req, res) => {
	logInfo('Flights')
	const url = "http://localhost:8000/Flights";
	const fetch_response = await fetch(url);
	const json = await fetch_response.json();
	res.json(json);
});

app.get('/myFlights/:id', async (req, res) => {
	logInfo("/myFlights/" + req.params.id);
	const url = "http://localhost:8000/myFlights/" + req.params.id;
	const fetch_response = await fetch(url);
	const json = await fetch_response.json();
	res.json(json);
})

app.get('/Airfares', async (req, res) => {
	logInfo('/Airfares');
	const url = "http://localhost:8000/Airfares";
	const fetch_response = await fetch(url);
	const json = await fetch_response.json();
	res.json(json);
})

app.post('/myFlights/:idFlight&:idClient', async (req, res) => {
	logInfo("/myFlight/" + req.params.idFlight + "&" + req.params.idClient);
	const url = "http://localhost:8000/myFlights/" + req.params.idFlight + "&" + req.params.idClient;
	const fetch_response = await fetch(url, { method: 'POST' });
	const json = await fetch_response.json();
	res.json(json);
});

app.listen(80, (req, res) => {
	console.log("client server on http://localhost:80")
});