<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr" >
<head>
  <meta charset="UTF-8">
  <title>Réservation de vols</title>
  <link href='https://fonts.googleapis.com/css?family=Titillium+Web:400,300,600' rel='stylesheet' type='text/css'>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/5.0.0/normalize.min.css">

<link rel="stylesheet" href="./style.css">

</head>
<body>

<div class="form">


      <!-- redirection in order to go back to the login form or the register one -->
      <ul class="tab-group">
	<li class="tab active"><a href="./login.php">Connexion</a></li>

	<li class="tab "><a href="./register.php">Inscription</a></li>
	      </ul>

      <div class="tab-content">


	<!-- LOGIN form-->
	   <div id="login">   
	  <h1>BIENVENUE !</h1>


	  <form class ="" role ="form" action="" method="post">
	  <!-- action="<?php echo htmlspecialchars($_SERVER['PHP_SELF']); ?>" -->

	    <div class="field-wrap">
	    <label>Adresse Email<span class="req">*</span></label>
	    <input type="email" name="email" required autocomplete="off"/>
	  </div>


	  <div class="field-wrap">
	    <label>Mot de Passe<span class="req">*</span></label>
	    <input type="password" name="password" required autocomplete="off"/>
	  </div>


	  <br>

	  <button type="submit" name="login" class="button button-block">Connexion</button>

	  </form>

	</div>


      </div><!-- /tab-content -->

</div> <!-- /form -->

<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
  <script  src="./script.js"></script>


</body>
</html>




<?php

if(isset($_POST['login']) && !empty($_POST['email']) && !empty($_POST['password']) ) 
{
	$userid = "";
	$userLastname = "";
	$userFirstname = "";
	$password = "";
	$email = "";

	$fichier = file_get_contents("../database/users.txt"); /*change directory if needed*/	
	
	$succes = FALSE; /*success flag*/
	


	/* Display if POST & SESSION works - for DEBUG * /
	echo "<br><br>test des POST du formulaire:	";
	echo $_POST['email'];
	echo " ";
	echo $_POST['password'];

	echo "<br>"; /*retour chariot* /

	echo "test de la SESSION (password) du formulaire:	";
	$_SESSION['email'] = $_POST['email'];
	echo $_SESSION['email'];
	echo " "; */


     $lines_of_file = explode("\n", $fichier);	
     foreach($lines_of_file as $line)
     {
         list($userid, $userLastname, $userFirstname, $password, $email)=explode("|", $line); 
     
     
     /* Display current cursor - use for DEBUG * /  
     echo "<br>";	    
     echo $userid;
     echo " ";
     echo $userLastname;
     echo " ";
     echo $userFirstname;
     echo " ";
     echo $password;
     echo " ";
     echo $email; */


	/* if current email/password in database (currently: file) equal POSTed variable email/password */
     if( (strcmp($email, $_POST['email']) == 0) && (strcmp($password, $_POST['password']) == 0) )
      {
	 $succes = TRUE; /* flag set to validated authentification*/
	 /* echo "<script type='text/javascript'>alert('sa marche!');</script>"; IF SUCCESS HAS BEEN ACHIEVED */
	 break; /*stops the process*/
      } /* end: if strcmp variables POSTed and in DB's cursor */



} /* end of foreach */






   if ($succes) 
   {
	   $_SESSION['userid']= $userid;
	   $_SESSION['userLastname']= $userLastname;
	   $_SESSION['userFirstname']= $userFirstname;
	   $_SESSION['password']= $password; /* /!\ Security, while session cookies aren't deleted */
	   $_SESSION['email']= $email;
	
	
	/* Display of current session - for DEBUG * /
	echo "<br><br><br>Current SESSION: <br>";
	echo $_SESSION['userid'];
	echo " ";
	echo $_SESSION['password'];
	echo " ";
	echo $_SESSION['userFirstname'];
	echo " ";
	echo $_SESSION['userLastname'];
	echo " ";
	echo $_SESSION['email']; */

	
	header("refresh: 1; URL=../espaceperso/EspacePersonnel.html"); /*redirecting to main page, with the current session's variables, after 3seconds*/
	echo "<br><br>>";
	echo $_SESSION['userFirstname'];
	echo " ";
	echo $_SESSION['userLastname']; 
	echo " has logged in.";
	//header("location: index.html");
   }  else{
	   echo "<script type='text/javascript'>alert('You have entered the wrong username or password. Please try again.');</script>";	
	   
	   } /* end: if succes*/




}/* end: if POST variable are isset by form*/









/* CODE FOR A PROMPT BOX, rather than having a formal php file
<?php
function  createConfirmationmbox(){
    echo '<script type="text/javascript"> ';
    echo 'var inputname = prompt("Please enter your name", "");';
    echo 'alert(inputname);';
    echo '</script>';
}
?>
 */
?>
