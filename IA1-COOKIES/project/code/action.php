<?php session_start(); ?>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<link rel="stylesheet" href="style.css" />
    <header>
    <center><h1 class="titre">MAC AIR</h1></center>
</header>
<br>
    <head>
       <center> <title>Page de traitement</title>
        <meta charset="utf-8"></center>
    </head>
    <body>
        <center><p>Dans le formulaire précédent, vous avez fourni les
        informations suivantes :</p><center>
        <div class="destinations-group">
        <?php
            echo 'Email: ' .$_POST["email"].'<br>';
            echo 'Départ: ' .$_POST["provenance"].'<br>';
            echo 'Arrivée: ' .$_POST["arrivee"].'<br>';
            echo 'Date de départ: ' .$_POST["depart"].'<br>';
            echo 'Date de retour: ' .$_POST["retour"].'<br>';
            echo 'Nombre Adulte: ' .$_POST["adultes"].'<br>';
            echo 'Nombre Enfant: ' .$_POST["enfants"].'<br>';
            echo 'Nombre Enfant: ' .$_POST["type"].'<br>';

            file_put_contents('VotreHistorique.txt', $_POST["email"]." | ",FILE_APPEND);
            file_put_contents('VotreHistorique.txt', $_POST["adultes"]." | ",FILE_APPEND);
            file_put_contents('VotreHistorique.txt', $_POST["enfants"]." | ",FILE_APPEND);
            file_put_contents('VotreHistorique.txt', $_POST["type"]." | ",FILE_APPEND);

            echo '<br>';

            if($_POST["provenance"]=="Paris" && $_POST["arrivee"]=="Détroit"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 1200€".'<br>';
                echo " Le 30/01/2021 pour  1200€".'<br>';
                echo " Le 28/01/2021 pour  1200€".'<br>';
                file_put_contents('VotreHistorique.txt', ' CDG-DTW |',FILE_APPEND);
                echo'<center><a href="resaPD.html">Reserver un de ces vols</a></center>';}

            if($_POST["provenance"]=="Paris" && $_POST["arrivee"]=="New-York"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 300€".'<br>';
                echo " Le 30/01/2021 pour  300€".'<br>';
                echo " Le 28/01/2021 pour  300€".'<br>';
                file_put_contents('VotreHistorique.txt', ' CDG-JFK |',FILE_APPEND);
                echo' <center><a href="resaPN.html">Reserver un de ces vols</a></center>';}

            if($_POST["provenance"]=="Détroit" && $_POST["arrivee"]=="New-York"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 300€".'<br>';
                echo " Le 30/01/2021 pour  300€".'<br>';
                echo " Le 28/01/2021 pour  300€".'<br>';
                file_put_contents('VotreHistorique.txt', ' DTW-JFK |',FILE_APPEND);
                echo'<center><a href="resaDN.html">Reserver un de ces vols</a></center>';}

            if($_POST["provenance"]=="Détroit" && $_POST["arrivee"]=="Paris"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 80 €".'<br>';
                echo " Le 30/01/2021 pour  80€".'<br>';
                file_put_contents('VotreHistorique.txt', ' DTW-CDG |',FILE_APPEND);
                echo " Le 28/01/2021 pour  80€".'<br>';

                echo'<center><a href="resaDP.html">Reserver un de ces vols</a></center>';}

            if($_POST["provenance"]=="New-York" && $_POST["arrivee"]=="Paris"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 80€".'<br>';
                echo " Le 15/02/2021 pour 80€".'<br>';
                echo " Le 28/01/2021 pour 80€".'<br>';
                file_put_contents('VotreHistorique.txt', ' JFK-CDG |',FILE_APPEND);
                echo'<center><a href="resaNP.html">Reserver un de ces vols</a></center>';}

            if($_POST["provenance"]=="New-York" && $_POST["arrivee"]=="Détroit"){
                echo "Il y a trois vols disponibles".'<br>';
                echo " Le 24/01/2021 pour 1200€".'<br>';
                echo " Le 30/01/2021 pour  1200€".'<br>';
                echo " Le 28/01/2021 pour  1200€".'<br>';
                file_put_contents('VotreHistorique.txt', ' JFK-DTW |',FILE_APPEND);
                echo'<center><a href="resaND.html">Reserver un de ces vols</a></center>';}

            
                
        ?>
        </div>
    </body>
</html>