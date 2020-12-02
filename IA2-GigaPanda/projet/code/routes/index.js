const express = require('express');

const router = express.Router();

/*const userRoutes = require('./routes/vol'); //consulter la liste des vols

const userRoutes = require('./routes/billet'); 
const userRoutes = require('./routes/aeroport');
const userRoutes = require('./routes/reservation');
*/

/*
- aeroports
- billets
- users : OK
- vols
- reservations*/


router.get('/', (req, res, next) => {
    
    res.send("GigaPanda Index");

    /*res.render('airport/index', { 
        title: 'La faille de la Galerie'
    });*/
});

/*router.post('/reservation', (req, res, next) => {
    //req

    res.send("GigaPanda Done");
});

router.get('/', (req, res, next) => {
    
    res.send("GigaPanda");
});*/



module.exports = router;