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

if (isset($_POST["liste_billets"]) && isset($_POST["client"])){
	$liste_billets = $_POST["liste_billets"];
	$recup_client = $_POST["client"];
	$client = new Client($recup_client[0]);
	forEach($recup_client[1] as $v){
		$client->add_billet($liste_billets[$v]);
	}
	echo json_encode(billets_achetes($client, $liste_billets));
}

?>