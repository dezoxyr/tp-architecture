const express = require('express')
const app = express()

const bdd = require('./bdd.json')

app.get('/bdd', (req,res) => {
    res.status(200).json(bdd)
})

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/bdd/:id', (req,res) => {
    const id = parseInt(req.params.id)
    const aeroport = bdd.find(bdd => bdd.id === id)
    res.status(200).json(bdd)
})

app.post('/bdd', (req,res) => {
    bdd.push(req.body)
    res.status(200).json(bdd)
})



app.put('/bdd/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let bdd = bdd.find(bdd => bdd.id === id)
    bdd.code_depart =req.body.code_depart,
    bdd.nom_depart =req.body.nom_depart,
    bdd.code_arrivee =req.body.code_arrivee,
    bdd.nom_arrivee =req.body.nom_arrivee,
    bdd.prix =req.body.prix

    res.status(200).json(parking)
})

app.delete('/bdd/:id', (req,res) => {
    const id = parseInt(req.params.id)
    let bdd = bdd.find(bdd => bdd.id === id)
    bdd.splice(bdd.indexOf(bdd),1)
    res.status(200).json(bdd)
})



app.listen(8080, () => {
    console.log("Serveur à l'écoute")
})

