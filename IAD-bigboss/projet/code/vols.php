<?php require_once("haut.php"); ?>



<?php

$fichier_vol = file_get_contents("data_vols.json");
$data_vols = json_decode($fichier_vol);

$reservations_vol = file_get_contents("reservations.json");
$reservations = json_decode($reservations_vol);

$i = 0;
$indice = 0;


if(!empty($_POST)){

    if(empty($current_client)){

        $message10 = "Pour réserver un vol il faut vous connecter à votre compte !";
    
    }else{

        if(empty($_POST['id_vol'])){

            $message11 = "Veuillez indiquer un numéro de vol !";
        
        }else{

            while($i < count($data_vols)){

                if($data_vols[$i]->vol_id == $_POST['id_vol']){

                    $cur_date_vol = $data_vols[$i]->date_vol;
                    $cur_date_reserv = date('l jS \of F Y h:i:s A');
                    $cur_aeroport = $data_vols[$i]->aeroport;
                    $cur_destination = $data_vols[$i]->destination;
                    $cur_prix = $data_vols[$i]->prix;
                    
                    $new_reservation = array('email' => $current_client,'vol_id' => $_POST['id_vol'], 'date_vol' => $cur_date_vol, 'date_reserv' => $cur_date_reserv,'aeroport' => $cur_aeroport, 'destination' => $cur_destination, 'prix' => $cur_prix);
                    array_push($reservations, $new_reservation);
                    file_put_contents("reservations.json", json_encode($reservations));

                    $message13 = "Réservation réalisée avec succès ! ^^";

                    $indice = 1;

                    $data_vols[$i]->place_dispo = $data_vols[$i]->place_dispo -1;
                    file_put_contents("data_vols.json", json_encode($data_vols));

                }

                $i = $i +1;            
            }

            if($indice == 0){

                $message11 = "Vous devez rentrer un numéro de vol existant dans la liste !";
            }
        }
    }
}


if(isset($message10)){
            
    echo "<div class='erreur'>$message10</div><br>";

}

if(isset($message11)){

    echo "<div class='erreur'>$message11</div><br>";

}

if(isset($message11)){

    echo "<div class='erreur'>$message12</div><br>";
}

if(isset($message13)){

    echo "<div class='validation'>$message13</div><br>";

}

echo "<form method='post' action=''>";

echo "<label for='id'>N°vol</label><br>";
echo "<input type='number' id='id' name='id_vol' placeholder=0000><br><br>";
echo "<input type='submit' value='Ajouter Réservation'>";

echo "</form>";


$fichier_vol = file_get_contents("data_vols.json");
$data_vols = json_decode($fichier_vol);

$i = 0;


while($data_vols[$i]->vol_id != 0){

    $cur_vol = $data_vols[$i]->vol_id;
    $cur_place_dispo = $data_vols[$i]->place_dispo;
    $cur_date_vol = $data_vols[$i]->date_vol;
    $cur_aeroport = $data_vols[$i]->aeroport;
    $cur_destination = $data_vols[$i]->destination;
    $cur_prix = $data_vols[$i]->prix;

    if($cur_place_dispo != 0){

        echo "<h3>Vol $cur_vol</h3>";
        echo "<d>Ticket restants   : </d><c>$cur_place_dispo</c><br>"; 
        echo "<d>Horaire de départ : </d><c>$cur_date_vol</c><br>"; 
        echo "<d>Aéroport          : </d><c>$cur_aeroport</c><br>"; 
        echo "<d>En direction de   : </d><c>$cur_destination</c><br>"; 
        echo "<d>Prix du Ticket    : </d><c>$cur_prix</c><br>"; 
    }

    $i = $i +1;

}

?>          

<?php
echo date('l jS \of F Y h:i:s A');
?>

<?php require_once("bas.php"); ?>



        
