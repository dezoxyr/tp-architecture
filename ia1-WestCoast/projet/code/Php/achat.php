<?php
include 'classe.php';

function acheter_indice($client, $billet){
	if (!in_array($billet, $client->get_liste()))
	{
    	$client->add_billet($billet);
	}
}

$tab = $_POST["client"];
$tab = json_decode("$tab",true);
$client = new Client($tab[0]);

foreach ($tab[1] as $b) {
    $client->add_billet($b);
}

$billet = $_POST["nouveau"];

acheter_indice($client, $billet);
echo json_encode($client);
?>