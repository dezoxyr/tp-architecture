<?php session_start(); ?>
<!DOCTYPE PHP>
<html lang="fr">
    <head>
		<meta charset="utf-8" >
		<script type="text/javascript" src="calendrier.js"> </script>
		<link rel="stylesheet" media="screen" type="text/css" title="Design" href="./rechercheVol.css" />       
        <title>Choose your fly !</title>
 
	</head>
 
	<body>
		
	<div class = "form">
 	<fieldset class="fs0" >
			<!-- Formulaire pour trouver un vol -->
	<table >
		<br>
        <legend><h2> TROUVER UN VOL</h2></legend>
		<br>
		<form method="post" action="../flights/flights.php">
 
			<tr><td>
			
			<fieldset class="fs1" >
			<label for="Aéroport de départ">Aéroport de départ :</label> 
			<br>
	


			<select name="Adepart" id="départ">
			
			<option value="">--Choose an option--</option>
 				<option value="JFK">JFK</option>
				   <option value="CDG">CDG</option>
				   <option value="DTW">DTW<option>
				   
				</select>
</fieldset>
				
			</td>
			</td>
			<td> 

			<fieldset class="fs2">

			<label>Aéroport d'arrivée :</label>
			<br>
			<select name="Aarrivee" id="arrivee">
				<option value="">--Choose an option--</option>
 				<option value="JFK">JFK</option>
				   <option value="CDG">CDG</option>
				   <option value="DTW">DTW<option>
				   
				</select>
</fieldset>

			</td>



			</tr></td>
 
			<tr><td>
			<!-- Tableau qui contiendra le calendrier ! -->
			<table class="ds_box" cellpadding="0" cellspacing="0" id="ds_conclass" style="display: none;">
			<tr>
				<td id="ds_calclass"></td>
			</tr>
			</table>	 
				
	<form action="../flights/flights.php" method="POST" >

	<fieldset class="fs3">

		<label for="start">Date de départ :</label>

		<input type="date" id="start" name="datedepart"
       	value="04-12-2020"
       	min="04-12-2020" max="04-12-2050"/>

</fieldset>

			   <button type="submit" class="button" style="vertical-align:middle">
			   <span>Rechercher un vol</span>
			</button>
      	

      </form>



</fieldset>
</div>

			</tr></td>

		</table>
		
		<form action="../espaceperso/EspacePersonnel.html" method="post">
		<button class="button-retour"><span> Retour</span> </button>
	</form>
	
    </body>

</html>
