

<?php

    $clients = file_get_contents("mon_fichier.json");
    $data_clients = json_decode($clients);

    #echo strlen($data_vols);
    $i = 0;
    $indice = 0;

    if(!empty($_POST)){

        // Le login est-il rempli ?
        if(empty($_POST['email'])){

            $message2 = "Veuillez indiquer votre email s'il vous plaît !";
        
        }else{

            while($i < count($data_clients)){

                if($data_clients[$i]->email == $_POST['email']){

                    $data_clients[$i]->connected = "true";
                    file_put_contents("mon_fichier.json", json_encode($data_clients));
                    $indice = 1;
                    $i = count($data_clients);

                    $message4 = "Connexion réalisée avec succès ! ^^";
                }

                $i = $i +1;
            }

            if($indice == 0){

                $message3 = "Désolé mais vous ne vous êtes pas inscrit. Si vous voulez accéder à plus de contenu, veuillez vous inscrire.";
            }
        }
    }

?>

<?php require_once("haut.php"); ?>

<?php 
        if(isset($message2)){
            
            echo "<div class='erreur'>$message2</div><br>";
        
        }elseif(isset($message3)){

            echo "<div class='erreur'>$message3</div><br>";
        
        
        }if(isset($message4)){

            echo "<div class='validation'>$message4</div><br>";

        }else{

            echo "<form method='post' action=''>";

            echo "<label for='email'>E-mail</label><br>";
            echo "<input type='text' id='email' name='email' placeholder='exemple@qqch.fr'><br><br>";
            echo "<input type='submit' value='Se connecter'>";

            echo "</form>";
        }
?>
   
            
 
<?php require_once("bas.php"); ?>
