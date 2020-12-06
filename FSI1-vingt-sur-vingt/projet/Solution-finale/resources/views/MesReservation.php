<?php

?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Mes Reservation</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.16.0/umd/popper.min.js"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
</head>
<body>
   <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="/ProgDistrib/billet">Reservation <span class="sr-only">(current)</span></a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/ProgDistrib/MesResa">Mes réservations</a></li>
          <li class="nav-item">
            <a class="nav-link" href="/ProgDistrib/Deconnexion"> Déconnexion</a></li> 
        </ul>
      </div>
    </nav>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Mes Réservations</h1>
        <p class="lead">Voici mes billets</p>
      
      
      <table class="table">
      <thead>
        <tr>
        
          <th scope="col">Départ</th>
          <th scope="col">Arriver</th>
          <th scope="col">Prix</th>
       
        </tr>
      </thead>
          <?php

            if(!isset($_SESSION['user'])){
              echo "Vous n'avez aucune réservation pour le moment";
            }
            else{

                $reserver = unserialize($_SESSION['user']);
                foreach ($reserver->_reservation as $value) {
                  echo'<tbody>
                   <tr>
                  <td>'. $value->_CodeDepart.'</td>
                  <td>'. $value->_CodeArriver.'</td>
                  <td>'. $value->_Prix.'</td>
                  </tr>
                  </tbody>';
                }
            } 
          ?>
    </table>
    </div>
</body>
</html>
