<h1>Importation du projet</h1>
<p>Pour tester notre projet veuillez respecter l'arborescence définie par l'équipe sous peine de ne pas réussir à faire tourner le projet.</p>
<h1>Lancement des scripts</h1>
<h2>Pré-requis</h2>
<p>Ce projet à été complètement programmée en Python 3.9, vérifiez votre version de Python pour ne pas rencontrer de problèmes par la suite.</p>
<p>Afin de mener ce projet à bien, nous avons utilisé quelques livrairies, voici la liste non-exhaustive des librairies utilisées:</p>
<ul>
  <li>flask: Cette librairie permet de lancer un serveur web sur votre machine et de "simuler" l'API.</li>
  <li>flask_cors: Cette librairie permet d'activer le Cross-origin resource sharing (CORS) sur le serveur lancé avec flask.</li>
  <li>random: Cette librairie nous permet de générer un numéro de place alétoire pour chaque réservation.</li>
</ul>
<p>Assurez vous aussi d'être connecté à internet pour pouvoir profiter de notre interface graphique créée avec Bootstrap mais aussi pour faire les requêtes AJAX à l'API.</p>
<h2>Lancements</h2>
<p>Pour utiliser le site de réservation de billets d'avion, vous devez lancer deux scripts (pour le lancement des scripts, nous vous conseillons de les lancer avec python3 et non python pour éviter des conflits):</p>
<ul>
  <li>flightAPI.py : Ce programme permet de lancer le serveur web sur lequel est hébergée l'API (donc indispensable pour faire les requêtes depuis le site web de réservation).</li>
  <li>websiteHosting.py : Ce programme permet d'héberger le site internet de réservation de vols (normalement hébergé sur le port 8000 de votre machine).</li>
</ul>
<p>Pour accéder au site web de l'API rendez-vous à cette addresse: 127.0.0.1:5000 sur votre navigateur (il se peut que flask ait changé le port sur lequel tourne l'API, veuillez vérifier dans le terminal le port choisi par flask par défaut).</p>
<p>Pour accéder au site web de réservation de vols rendez-vous à cette addresse: 127.0.0.1:8000 sur votre navigateur (Normalement configuré sur le port 8000, si vous ne pouvez pas y accéder, changer de port peut-être que celui là était utilisé).</p>
<h1>Détails de l'interface graphique</h1>
<p>Quand vous arriverez sur le site, vous allez arriver sur cette page:</p>
<img src="/images/connexion.png">
<p>Ici nous nous sommes connecté commme l'utilisateur test@test.com</p>
<p>Ensuite vous arriverez sur cette page:</p>
<img src="/images/accueil.png">
<p>Pour réserver un vol cliquez sur le bouton "Réserver" du vol correspondant.</p>
<p>Si vous vous êtes trompé de vol, vous pouvous annuler votre réservation en cliquant sur le bouton "Annuler" du vol correspondant:</p>
<img src="/images/reservation.png">
<p>Ensuite, lorsque vous cherchez un vol, vous pouvez filtrer votre recherche avec la barre de recherche:</p>
<img src="/images/filtrage.png">
<p>Enfin, vous pouvez changer de compte en appuyant sur le bouton "Changer de compte".</p>
