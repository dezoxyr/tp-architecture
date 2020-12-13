<?php

    $clients = file_get_contents("mon_fichier.json");
    $data_clients = json_decode($clients);

    #echo strlen($data_vols);
    $i = 0;

    while($i < count($data_clients)){

        if($data_clients[$i]->connected == 'true'){

            $data_clients[$i]->connected = 'false';
            file_put_contents("mon_fichier.json", json_encode($data_clients));
        }

        $i = $i +1;
    }


?>

<?php require_once("haut.php"); ?>

    <h1>Redirection : Vous pouvez naviger dans l'onglet de votre choix</h1>

<?php require_once("bas.php"); ?>