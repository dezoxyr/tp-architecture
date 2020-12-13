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


if(!empty($_POST["Depart"])){

	$requete = $pdo->prepare(" SELECT * FROM `vols` WHERE `Depart` LIKE :nomdeville ");
	
	$requete->bindParam(':nomdeville',$_POST["Depart"]);
	//dans requete j ai ltt le renvoi sql
	$requete -> execute();


}else{
	//sinon nous renvoi tout les vols si pas de ville de depart
	$requete = $pdo->prepare("SELECT * FROM `vols`");
	//dans requete j ai ltt le renvoi sql
	$requete -> execute();

}




//pour afficher tt les vols de la table


$resultats =$requete->fetchAll();

$retour["sucess"]=true;
$retour["message"]="Voici les vols";
//pour savoir le nombre de vols 
$retour["results"]["nb"]= count($resultats);
$retour["results"]["vols"]= $resultats; 
  


echo json_encode($retour);
?>
  