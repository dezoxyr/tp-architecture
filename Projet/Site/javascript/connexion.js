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

var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
	e.preventDefault();
	var data = new FormData(form);
	ajaxGet("./data/Utilisateurs.json", function (reponse) {
        var succeed = false;
		var all = JSON.parse(reponse);
        all.forEach(function(user){
            if ((data.get('mail') == user.mail)&&(data.get('password')==user.mdp)) {
                    succeed = true;
                    location.replace("./reservation.html");
            }
        });
        if (!succeed) {
            var divelt = document.getElementById('div');
            var ligneElmt = document.createElement("tr");
            ligneElmt.innerHTML = "<td><p  style='color: red'> Vos identifiants sont incorrects</p></td><br>" ;
            divelt.appendChild(ligneElmt);
        }
	});
});















