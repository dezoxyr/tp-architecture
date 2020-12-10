<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr" >
<head>
  <meta charset="UTF-8">
  <title>Réservation de vols</title>
<link rel="stylesheet" href="./style.css">

</head>
<body>

<div class="form">

      <ul class="tab-group">
	<li class="tab"><a href="./login.php">Connexion</a></li>

	<li class="tab active"><a href="./register.php">Inscription</a></li>
      </ul>

      <div class="tab-content">


	<div id="signup">   
	  <h1>Inscription</h1>

	  <form role="form" action="" method="post">



	  <div class="top-row">
	    
	    <div class="field-wrap">
	      <label>Prénom<span class="req">*</span></label>
	      <input type="text" name="userFirstname" required autocomplete="off" />
	    </div>

	    <div class="field-wrap">
	      <label>Nom<span class="req">*</span></label>
	      <input type="text" name="userLastname" required autocomplete="off"/>
	    </div>
	  
	  </div>



	  <div class="field-wrap">
	    <label>Adresse E-mail<span class="req">*</span></label>
	    <input type="email" name="email" required autocomplete="off"/>
	  </div>



	  <div class="field-wrap">
	    <label>Mot de Passe<span class="req">*</span></label>
	    <input type="password" name="password" required autocomplete="off"/>
	  </div>



	  <button type="submit" name="envoi" class="button button-block">Validez</button>
	  </form>

	</div> <!-- /div : signup -->


      </div><!-- /div : tab-content -->

</div> <!-- /form -->

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script  src="./script.js"></script>

</body>
</html>






<?php


if( isset($_POST['envoi']) && !empty($_POST['userLastname']) && !empty($_POST['userFirstname']) && !empty($_POST['password']) && !empty($_POST['email']) )
{
	$userid = "";
	$userLastname = "";
	$userFirstname = "";
	$password = "";
	$email = "";




	$fichier = file_get_contents("DB_TXTs/users.txt") or die("<br>>Can't make up the link to the Database."); /*change directory if needed*/
	
	
	//file_put_contents("DB_TXTs/users.txt", "test", FILE_APPEND);

	$succes = FALSE; /* flag to test if there isn't twice the same user false = good */




	/* Attribute a new user's id AND test if user already exists */
	$lines_of_file = explode("\n", $fichier);	
	foreach($lines_of_file as $line)
	{
		list($userid, $userLastname, $userFirstname, $password, $email)=explode("|", $line);

		/*test affichage* /
		echo "<br>";	    
		echo $userid;
		echo " ";
		echo $userLastname;
		echo " ";
		echo $userFirstname;
		echo " ";
		echo $password;
		echo " ";
		echo $email;*/



		/* same email already registered ?! */
		if(strcmp($email, $_POST['email']) == 0)
		{
			$succes = TRUE; 
			//echo "<script type='text/javascript'>alert('It seems like an account was already made using that email adress: ' . $email);</script>";
			break; /* stop the whole process */	
		} /* end : if found a user with an existing email already registered */

	} /* end : foreach */


    /* Display for making sure userid has been counted properly * /
     echo "<br>";
     echo $userid;
     $useridInt = (int)$userid; /* new user id = last user id +1 * /
     $useridInt = $useridInt + 1;
     echo " ";
     echo $useridInt; 
     echo "<br>";

     */

	/* If a user using the same email already exists, stop it all */
	if($succes) 
	{
		header("refresh: 2; URL=login.php"); 
	}

	else { 
/* Writes the new user's data in the DB (currently file.txt) * /      
fwrite($fichier, $useridInt); 
fwrite($fichier, "|"); 
fwrite($fichier, $_POST['userLastname']); 
fwrite($fichier, "|"); 
fwrite($fichier, $_POST['userFirstname']); 
fwrite($fichier, "|"); 
fwrite($fichier, $_POST['password']); 
fwrite($fichier, "|"); 
fwrite($fichier, $_POST['email']); 
fwrite($fichier, "\n"); 
     */


     /*Display all users, after adding our new user - use for DEBUG * / 
     $lines_of_file = explode("\n", $fichier);	
     foreach($lines_of_file as $line)
     {	
	list($userid, $userLastname, $userFirstname, $password, $email)=explode("|", $line);	 
	echo "<br>";	    
	echo $userid;
	echo " ";
	echo $userLastname;
	echo " ";
	echo $userFirstname;
	echo " ";
	echo $password;
	echo " ";
	echo $email;

	fclose($fichier);
    } */

	} /* end : else, no usage of the same email in user's DB */



	//fclose($fichier); 
} /* end : if isset all variable to creat new user */
?>
