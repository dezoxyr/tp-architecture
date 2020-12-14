<?php require_once("haut.php"); ?>

<?php

    $clients = file_get_contents("mon_fichier.json");
    $data_clients = json_decode($clients);

    #echo strlen($data_vols);
    $i = 0;
    $indice = 0;

    if(!empty($_POST)){

        // Le login est-il rempli ?
        if(empty($_POST['email'])){

            $message1 = "Veuillez indiquer votre email s'il vous plaît !";
        
        }else{

            while($i < count($data_clients)){

                if($data_clients[$i]->email == $_POST['email']){

                    $indice = 1;
                    $message2 = "Veuillez choisir une autre adresse mail, celle-ci existe déjà !";
                }

                $i = $i +1;
            }

            if($indice == 0){

                $new_client = array('email' => $_POST['email'], 'connected' => 'false');
                array_push($data_clients, $new_client);
                file_put_contents("mon_fichier.json", json_encode($data_clients));

                $message3 = "Bienvenue parmi nous ^^ ! Vous pouvez désormais vous connecter.";
            }
        }
    }

?>
            
            <?php 
                if(isset($message1)){
                    
                    echo "<div class='erreur'>$message1</div><br>";
                
                }elseif(isset($message2)){

                    echo "<div class='erreur'>$message2</div><br>";

                }elseif(isset($message3)){

                    echo "<div class='validation'>$message3</div><br>";
                }
            ?>

            <form method="post" action="">

                <label for="email">E-mail</label><br>
                <input type="text" id="email" name="email" placeholder="exemple@qqch.fr"><br> <br>
                <input type="submit" value="S'inscrire">
            </form>

<?php
            echo $_POST['email'];
?>
 
<?php require_once("bas.php"); ?>