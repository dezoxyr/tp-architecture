<?php
  
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<title>Reservation</title>
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
          <a class="nav-link" href="/ProgDistrib/billet">Réservation <span class="sr-only">(current)</span></a>
        </li>
        <li class="nav-item">
          <a class="nav-link" href="/ProgDistrib/MesResa">Mes réservations</a></li>
         <li class="nav-item">
          <a class="nav-link" href="/ProgDistrib/Deconnexion">Déconnexion</a></li>
      </ul>
    </div>
  </nav>
    <div class="pricing-header px-3 py-3 pt-md-5 pb-md-4 mx-auto text-center">
        <h1 class="display-4">Réservation</h1>
        <p class="lead">Veuilliez reserver vos billets</p>
        <?php //echo $_COOKIE['utilisateur']; ?>

      
      <table class="table">
          <thead>
            <tr>
              <th scope="col">Départ</th>
              <th scope="col">Arriver</th>
              <th scope="col">Prix</th>
              <th scope="col">Reserver</th>
            </tr>
            </thead>
            <?php
              foreach ($billet as $value) {
                  echo'<tbody>
                   <tr>
                   
                  <td>'. $value->_CodeDepart.'</td>
                  <td>'. $value->_CodeArriver.'</td>
                  <td>'. $value->_Prix.'</td>
                  <td><a class="btn btn-primary" href="/ProgDistrib/reserver/'.$value->_id.'">Reserver</a></td>';
              } ?>
      </table>
    </div>
</body>
</html>
