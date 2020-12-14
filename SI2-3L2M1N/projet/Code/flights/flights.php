<?php session_start(); ?>
<!DOCTYPE HTML>
<html lang="fr">
<head>
	<meta charset="utf-8">
	<title>Réservation</title>
	<link rel="stylesheet" media="screen" type="text/css" title="Design" href="./flights.css" />       

</head>
<body>
<div class="form">

	<fieldset class="fs0">
 <legend>	<h2>RESERVATION</h2> </legend>
	<p>Vols disponibles :</p>

	<table  style="width:50%" border align="center" >
		<tr>
			<th>Numéro de vol</th>
			<th>Aéroport de départ</th>
			<th>Aéroport d'arrivée</th>
			<th>Date</th>
			<th>Prix</th>
			<th>Nombre de places restantes</th>
		</tr>

<!-- ATTENTION ICI flights.txt EST DANS LE MËME DOSSIER QUE CE FICHIER, LE CHEMIN SERA DONC SUREMENT A CHNAGER -->

		<?php 

			$depart = $_POST['Adepart'];
			$arrivee =  $_POST['Aarrivee'];
			$date =  $_POST['datedepart'];
			$fichier = './../database/flights.txt'; //chemin à changer <--
			$i = 0;

			if ( (file_exists($fichier)) && (is_readable($fichier)) )
				{ 
					foreach(file($fichier)as$line)
					{
						if(strpos($line,$depart)==1 && strpos($line,$arrivee)==5 && strpos($line,$date)==9)//pour vérifier les critères départ arrivée et date
						{
							//echo"";
							//séparation des données pour chaque lignes
							list($nothing,$i_depart, $i_arrivee, $i_date, $i_prix,$i_stock, $i_idVol)= explode("|", $line);
							list($i_year,$i_month,$i_day) = explode('-', $i_date);
							if( $i_stock != 0)
							{
								//affichage des données 
								echo '<tr><td>'.$i_idVol[1].'</td><td>'.$i_depart.'</td><td>'.$i_arrivee.'</td><td>'.$i_day.'/'.$i_month.'/'.$i_year.'</td><td>'.$i_prix.'€</td><td>'.$i_stock.'</td></tr>';

								$arrayVols[$i]=$i_idVol[1];
								$i=$i+1;
							}
						}
						
					}
				}
				else {
					echo '<h1>Fichier introuvable ou illisible.</h1><br>';
				}
		?>
	</table>

<!-- ATTENTION LE NOM ET LE CHEMIN DU FICHIER historique.php DOIT PEUT ETRE CHANGE -->
	<form action="../historique/historique.php" method="post">
			<br>
	        <p> Sélectionner le numéro du vol :</p><br>
	        <?php
				echo '<center><select name="volReserve" id="volReserve">';
				for($j=0; $j<$i; $j++)
	        	{
	 				echo '<option value="'.$arrayVols[$j].'">'.$arrayVols[$j].'</option>';
				}		
			?>	   
			</select>		 
							
			<br>
			<button type="submit" class="button"><span>Réserver</span> </button>
			
	</form>	

	<form action="../recherchevol/recherchevol.php" method="post">
		<button class="button-retour"> <span>Retour</span> </button>
	</form>



	</fieldset>
</div>



</body>
</html>


