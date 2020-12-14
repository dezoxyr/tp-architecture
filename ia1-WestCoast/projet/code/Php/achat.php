<?php
include 'classe.php';

function acheter_indice($client, $billet){
	if (!in_array($billet, $client->get_liste()))
	{
    	$client->add_billet($billet);
	}
}
$data = [];
$data["return"] = 1;
$tab = $_POST["client"];
$tab = json_decode("$tab",true);
$client = [];
$client["nom"]= $tab[0];
$client["liste_billets"] = [];
foreach ($tab[1] as $b) {
    array_push($client["liste_billets"],$b);
}
$liste_billets = $_POST["liste"];
$liste_billets = json_decode("$liste_billets",true);
$billet = $_POST["nouveau"];
if ($liste_billets[$billet]["nbPlace"] > 0){
	$client["chgt"] = $liste_billets[$billet]["nbPlace"] - 1;
}
array_push($client["liste_billets"],$billet);

echo json_encode($client);
?>