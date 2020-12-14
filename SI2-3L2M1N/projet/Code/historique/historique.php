<?php session_start(); ?>
<!DOCTYPE HTML>
<html lang="fr" class="no-js">
<head>
	<meta charset="utf-8"/>
	<title>Vos réservations</title>
	<link rel="stylesheet" href="./historique.css">
	<script src="script.js"></script>

</head>
<body>
<div class="form">
	<fieldset>
	<?php
//ATTENTION A CHANGER AVEC LE VRAI ID USER (PARTIE TEO)
		
		//$idUser=2;
		$idUser=(int)$_SESSION['userid'];
		//pour connaître la page qui a appelé ce fichier
		$dadyUrl = $_SERVER['HTTP_REFERER'];
		$dadyPage = explode('/', $dadyUrl);
		$l = sizeof($dadyPage)-1;

		if($dadyPage[$l] == "flights.php")
		{
			$idVol ="v".$_POST['volReserve'];//id du vol réservé

		//création nouveau ticket
			// on lit le contenu du fichier
			$tickets = file_get_contents('./../database/tickets.txt');
			//on rajoute du contenu
			$tickets .= "\n".$idVol.'|'.$idUser;
			// on enregistre le nouveau contenu dans le même fichier
			file_put_contents('./../database/tickets.txt', $tickets);


		//décompte du stock 
			$fichierVol = './../database/flights.txt' ;
			$accLigne=0;
			if ( (file_exists($fichierVol)) && (is_readable($fichierVol)) )
			{ 	
				foreach(file($fichierVol)as$line)
				{
					if(strpos($line,$idVol)==28)
					{				

						$fichierVolModif = fopen('./../database/flights.txt', 'r+');
						fseek($fichierVolModif, $accLigne * 31);
						
						list($nothing,$i_depart, $i_arrivee, $i_date, $i_prix,$i_stock, $i_idVol)= explode("|", $line);
						if($i_stock>0)
						{$i_stock-=1; }
						
						if(0<=$i_stock && $i_stock<=9)
						{
							$i_stock='00'.$i_stock;
						}
						else if(10<=$i_stock && $i_stock<=99)
						{
							$i_stock='0'.$i_stock;
						}
						

						$array = array($nothing,$i_depart, $i_arrivee, $i_date, $i_prix,$i_stock, $i_idVol);
						$lineModif =  implode("|", $array);
						fputs($fichierVolModif, $lineModif); // On écrit le nouveau nombre de pages vues 
						fclose($fichierVolModif);
					}
					$accLigne+=1;
				}
			}
			else 
			{
				echo '<h1>Fichier introuvable ou illisible.</h1><br>';
			}

		}

	?>



	<table style="width:50%" border align="center">
		<legend><h2>VOS RESERVATIONS</h2></legend>
		<tr>
			<th>Vol</th>
			<th>Aéroport de départ</th>
			<th>Aéroport d'arrivée</th>
			<th>Date</th>
			<th>Prix</th>
			<th>Code du vol</th>
		</tr>
		<?php    



			//récupérer les id des vols du user dans tblVol
			$i=0; 
			$tblVol[0] = 0;  
			$tickets = './../database/tickets.txt';
			if ( (file_exists($tickets)) && (is_readable($tickets)) )
			{ 
				foreach(file($tickets)as$line)
				{	
					list($i_idVol, $i_idUser) = explode("|", $line);
					if($i_idUser==$idUser)
					{
						$tblVol[$i]=$i_idVol;
						$i+=1;
					}
				}
			}
			else
			{
				echo '<h1>Fichier tickets introuvable ou illisible.</h1><br>';
			}

			//afficher les détails des vols du user présents dans tblVol
			$fichierVol = './../database/flights.txt' ;
			$i=0;
			if ( (file_exists($fichierVol)) && (is_readable($fichierVol)) )
			{ 	
				foreach(file($fichierVol)as$ligne)
				{
					list($extra, $depart, $arrivee, $date, $prix, $stock, $id) = explode("|", $ligne);
					

					
					for($j=0; $j<sizeof($tblVol);$j++)
					{
						$var = strstr($id,$tblVol[$j]);
						if($var !=FALSE)
						{
							$i+=1;
							echo '<tr><td>'.$i.'</td><td>'.$depart.'</td><td>'.$arrivee.'</td><td>'.$date.'</td><td>'.$prix.'€</td><td>'.$id.'</td></tr>';
						}
					}
				}
			}
			else
			{
				echo '<h1>Fichier flights introuvable ou illisible.</h1><br>';
			}
		?>
	</table>



	<form action="../espaceperso/EspacePersonnel.html" method="post">
		<button class="button-retour"><span> Retour</span> </button>
	</form>

	</fieldset>
</div>
</body>
</html>