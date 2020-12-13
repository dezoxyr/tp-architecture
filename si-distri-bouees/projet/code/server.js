const express = require('express');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const fs = require('fs');
const app = express();
const port = 3000;

const Database = require('./database');
const db = new Database();

// Moteur de rendu EJS
app.set('view engine', 'ejs');

// Formattage des formulaires envoyés par le client
app.use(bodyparser.urlencoded({ extended: false }));
// Formattage des données envoyées en JSON
app.use(bodyparser.json());
// Récupération des cookies de la requête HTTP
app.use(cookieParser());

// GET: Liste des vols
app.get('/', (req, res) => {
    // Si l'utilisateur n'est pas connecté, ...
    if (!req.cookies.id) {
        // On le redirige vers la page de connexion
        res.redirect('/login');
        return;
    }
    
    // Sinon, on construit la liste des vols
    res.render(__dirname+'/index.ejs', {
        travels: db.travels.get({})
    });
});

// GET: Page de connexion
app.get('/login', (req, res) => {
    // Rendu de la page de connexion login.ejs
    res.render(__dirname+'/login.ejs');
});

// POST: Entrée du formulaire de connexion
app.post('/login', (req, res) => {
    // Vérification de l'existence de l'utilisateur
    let u = db.users.get({ username: req.body.username, password: req.body.password });
    if (u.length != 1) {
        res.render(__dirname+'/login.ejs', {
            cities: db.cities.get({}),
            travels: db.travels.get({})
        });
        return;
    }
    // Cookie pour identifier l'utilisateur
    res.cookie('id', u[0].id);
    // Redirection vers la liste des vols
    res.redirect('/');
});

// GET: Déconnexion
app.get('/logout', (req, res) => {
    // Suppression du coookie d'identification puis redirection vers la page de connexion
    res.clearCookie('id');
    res.redirect('/login');
})

// GET: Création de compte
app.get('/signup', (req,res) =>{
    // Rendu de la page signup.ejs
    res.render(__dirname+'/signup.ejs');
});

// POST: Entrée du formulaire de créationde compte
app.post('/signup', (req,res) => {
    // Vérification des entrées
    if (!req.body.username || !req.body.password) {
        res.sendStatus(400);
        return;
    }
    // Création de l'utilisateur
    db.users.insert({ username: req.body.username, password: req.body.password});
    res.redirect('/login');
});

// POST: Réservation d'un billet
app.post('/reserve', (req, res) => {
    // Vérification et récupération du vol
    let t = db.travels.get({ id: parseInt(req.body.id) });
    if (t.length != 1) {
        res.sendStatus(400);
        return;
    }
    // Vérification de l'existence de  l'utilisateur
    let u = db.users.get({ id: parseInt(req.cookies.id) });
    if (u.length != 1) {
        res.sendStatus(403);
        return;
    }

    t = t[0];
    u = u[0];

    // Réservation du billet
    db.insertBooking(u.id, t);
    res.sendStatus(200);
});

// GET: Liste des réservations de l'utilisateur connecté
app.get('/reservation', (req, res) => {
    // Si l'utilisateur n'est pas connecté, ...
    if (!req.cookies.id) {
        // On le redirige vers la page de connexion
        res.redirect('/login');
        return;
    }

    // Sinon, on construit de la page des réservations reservation.ejs
    res.render(__dirname+'/reservation.ejs', {
        bookings: db.booking.get({ user: parseInt(req.cookies.id) })
    });
    
});

// POST: Supprime une réservation de l'utiliateur connecté
app.post('/unreserve', (req, res) => {
    let id = req.body.id;

    // Vérification de l'existence de l'utilisateur
    let u = db.users.get({ id: parseInt(req.cookies.id) });
    if (u.length != 1) {
        res.sendStatus(403);    // Forbidden
        return;
    }

    u = u[0];
    // Suppression de la réservation
    db.booking.delete({ id: parseInt(id) });
    res.sendStatus(200);    // OK
});

// Route par défaut: récupère le fichier suivant le chemin de l'URL
app.use((req, res) => {
    let url = new URL(req.url, 'http://localhost:3000');
    fs.readFile(__dirname+url.pathname, (err, data) => {
        if (err) {
            res.sendStatus(404);
            res.end();
        }
        res.end(data);
    })
})

// Démarrage du serveur
app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
});
