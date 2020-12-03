function bookFlight(flightId) {
    var nbPassengers = document.getElementById("num-nb-passengers").value;

    // Element affichant un message de feedback sur la réservation (succès ou erreur).
    var resultMessageElement = document.getElementById("book-message");

    var bookRequest = new XMLHttpRequest();
    bookRequest.onreadystatechange = function() {
        // Si la requête est terminée...
        if (bookRequest.readyState == 4) {
            // Supprimer le bouton "Réserver".
            document.getElementById("btn-book").remove();

            // Si la requête a réussie...
            if (bookRequest.status == 200) {
                // On affiche "Votre billet a bien été réservé" à place du bouton.
                resultMessageElement.classList.add("green");
                resultMessageElement.innerHTML = "Votre billet a bien été réservé.";
            } else {
                // On indique qu'une erreur est survenue.
                resultMessageElement.classList.add("red");
                resultMessageElement.innerHTML = "⚠ Une erreur est survenue lors de la réservation de votre billet. Réessayez plus tard.";
            }
        }
    };

    // On initialise et envoie la requête.
    bookRequest.open("POST", "/api/flights/" + flightId + "/book", true);
    bookRequest.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    bookRequest.send("nbPassengers=" + nbPassengers);
}