$.get("http://localhost/vols.php", function(data) {
    var php1 =" <?php echo \" <input type=\"hidden\" name=\"vol\" value=\"5\" /> \"?> "
    var num ="<?php echo $userRow['user_id']; ?>";
    console.log(num);
    console.log(data['results']['vols']);
    data['results']['vols'].forEach(element => {
        $('#jsonresponse').append("<tr><td> Date de départ = "+ element['Date_depart'] +" | </td>" + "<td>Ville de départ = "+ element['Depart'] +" | </td>"+ "<td>Ville d'arrivée = "+ element['Arrivee'] +" | </td>"+ "<td>Compagnie = "+ element['Compagnie'] +" | </td></tr> " );
        $('#jsonresponse').append("<form method=\"POST\" action=\"ajouter_vol.php\"> <input type=\"hidden\" name=\"personne\" value=\""+ num +"\" /> <input type=\"hidden\" name=\"vol\" value=\"" + element['ID'] + "\" /> <input type=\"submit\" value=\"Send data\"> </form>");
    });
})

