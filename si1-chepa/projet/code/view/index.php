<?php
	require "header.php";
	// include db connect class
	require_once __DIR__ . '/db.class.php';
	$DB = new DB();

	$vols = $DB->query('SELECT * FROM vol');

	echo "<table>";
		echo "<tr>";

		echo "<td>";
		echo "Id_Vol";
		echo "</td>";

		echo "<td>";
		echo "A_Depart";
		echo "</td>";

		echo "<td>";
		echo "A_Arrivee";
		echo "</td>";

		echo "<td>";
		echo "Nom";
		echo "</td>";


		echo "</tr>";

	foreach ($vols as $vol) {

		echo "<tr>";

		echo "<td>";
		echo $vol->Id_Vol;
		echo "</td>";

		echo "<td>";
		echo $vol->A_Depart;
		echo "</td>";

		echo "<td>";
		echo $vol->A_Arrive;
		echo "</td>";

		echo "<td>";
		echo $vol->V_Nom;
		echo "</td>";

		$billets = $DB->query('SELECT billet.Id_Vol As Id, B_Prix FROM billet JOIN vol ON billet.Id_Vol = vol.Id_Vol');
		echo "<td>";
		foreach ($billets as $billet) {
			echo "<a href='/FILM/Acteur.php?id=$billet->Id'>$billet->V_Nom</a>";
			echo " ; ";
		}
		echo "</td>";




		echo "</tr>";
	}
	echo "</table>";
	require "footer.php";
?>
