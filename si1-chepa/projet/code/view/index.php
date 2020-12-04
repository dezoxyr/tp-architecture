<?php
	require "header.php";
	// include db connect class
	require_once __DIR__ . '/db.class.php';
	$DB = new DB();

	$Vols = $DB->query('SELECT * FROM Vol');

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
		echo "Prix";
		echo "</td>";


		echo "</tr>";

	foreach ($Vols as $Vol) {

		echo "<tr>";

		echo "<td>";
		echo $vol->Id_Vol;
		echo "</td>";

		echo "<td>";
		echo $vol->A_Depart;
		echo "</td>";

		echo "<td>";
		echo $vol->A_Arrivee;
		echo "</td>";

		echo "<td>";
		echo $vol->B_Vol;
		echo "</td>";

		$acteurs = $DB->query('SELECT jouer_par.ID_Act As Id, acteur.A_Nom FROM jouer_par JOIN acteur ON jouer_par.ID_Act = acteur.ID_Act WHERE jouer_par.ID_Film =:id', array('id' => $film->ID_Film));
		echo "<td>";
		foreach ($acteurs as $acteur) {
			echo "<a href='/FILM/Acteur.php?id=$acteur->Id'>$acteur->A_Nom</a>";
			echo " ; ";
		}
		echo "</td>";




		echo "</tr>";
	}
	echo "</table>";
	require "footer.php";
?>
