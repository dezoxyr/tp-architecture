//Access-Control-Allow-Origin=*
const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const fetch = require('node-fetch');

const app = express();
const port = 3000;

// Where we will keep flights
let billets = [];
let url = "https://raw.githubusercontent.com/Aqualio/tp-architecture/IA-Grilling/IA-Grilling/projet/billets.json";

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  
app.post('/billet', (req, res, next) => {
    const billet = req.body;

    // Output the billet to the console for debugging
    console.log(billet);
    billets.push(billet);

    res.send('Billet is added to the database, please refresh your flight page to update the list');
});

app.get('/volsuser', (req, res, next) => {
    res.json(billets); 
});

app.get('/vols', (req, res, next) => {

	let settings = { method: "Get" };
	fetch(url, settings)
		.then(res => res.json())
		.then((json) => {
			//console.log(json);
			res.send(json)
		});
});

app.listen(port, () => console.log(`App listening on port ${port}!`));
