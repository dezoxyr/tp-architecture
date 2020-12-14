<?php

	require_once("session.php");
	
	require_once("class.user.php");
	$auth_user = new USER();
	
  $user_id = $_SESSION['user_session'];
  $stmt = $auth_user->runQuery("SELECT * FROM users WHERE user_id=:user_id");
	$stmt->execute(array(":user_id"=>$user_id));
  
  $userRow=$stmt->fetch(PDO::FETCH_ASSOC);
	$vols_url = 'http://localhost/vols.php';
	$vols_json = file_get_contents($vols_url);
	$vols_array = json_decode($vols_json, true);
	
	//var_dump($vols_array);

	
	//foreach($vols_array['results'] as $){

//	var_dump($vols_array['results']['vols']);
?>


  <!DOCTYPE html>
  <html lang="fr">

   <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
    <link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
    <script type="text/javascript" src="./js/jquery-1.11.3-jquery.min.js"></script>
    <link rel="stylesheet" href="/css/style.css" type="text/css" />
    <link rel="stylesheet" href="/css/style_home.css" type="text/css" />
    <link rel="stylesheet" href="//code.jquery.com/ui/1.12.1/themes/base/jquery-ui.css">
    <link rel="stylesheet" href="/resources/demos/style.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<!-- <script src="./js/main.js"></script> -->

    <title>Accueil</title>
  </head>

<body>

    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container">
        <div class="navbar-header">
          <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false"
            aria-controls="navbar">
            <span class="sr-only">Toggle navigation</span>
          </button>
		<h2><a href="/voir_reservations.php" class="navbar-brand">Voir mes réservations</a></h2>
        </div>
        <div id="navbar" class="navbar-collapse collapse">

          <ul class="nav navbar-nav navbar-right">
            <li>
              <a href="logout.php?logout=true">
                <span class="glyphicon glyphicon-log-out"></span>&nbsp;Se déconnecter</a>
            </li>
          </ul>
        </div>
        <!--/.nav-collapse -->
      </div>
    </nav>


    <div class="clearfix"></div>


    <div class="container-fluid" style="margin-top:80px;">

      <div class="container">

        <label class="h2">Bienvenue : <?php print($userRow['user_name']);  ?>

        </label>
        <br>
      </div>

	</div>



<div>

<table>

<script>
	 var variableRecuperee = <?php echo json_encode($userRow['user_id']); ?>;
	$.get("http://localhost/vols.php", function(data) {
    console.log(variableRecuperee);
	console.log(data['results']['vols']);
		$('#jsonresponse').append("<tr>	<th>Date de départ</th>		<th>Ville de départ</th>		<th>Ville d'arrivée</th>		<th>Compagnie</th>	<th>Durée en heure(s)</th>	<th>Prix</th>	</tr>");
	data['results']['vols'].forEach(element => {
		$('#jsonresponse').append("<tr><td>"+ element['Date_depart'] +"  </td>" + "<td>"+ element['Depart'] +"  </td>"+ "<td>"+ element['Arrivee'] +"  </td>"+ "<td>"+ element['Compagnie'] +"  </td>"+ "<td>"+ element['Temps_de_vol'] +"  </td>"+ "<td>"+ element['Prix'] + " </td></tr> " );
        $('#jsonresponse').append("<td><form method=\"POST\" action=\"ajouter_vol.php\"> <input type=\"hidden\" name=\"personne\" value=\""+ variableRecuperee +"\" /> <input type=\"hidden\" name=\"vol\" value=\"" + element['ID'] + "\" /> <input href=\"/voir_reservations.php\" type=\"submit\" value=\"Reserver\"> </form></td>");
	});
})	

</script>
</table>

<?php
if (isset($_POST['submit']))
    {   
    ?>
   
    <?php
    }
?>

</div>



	<!--Tableau filtrage -->
    <div id="booking" class="section">
		<div class="section-center">
			<div class="container">
				<div class="row">
					<div class="booking-form">
					
						<form method="POST" action="ajouter_vol.php">
							
							<div id="jsonresponse"></div>
						</form>
					</div>
				</div>
			</div>
		</div>




		<!--Tableau réservation -->
   



		<!--Tableau affichage réservations -->





	</div>

	
         

  </body>

  </html>