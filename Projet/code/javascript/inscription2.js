function ajaxPost(url, data, callback, isJson) {
    var req = new XMLHttpRequest();
    req.open("POST", url);
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
    if (isJson) {
        req.setRequestHeader("Content-Type", "application/json");
        data = JSON.stringify(data);
    }
    req.send(data);
}

var form = document.querySelector("form");
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var user = {
        "mail": data.get('mail'),
        "mdp": data.get('password')
    };
    ajaxPost("./php/nouvelutilisateur.php", user,
    function (reponse) {
        console.log("Le nouvel utilisateur a été envoyé au serveur");
    },
    true);
    console.log("Réponse Enregistrée !");

    location.replace("./inscriptionOuConnection.html");
    var Elmt = document.getElementById('hachein');
    var newElmt = document.createElement("tr");
    newElmt.innerHTML = "<td style = 'color:green'> Inscription Réussie ! </td><br>" ;
});













