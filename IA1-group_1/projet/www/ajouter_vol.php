<?php

//header('Content-Type: application/json');
header("Location: http://localhost/voir_reservations.php");
//ajoute un vol dans ses reservation



try{
	$pdo =new PDO('mysql:host=127.0.0.1;port=3306;dbname=pwebc;','root','root');
	$retour["sucess"]=true;
	$retour["message"]="Connexion a la base de donnée reussi";
}
catch(Exception $e){
	$retour["sucess"]=false;
	$retour["message"]="Connexion a la base de donnée impossible";
}




if(!empty($_POST["personne"]&&$_POST["vol"])){

	

	

//ajout d une reservation

	$requete = $pdo->prepare("INSERT INTO `reservations` (`personne`, `vol`)  VALUES ( :id, :vol); ");




	$requete->bindParam(':id', $_POST['personne']);
	$requete->bindParam(':vol', $_POST['vol']); 
	
	$requete->execute();

	$retour["sucess"]=true;
	$retour["message"]="La reservation à été ajouté";


	
	
}else{
	$retour["sucess"]=false;
	$retour["message"]="il manque des infos";

}




//pour afficher tt les vols de la table





echo json_encode($retour);