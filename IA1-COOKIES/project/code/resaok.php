<?php session_start(); ?>
<!DOCTYPE html>
<html>
<meta charset="utf-8">
<link rel="stylesheet" href="style.css" />
    <header>
    <h1 class="titre">MAC AIR</h1>
</header>
<br>
    <head>
       <center> <title>Page de traitement</title>
        <meta charset="utf-8"></center>
    </head>
    <center><body>
        <h1>Bravo vous avez reservez !</h1>
        
        <?php
           
        
            echo 'Votre reservation est : ' .$_POST["resa"].'<br>';
            file_put_contents('VotreHistorique.txt', $_POST["resa"]." | ",FILE_APPEND);

            
                
        ?>
        </div>
        <br>
    
        <center><a href="page.html">Retour à l'accueil</a></center>
    </body></center>
</html>