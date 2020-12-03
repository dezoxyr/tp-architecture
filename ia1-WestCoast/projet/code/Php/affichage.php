<?php
include'classe.php';
function creer_billets($aeroports){
	$liste_billets = array();
	for ($i = 0; $i < 20; $i++) {
		$prix = rand (400 ,800);
		$a1 = rand (0, 2);
		$a2 = rand (0, 2);
		while ($a1 == $a2) {
	    	$a2 = rand (0, 2);
		}
	   	array_push($liste_billets, new Billet($aeroports[$a1]["code"], $aeroports[$a2]["code"], $prix,$i));	
	}
	return $liste_billets;
}

$liste_billets = creer_billets($aeroports);
echo json_encode($liste_billets);
?>