/*****************************************************************************/
/*********** script.js - TP - Prog distribuee - Groupe WestCoast *************/
/*****************************************************************************/

window.onload = function() {
	var user = window.prompt("Entrez votre nom");
	var liste_billets;
	var client = new Array();
	client[0] = user;
	client[1] = new Array();
	$(document).ready(function() {
		$(document).on('click','.bouton', function()
		{
			var nouveau = $(this).attr("id");
   			$.ajax({
			   	type: 'POST',
			   	url:'Php/achat.php',
			   	data:{'client': JSON.stringify(client), nouveau: nouveau},
			   	success: function(rep){
					result = JSON.parse(rep);
			        	client[1] = result.liste_billets;
			    	},
			    	error:function(err){
			        	alert("erreur ! "+JSON.stringify(err)) ;
			        	$('#billets').hide();
			    	},
			    	complete:function(){
			        	///alert("Terminé! ") ;
			    	}
			});
		});
		$(document).on('click','#panier', function()
		{
			$.ajax({
				type: 'POST',
				url: 'Php/panier.php',
				data:{liste_billets: JSON.stringify(liste_billets), client: JSON.stringify(client)},
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
		});
	});

	
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
		        $('#billets').append("<div id='"+i+"' class='billet'>"+val['depart']+ " -> " + val['arrive'] + " " + val['prix'] + "<span class='bouton' id='"+i+"'> Acheter</span></div>");
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
   	/*******************************************************************************/
}