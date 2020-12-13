<?php
session_start();
require_once('class.user.php');
$user = new USER();

if($user->is_loggedin()!="")
{
	$user->redirect('home.php');
}

if(isset($_POST['btn-signup']))
{
	$uname = strip_tags($_POST['txt_uname']);
	$umail = strip_tags($_POST['txt_umail']);
	$upass = strip_tags($_POST['txt_upass']);	
	
	if($uname=="")	{
		$error[] = "Veuillez entrer username !";	
	}
	else if($umail=="")	{
		$error[] = "Veuillez entrer un email !";	
	}
	else if(!filter_var($umail, FILTER_VALIDATE_EMAIL))	{
	    $error[] = 'Veuillez entrer un email valide !';
	}
	else if($upass=="")	{
		$error[] = "Mot de passe obligatoire !";
	}
	else if(strlen($upass) < 4){
		$error[] = "Mot de passe de taille 4 minimum";	
	}
	else
	{
		try
		{
			$stmt = $user->runQuery("SELECT user_name, user_email FROM users WHERE user_name=:uname OR user_email=:umail");
			$stmt->execute(array(':uname'=>$uname, ':umail'=>$umail));
			$row=$stmt->fetch(PDO::FETCH_ASSOC);
				
			if($row['user_name']==$uname) {
				$error[] = "Désolé cet username est déjà pris !";
			}
			else if($row['user_email']==$umail) {
				$error[] = "Désole cet email est déjà pris !";
			}
			else
			{
				if($user->register($uname,$umail,$upass)){
					$user->redirect('sign-up.php?joined');
				}
			}
		}
		catch(PDOException $e)
		{
			echo $e->getMessage();
		}
	}
}

?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
	<link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
	<link rel="stylesheet" href="style.css" type="text/css" />
	<title>Inscription</title>
</head>

<body>

	<div class="signin-form">

		<div class="container">

			<form method="post" class="form-signin">
				<h2 class="form-signin-heading">Inscription</h2>
				<hr />
				<?php
			if(isset($error))
			{
			 	foreach($error as $error)
			 	{
					 ?>
					<div class="alert alert-danger">
						<i class="glyphicon glyphicon-warning-sign"></i> &nbsp;
						<?php echo $error; ?>
					</div>
					<?php
				}
			}
			else if(isset($_GET['joined']))
			{
				 ?>
						<div class="alert alert-info">
							<i class="glyphicon glyphicon-log-in"></i> &nbsp; Inscription réussite
							<a href='index.php'>Cliquer ici</a> pour se connecter
						</div>
						<?php
			}
			?>
						<div class="form-group">
							<input type="text" class="form-control" name="txt_uname" placeholder="Username" value="<?php if(isset($error)){echo $uname;}?>"
							/>
						</div>
						<div class="form-group">
							<input type="text" class="form-control" name="txt_umail" placeholder="E-Mail" value="<?php if(isset($error)){echo $umail;}?>"
							/>
						</div>
						<div class="form-group">
							<input type="password" class="form-control" name="txt_upass" placeholder="Mot de passe" />
						</div>
						<div class="clearfix"></div>
						<hr />
						<div class="form-group">
							<button type="submit" class="btn btn-primary" name="btn-signup">
									<i class="glyphicon glyphicon-open-file"></i>&nbsp;Inscription
							</button>
						</div>
						<br />
						<label>J'ai déjà un compte !
							<a href="index.php">Se connecter</a>
						</label>
			</form>
		</div>
	</div>

	</div>

</body>

</html>