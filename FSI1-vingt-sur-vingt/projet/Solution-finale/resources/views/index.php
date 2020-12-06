<!DOCTYPE html>
<html>
<head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css" integrity="sha384-TX8t27EcRE3e/ihU7zmQxVncDAy5uIKz4rEkgIXeMed4M0jlfIDPvg6uqKI2xXr2" crossorigin="anonymous">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
	<title>Connexion</title>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/javascript.util/0.12.12/javascript.util.min.js" type="text/javascript"></script>
</head>


<body>

	<div class="container">
	</br></br></br></br></br></br>	
		<h1><center>Programmation Distribuée</center></h1>
	</br>
		<div class="row">
			<div class="col-sm-3"></div>
			<div class="col-sm-6">
				<form  action="/ProgDistrib/connexion" method='post'>
			<div class="form-group">
				<input type="email" class="form-control" placeholder="Entrez votre email" name="email" required>
			</div>

			<?php
				if(isset($erreur)){
					?>
					<p class="text-danger text-center erreur">Adresse mail incorrect</p>
					<?php
				}
			?>
			<div class="text-center">
				<button type="submit" class="btn btn-primary">Connexion</button>
			</div>
			
		</form>
			</div>
			
		<div class="col-sm-3"></div>
		</div>
		
		
	</div>

</body> 

<script type="text/javascript">
	$(document).ready(function(){
  
	   	if($('.erreur').is(":visible")){
	   		$('.erreur').fadeOut(3000);
	   	}

	});

</script>

</html>

