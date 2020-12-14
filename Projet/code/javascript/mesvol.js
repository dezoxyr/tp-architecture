function ajaxGet(url, callback) {
    var req = new XMLHttpRequest();
    req.open("GET", url);
    req.addEventListener("load", function () {
        if (req.status >= 200 && req.status < 400) {
            callback(req.responseText);
        } else {
            console.error(req.status + " " + req.statusText + " " + url);
        }
    });
    req.addEventListener("error", function () {
        console.error("Erreur réseau avec l'URL " + url);
    });
    req.send(null);
}

function SetPrice(depart, arrivee) {
    finalPrice = 0;
    if ((depart == "JFK") && (arrivee == "CDG")) {
        finalPrice = 550;
    }
    if ((depart == "JFK") && (arrivee == "DTW")) {
        finalPrice = 119;
    }
    if ((depart == "CDG") && (arrivee == "DTW")) {
        finalPrice = 420;
    }
    if ((depart == "CDG") && (arrivee == "JFK")) {
        finalPrice = 650;
    }
    if ((depart == "DTW") && (arrivee == "CDG")) {
        finalPrice = 330;
    }
    if ((depart == "DTW") && (arrivee == "JFK")) {
        finalPrice = 99;
    }
    if ((depart == "JFK") && (arrivee == "JFK")) {
        finalPrice = 0;
    }
    if ((depart == "CDG") && (arrivee == "CDG")) {
        finalPrice = 0;
    }
    if ((depart == "DTW") && (arrivee == "DTW")) {
        finalPrice = 0;
    }
    return finalPrice;
}

var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
	e.preventDefault();
	var data = new FormData(form);
	ajaxGet("./data/Billets.json", function (reponse) {
		var vols = JSON.parse(reponse);
		var volsElmt = document.getElementById("vols");
		vols.forEach(function (vol) {
			if (data.get('mail') == vol.mail) {
				var ligneElmt = document.createElement("tr");
                var tarif = SetPrice(vol.Depart, vol.Arrivee);
				ligneElmt.innerHTML = "<td class='printvol'>" + vol.Depart + "-" + vol.Arrivee + "-" + tarif + "€</td><br>" ;
				volsElmt.appendChild(ligneElmt);
			}
		});
	});
});














