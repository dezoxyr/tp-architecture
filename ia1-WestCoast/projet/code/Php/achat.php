<?php
include 'classe.php';
function acheter_billet($client, $billet){
	if (!in_array($billet->get_indice(), $client->get_liste()))
	{
    	$client->add_billet($billet->get_indice());
	}
}

function acheter_indice($client, $billet){
	if (!in_array($billet, $client->get_liste()))
	{
    	$client->add_billet($billet);
	}
}

$liste_billets = creer_billets($aeroports);
//var_dump($listes_billets);
$client = new Client("florent");
acheter_billet($client, $liste_billets[2]);
acheter_billet($client, $liste_billets[3]);
acheter_billet($client, $liste_billets[3]);
echo json_encode($liste_billets);
//echo json_encode($client);
//var_dump($client);
//echo json_encode(billets_achetes($client, $liste_billets));
//var_dump(billets_achetes($client, $liste_billets));
?>