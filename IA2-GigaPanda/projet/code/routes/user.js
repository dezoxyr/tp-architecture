const express = require('express');
const { route } = require('.');

const router = express.Router();

/*const userRoutes = require('./routes/vol'); //consulter la liste des vols

const userRoutes = require('./routes/billet'); 
const userRoutes = require('./routes/aeroport');
const userRoutes = require('./routes/reservation');
*/

router.get('/', (req, res, next) => {
    res.redirect("/user/signin");
});

router.get('/signin', (req, res, next) => {
    
    //res.send("GigaPanda Sign In");
    res.render('users/signin', {
        title: 'hello'
    })
});

router.post('/signin', (req, res, next) => {
    console.log(req);
    let firstname = req.body.firstname;
    let lastname = req.body.lastname;

    console.log('Got body:', req.body);
    //res.sendStatus(200);
    console.log(firstname);
    console.log(lastname);
    //res.json({firstname:firstname, lastname:lastname});
    res.render('airport/index', {
        title: 'Airport',
        firstname: firstname,
        lastname: lastname
    })
});

router.post('/signin/panda', (req, res, next) => {
    console.log(req);
    let firstname = req.query.firstname;
    let lastname = req.query.lastname;

    console.log(req.body);


    //res.json({firstname:firstname, lastname:lastname});
    res.render('airport/index', {
        title: 'Airport',
        firstname: firstname,
        lastname: lastname
    })
});

module.exports = router;