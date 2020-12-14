<?php

header('Content-Type: application/json');

try{
	$pdo =new PDO('mysql:host=127.0.0.1;port=3306;dbname=pwebc;','root','root');
	$retour["sucess"]=true;
	$retour["message"]="Connexion a la base de donnée reussi";
}
catch(Exception $e){
	$retour["sucess"]=false;
	$retour["message"]="Connexion a la base de donnée impossible";
}



//var_dump($_GET);

if(!empty($_GET["personne"])){

//affichage de toute les vols 




	$requete = $pdo->prepare("SELECT personne, Depart,Arrivee,Date_depart FROM reservations INNER JOIN vols ON reservations.vol = vols.ID WHERE personne LIKE :id ");
	
	
	$requete->bindParam(':id', $_GET['personne']);
	
	$requete -> execute();
	$resultats =$requete->fetchAll();

	//$retour["test"]["test"]= count($resultats);
	
	//parcours toute les données renvoyée

		if(count($resultats) > 0){
			
			
			$retour["results"]["reservation"]= $resultats; 

			//compte le nombre de reservation
				
			$retour["message"]="Reservation  ok";
			$retour["sucess"]=true;
		}
		else{
			$requete = $pdo->prepare("SELECT * FROM `reservations`");
			$requete -> execute();
			$resultats =$requete->fetchAll();
			$retour["results"]["reservation"]= $resultats; 
			//var_dump($resultats);

			$retour["message"]="Aucune reservation";	
			$retour["sucess"]=false;

		}




		 
}else{

	$retour["sucess"]=false;
	$retour["message"]="il manque des infos";

}

echo json_encode($retour);