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
// L'url du fichier json contenant les vols

app.use(cors()); 

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

  app.all('/', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // Changement des procedures de sécurité pour acceder aux sites
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    next()
  });
  
app.post('/billet', (req, res, next) => {
    const billet = req.body;

    console.log(billet); // POST fonction pour enregistrer des billets de l'utilisateur
    billets.push(billet);

    res.send('Billet is added to the database, please refresh your flight page to update the list');
});

app.get('/volsuser', (req, res, next) => {
    res.json(billets);  // On store les billets de l'utilisateur sur une page en ligne
});

app.get('/vols', (req, res, next) => {

	let settings = { method: "Get" };
	fetch(url, settings)
		.then(res => res.json())
		.then((json) => {		// On recupere le fichier json et on le mets sur une page en ligne pour qu'il soit récupéré par un form html
			res.send(json)
		});
});

app.listen(port, () => console.log(`App listening on port ${port}!`)); // On montre à l'utilisateur que l'api est lancée
