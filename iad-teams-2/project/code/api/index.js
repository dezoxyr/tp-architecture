const express = require('express');
const app = express();
const vols = require('/home/joseph/Bureau/tp-architecture/iad-teams-2/project/code/reservation.json');


app.get('/reservation', (req,res) =>{
    res.status(200).json(vols);
});

app.listen(3000, () =>{
    console.log('Server listen: 3000...')
});