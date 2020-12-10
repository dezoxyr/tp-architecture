<?php
   session_start();
   
   header("refresh: 1; URL=login.php"); /*redirecting to main page, with the current session's variables erased, after 3seconds*/
   
   
   /* Displays current session */
   echo ">Current session: ";
   echo $_SESSION['userFirstname'];
   echo " ";
   echo $_SESSION['userLastname']; 
   echo " erased.";
	
	
	
   unset($_SESSION["userid"]);
   unset($_SESSION["userLastname"]);
   unset($_SESSION["userFistname"]);
   unset($_SESSION["password"]);
   unset($_SESSION["email"]);
   
   session_destroy(); /* Is Used To Destroy All Sessions, in case all session had issues dropping */
?>
