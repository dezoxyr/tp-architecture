
const loadUserVols = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/volsuser", false);
    xhttp.send();

    const billets = JSON.parse(xhttp.responseText);
	// On récupère les billets de l'utilisateut depuis la page ou ils sont déposé
    for (let b of billets) {
        const x = `
            <div>
                <div>
                    <div>
                        <h5>${b.billet}</h5>

                    </div>
                </div>
            </div>
        `

        document.getElementById('billetsuti').innerHTML = document.getElementById('billetsuti').innerHTML + x;
    }
}

const loadVols = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/vols", false);
    xhttp.send();
	// ON recupère les différents vols existant qui sont enregistré sur une mage en ligne
    const billets = JSON.parse(xhttp.responseText);

    for (let b of billets.results) {
        const x = `
            <div>
                <div>
                    <div>
                        <h5>${b.billet}</h5>

                    </div>
                </div>
            </div>
        `

        document.getElementById('billets').innerHTML = document.getElementById('billets').innerHTML + x;
    }
}


// Ces deux fonctions sont executées lors de l'ouverture de la page du site 
loadUserVols();
loadVols();