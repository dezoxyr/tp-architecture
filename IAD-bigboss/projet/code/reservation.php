<?php require_once("haut.php"); ?>

<?php

$reservation_file = file_get_contents("reservations.json");
$reservations = json_decode($reservation_file);

$i = 0;
$indice = 0;

while($i < count($reservations)){

    if($reservations[$i]->email == $current_client){
    
        $cur_vol = $reservations[$i]->vol_id;
        $cur_date_reserv = $reservations[$i]->date_reserv;
        $cur_date_vol = $reservations[$i]->date_vol;
        $cur_aeroport = $reservations[$i]->aeroport;
        $cur_destination = $reservations[$i]->destination;
        $cur_prix = $reservations[$i]->prix;

        echo "<h3>Vol $cur_vol</h3>";
        echo "<d>Date d'achat      : </d><c>$cur_date_reserv</c><br>"; 
        echo "<d>Horaire de départ : </d><c>$cur_date_vol</c><br>"; 
        echo "<d>Aéroport          : </d><c>$cur_aeroport</c><br>"; 
        echo "<d>En direction de   : </d><c>$cur_destination</c><br>"; 
        echo "<d>Prix du Ticket    : </d><c>$cur_prix</c><br><br>"; 

        $indice = 1;
    }

    $i = $i +1;
}

?>

<?php require_once("bas.php"); ?>