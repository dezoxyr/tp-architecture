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
    let username = req.body.username;
    let password = req.body.password;

    console.log('Got body:', req.body);
    //res.sendStatus(200);
    console.log(username);
    console.log(password);
    //res.json({firstname:firstname, lastname:lastname});
    res.render('airport/index', {
        title: 'Airport',
        username: username,
        password: password
    })
});


router.post('/signin/panda', (req, res, next) => {
    console.log(req);
    let username = req.query.username;
    let password = req.query.password;

    console.log(req.body);



    //res.json({firstname:firstname, lastname:lastname});
    res.render('airport/index', {
        title: 'Airport',
        username: username,
        password: password
    })
});

module.exports = router;