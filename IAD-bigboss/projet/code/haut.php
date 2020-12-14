<?php

    $clients = file_get_contents("mon_fichier.json");
    $data_clients = json_decode($clients);

    #echo strlen($data_vols);
    $i = 0;
    $index = 0;
    $current_client;

    while($i < count($data_clients)){

        if($data_clients[$i]->connected == "true"){

            $message1 = "Bienvenue à toi " . $data_clients[$i]->email;
            $index = $i;
            $current_client = $data_clients[$i]->email;
            $i = count($data_clients);
        }

        $i = $i +1;
    }


?>

<!Doctype html>
<html>
    <head>
        <title>Mon Site</title>
        <link rel="stylesheet" href="css/style.css">
    </head>
    <body>    
        <header>
            <div class="conteneur">
                <div>
                    <a href="" title="Mon Site"><h1>Air BigBoss</h1></a>
                </div>
                <nav>

                <?php
                    
                    if(isset($message1)){

                        echo "<a href='reservation.php'>Mes Réservations</a>";
                        echo "<b> - </b>";
                        echo "<a href='index.php'>Déconnexion</a>";
                        echo "<b> - </b>";
                        echo "<a href='vols.php'>Les Vols Disponibles</a>";
                        echo "<h2>$message1</h2>";
                        

                    }else{

                        echo "<a href='inscription.php'>Inscription</a>";
                        echo "<b> - </b>";
                        echo "<a href='connexion.php'>Connexion</a>";
                        echo "<b> - </b>";
                        echo "<a href='vols.php'>Les Vols Disponibles</a>";
                    }

                ?>
                
            </div>

        </header>

        <section>
            <div class="conteneur"></div>
        


