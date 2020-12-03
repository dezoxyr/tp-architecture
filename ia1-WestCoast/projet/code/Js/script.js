/*****************************************************************************/
/*********** script.js - TP - Prog distribuee - Groupe WestCoast *************/
/*****************************************************************************/

window.onload = function() {

	var liste_billets;
	/******************** Chargement de la liste de billets **************************/
    $.ajax({
	   	type: 'POST',
	   	url:'Php/affichage.php',
	   	data:{},
	   	success: function(rep){
	   		$('#billets').empty();
	       	result = JSON.parse(rep);
	       	liste_billets = result;
	        	
	        $.each(result, function(i, val) {
	        	console.log(rep);
		        $('#billets').append("<div id='"+i+"' class='billet'>"+val['depart']+ " -> " + val['arrive'] + " " + val['prix'] + "</div>");
		    });
	        if(result.length > 0){
	            $('#billets').show();
	        }
	        else {$('#billets').empty(); $('#billet').hide();}
	    },
	    error:function(err){
	        alert("erreur ! "+JSON.stringify(err)) ;
	        $('#billets').hide();
	    },
	    complete:function(){
	        ///alert("Terminé! ") ;
	    }
	});
	var client = new Array();
	client[0] = "valentin";
	client[1] = [0,1,2];
	console.log(client);
	$.ajax({
		type: 'POST',
		url: 'Php/panier.php',
		data:{liste_billets: liste_billets},
		success: function(rep){
			result = JSON.parse(rep);
			console.log(result);
		},
	    error:function(err){
	        alert("erreur ! "+JSON.stringify(err)) ;
	        $('#billets').hide();
	    },
	    complete:function(){
	        ///alert("Terminé! ") ;
	    }
	});
   	/*******************************************************************************/
}