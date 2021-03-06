const express = require('express');
const { route } = require('.');

const router = express.Router();

var billets=[]
/*const userRoutes = require('./routes/vol'); //consulter la liste des vols

const userRoutes = require('./routes/billet'); 
const userRoutes = require('./routes/aeroport');
const userRoutes = require('./routes/reservation');
*/

router.get('/', (req, res, next) => {
    res.redirect("/user/signin");
});


router.get('/signin', (req, res, next) => {
    res.render('users/signin', {
        title: 'hello'
    });
});


router.post('/signin', (req, res, next) => {
    console.log(req.body);
    
    return res.redirect('/airport/'+req.body.firstname+'&'+req.body.lastname);
});


router.get('/account', (req, res, next) => {
    res.render('users/account', {
        title: 'Account',
    })
});

router.get('/mytickets/:firstname/:lastname', (req, res, next) => {
    
    const search = (array, firstname, lastname) => {
        const temp = []

        for (var i=0; i < array.length; i++) {
            if (array[i].firstname === firstname && array[i].lastname === lastname) {
                console.log(array[i])
                temp.push(array[i])
            }
        }

        return temp;
    }

    var user_tickets = search(billets, req.params.firstname, req.params.lastname);

    //console.log(user_tickets)

    res.render('users/mytickets', {
        title: 'My Tickets',
        firstname: req.params.firstname,
        lastname: req.params.lastname,
        user_tickets: user_tickets
    })
});


router.get('/billet/:id', (req, res, next) => {
    console.log(req.params.id)

    let airport = [
        {departure:'Paris', destination:'New York', code:'CDG'},
        {departure:'New York', destination:'Paris', code:'JFK'},
        {departure: 'Paris', destination:'Detroit', code:'CDG'},
        {departure: 'Detroit', destination:'Paris', code:'DTW'},
        {departure: 'Detroit', destination:'New York', code:'DTW'},
        {departure: 'New York', destination:'Detroit', code:'JFK'}
    ]
    console.log(req.query)

    billets.push({
        firstname: req.query.firstname, 
        lastname: req.query.lastname, 
        departure: airport[req.params.id-1].departure,
        destination: airport[req.params.id-1].destination,
        code: airport[req.params.id-1].code
    })

    //console.log(billets)

    res.render('users/billet', {
        title: 'Billet réservé',
        firstname: req.query.firstname,
        lastname: req.query.lastname,
        departure: airport[req.params.id-1].departure,
        destination: airport[req.params.id-1].destination,
        code: airport[req.params.id-1].code,
    })
});


module.exports = router;