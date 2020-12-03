<?php
include 'classe.php';
function billets_achetes($client, $liste_entiere){
	$liste_a = array();
	$liste_b = $client->get_liste();
	foreach ($liste_b as $billet) {
    	array_push($liste_a, $liste_entiere[$billet]);	
	}
	return $liste_a;
}

echo json_encode(billets_achetes($client, $liste_billets));
?>