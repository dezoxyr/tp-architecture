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
    
    //res.send("GigaPanda Index");

    res.render('airport/welcome', { 
        title: 'Welcome'
    });
    //res.render('users/signin', { 
       // title: 'La faille de la Galerie'
   // });
});

router.get('/airport/:firstname&:lastname', (req, res, next) => {
    
    //res.send("GigaPanda Index");

    res.render('airport/index', { 
        title: 'MegaPanda Flights',
        firstname: req.params.firstname,
        lastname: req.params.lastname
    });
    //res.render('users/signin', { 
       // title: 'La faille de la Galerie'
   // });
});

router.get('/airport/:id', (req, res, next) => {
    
    //res.send("GigaPanda Index");

    res.render('airport/index', { 
        title: 'MegaPanda Flights',
        firstname: req.params.firstname,
        lastname: req.params.lastname
    });
    //res.render('users/signin', { 
       // title: 'La faille de la Galerie'
   // });
});


router.post('/airport', (req, res, next) => {
    console.log(req.body)
    console.log(req.params)

    //return res.redirect('/user/billet'+req.body.firstname+'&'+req.body.lastname);
    return res.redirect('/user/billet');
});

/*router.post('/reservation', (req, res, next) => {
    //req

    res.send("GigaPanda Done");
});

router.get('/', (req, res, next) => {
    
    res.send("GigaPanda");
});*/



module.exports = router;