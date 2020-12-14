const cors = require('cors');
const joi = require('joi');


const client_schema = joi.object().keys({
    prenom: joi.string(),
    nom: joi.string(),
    mail: joi.string().email().required()

});

const reservation_schema = joi.object().keys({
    prenom: joi.string(),
    nom: joi.string(),
    mail: joi.string().email().required(),
    id_vol: joi.number().min(0).required()
});



const express = require('express');
const app = express();


const AEROPORT = [
    {
        id_aeroport: 1,
        code: "JFK",
        ville: "New-York"
    },
    {
        id_aeroport: 2,
        code: "CDG",
        ville: "CDG Paris"
    },
    {
        id_aeroport: 3,
        code: "DTW",
        ville: "Detroit"
    }
];

const VOLS = [
    {
        id_vol: 1,
        prix: 550, 
        nbplace : 54,
        siege :  150,
        code_depart: 1,
        code_arrivee: 2,
        f_date : new Date(2020, 11, 24, 22, 0, 0, 0),
        date_dep: "22/12/2020 à 6h30",
        date_arr: "23/12/2020 à 12h10",
    },
    {
        id_vol: 2,
        prix: 674, 
        nbplace : 52,
        siege :  150,
        code_depart: 2,
        code_arrivee: 1,
        f_date : new Date(2020, 11, 24, 23, 0, 0, 0),
        date_dep: "23/12/2020 à 12h10",
        date_arr: "24/12/2020 à 5h30",
    },
    {
        id_vol: 3,
        prix: 490, 
        nbplace : 81,
        siege :  150,
        code_depart: 1,
        code_arrivee: 3,
        f_date : new Date(2020, 11, 24, 23, 0, 0, 0),
        date_dep: "28/12/2020 à 19h45",
        date_arr: "29/12/2020 à 16h14",
    },
    {
        id_vol: 4,
        prix: 299, 
        nbplace : 89,
        siege :  150,
        code_depart: 3,
        code_arrivee: 1,
        f_date : new Date(2020, 11, 24, 23, 0, 0, 0),
        date_dep: "02/01/2021 à 11h15",
        date_arr: "02/01/2021 à 23h55",
    },
    {
        id_vol: 5,
        prix: 780, 
        nbplace : 102,
        siege :  150,
        code_depart: 2,
        code_arrivee: 3,
        f_date : new Date(2020, 11, 24, 23, 0, 0, 0),
        date_dep: "10/01/2021 à 1h15",
        date_arr: "11/01/2021 à 9h15",
    },
    {
        id_vol: 6,
        prix: 802, 
        nbplace : 104,
        siege :  150,
        code_depart: 3,
        code_arrivee: 2,
        f_date : new Date(2020, 11, 24, 23, 0, 0, 0),
        date_dep: "02/02/2021 à 5h05",
        date_arr: "03/02/2021 à 8h30",
    }
];
const CLIENTS = [];
const RESERVATION = [];


let CLIENTS_INDEX = CLIENTS.length;
let RESERVATION_INDEX = RESERVATION.length;

function retrieveUserByMail(mail) {
    return CLIENTS.find(client => client.mail === mail);
}

// Middleware
app.use(express.json());
app.use(cors());

//Récupérer utilisateur
app.get('/clients', (req,res) => {
    const input = client_schema.validate(req.query);

    if (!input.error) {
        const mail = input.value.mail;

        const client = retrieveUserByMail(mail);
        if (client != null) {
            res.status(200).json(client);
        } else {
            res.status(404).send("User not found");
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }
});

app.post('/clients', (req, res) => {
    const input = client_schema.validate(req.body);

    if (!input.error) {
        const mail = input.value.mail;
        const client = retrieveUserByMail(mail);

        if (client == null) {
            CLIENTS.push({
                id_client: ++CLIENTS_INDEX,
                ...input.value
                
            });

            res.status(201).send();
        } else {
            res.status(409).send(" ");
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }

});
app.post('/reservation', (req, res) => {
    const reservation_input = reservation_schema.validate(req.body)
    if (reservation_input.error) {
        res.status(400).send(reservation_input.error.details[0].message);
    } 
    const id_vol = reservation_input.value.id_vol;
    const client_mail = reservation_input.value.mail;
    const client = CLIENTS.find(f => f.mail === client_mail);
    if (client == null) {
        res.status(404).send(" ");
    }
    const reservation_date = new Date();
    const vol = VOLS
                    .find(f => f.id_vol === id_vol && f.f_date.getTime() >= reservation_date.getTime() && f.nbplace > 0);
    RESERVATION.push({
        id_vol : vol.id_vol,
        id_reservation: ++RESERVATION_INDEX,
        id_client: client.id_client,
        reservation_date: reservation_date
    });

    vol.nbplace -= 1
    res.status(200).send();
});

app.get('/reservation', (req, res) => {
    const input = client_schema.validate(req.query);

    if (!input.error) {
        const mail = input.value.mail;
        const client = retrieveUserByMail(mail);
        
        if (client != null) {
            const reservation = RESERVATION
                             .filter(b => b.id_client === client.id_client)
                             .map(e => ({
                                vol: VOLS.find(f => f.id_vol === e.id_vol)
                            })).filter(i => i.vol.f_date.getTime() >= new Date().getTime());

            let ret = []
            reservation.forEach(e => {
                ret.push({
                    aeroport_provenance : AEROPORT.find(i => i.id_aeroport === e.vol.code_depart),
                    aeroport_destination : AEROPORT.find(i => i.id_aeroport === e.vol.code_arrivee),
                    f_date: e.vol.f_date,
                    date_dep: e.vol.date_dep,
                    date_arr: e.vol.date_arr,
                    siege: e.vol.siege,
                    prix : e.vol.prix
                })
            });
            res.status(200).send(ret);
        } else {
            res.status(404).send("User not found");
        }
    }else{
        res.status(400).send(input.error.details[0].message);
    }
    
    
});

app.get('/vols', (req, res) => {
    const vols = VOLS
                    .filter(f => f.f_date.getTime() >= new Date().getTime())
                    .map(f => ({
                        provenance_aeroport: AEROPORT.find(a => a.id_aeroport == f.code_depart),
                        destination_aeroport: AEROPORT.find(a => a.id_aeroport == f.code_arrivee),
                        f_date : f.f_date,
                        date_dep : f.date_dep,
                        date_arr : f.date_arr,
                        prix: f.prix,
                        siege: f.siege,
                        nbplace: f.nbplace,
                        id: f.id_vol
                    }));
    res.status(200).json(vols);
})

app.listen(8000, () => {
    console.log("Server listening on port 8000");
});