var form = document.querySelector("form");
// Gestion de la soumission du formulaire
form.addEventListener("submit", function (e) {
    e.preventDefault();
    var data = new FormData(form);
    var vol = {
        "mail": data.get('mail'),
        "Depart": data.get('Depart'),
        "Arrivee": data.get('Arrivee')
    };
    ajaxPost("./php/reservation.php", vol,
    function (reponse) {
        console.log("Le vol a été envoyé au serveur");
    },
    true);

    console.log("Réponse Enregistrée !");
});
