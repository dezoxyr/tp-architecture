Problématique: un visiteur veut voir les billets d'avions disponibles, en réserver et voir ses réservations

Solution une interface visuelle ou l'utilisateur choisit s'il veut réserver un billet ou voir les billets qu'il a à sa disposition

Les contraintes: il ne doit voir que les billets disponibles

Fonctionnement : nous allons utiliser une interface en js à l'aide du html

Résultat : nous avons une liaison client/serveur correcte avec les vols s'affichant à un prix donné et le client peut sélectionner son ticket à réserver, voir les tickets réservés et en faire une recherche

Architecture:
- Toutes les pages: possiblité de se connecter à son compte et de revenir à l'accueil avec les boutons du header.

- Accueil : nous arrivons directement sur la page permettant de voir les billets disponibles accompagné de leurs informations, lors de la réservation il faut alors se connecter ou s'inscrire.

- Inscription/connexion : page d'inscription dans laquelle on rentre le nom, prénom et le mail pour voir les réservations qui y correspondent afin d'avoir plus d'informations dessus ou les supprimer.

- Tickets réservés : page avec la liste des billets réservés pour le compte qui est actuellement connecté, il a accès aux informations sur le vol et la possibilité de les annuler.
