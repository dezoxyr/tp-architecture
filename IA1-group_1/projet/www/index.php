<?php
session_start();
require_once("class.user.php");
$login = new USER();

if($login->is_loggedin()!="")
{
	$login->redirect('home.php');
}

if(isset($_POST['btn-login']))
{
	$uname = strip_tags($_POST['txt_uname_email']);
	$umail = strip_tags($_POST['txt_uname_email']);
	$upass = strip_tags($_POST['txt_password']);
		
	if($login->doLogin($uname,$umail,$upass))
	{
		$login->redirect('home.php');
	}
	else
	{
		$error = "Wrong!";
	}	
}
?>




    <!DOCTYPE html>
    <html lang="fr">

    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Connexion</title>
        <link href="bootstrap/css/bootstrap.min.css" rel="stylesheet" media="screen">
        <link href="bootstrap/css/bootstrap-theme.min.css" rel="stylesheet" media="screen">
        <link rel="stylesheet" href="style.css" type="text/css" />
    </head>

    <body>

        <div class="signin-form">

            <div class="container">


                <form class="form-signin" method="post" id="login-form">

                    <h2 class="form-signin-heading">Connexion</h2>
                    <hr />

                    <div id="error">
                        <?php
			if(isset($error))
			{
				?>
                            <div class="alert alert-danger">
                                <i class="glyphicon glyphicon-warning-sign"></i> &nbsp;
                                <?php echo $error; ?> !
                            </div>
                            <?php
			}
		?>
                    </div>

                    <div class="form-group">
                        <input type="text" class="form-control" name="txt_uname_email" placeholder="Username ou E-mail " required />
                        <span id="check-e"></span>
                    </div>

                    <div class="form-group">
                        <input type="password" class="form-control" name="txt_password" placeholder="Votre mot de passe" />
                    </div>

                    <hr />

                    <div class="form-group">
                        <button type="submit" name="btn-login" class="btn btn-default">
                	<i class="glyphicon glyphicon-log-in"></i> &nbsp; Se connecter
            </button>
                    </div>
                    <br />
                    <label>Je n'ai pas de compte ! <a href="sign-up.php">Inscription</a></label>
                </form>

            </div>

        </div>

    </body>

    </html>