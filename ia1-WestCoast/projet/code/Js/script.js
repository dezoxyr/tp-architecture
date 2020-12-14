/*****************************************************************************/
/*********** script.js - TP - Prog distribuee - Groupe WestCoast *************/
/*****************************************************************************/

window.onload = function() {
	do{
		var user = window.prompt("Entrez votre nom");
	}while (user === "" || user === null);
	console.log(user);
	var liste_billets;
	var client = new Array();
	client[0] = user;
	client[1] = new Array();
	$(document).ready(function() {
		$(document).on('click','.billet', function()
		{
			var nouveau = $(this).attr("id");
			console.log(liste_billets[nouveau]["nbPlace"]);
   			$.ajax({
			   	type: 'POST',
			   	url:'Php/achat.php',
			   	data:{'client': JSON.stringify(client), nouveau: nouveau, liste: JSON.stringify(liste_billets)},
			   	success: function(rep){
					result = JSON.parse(rep);
					console.log(result.chgt);
					if (result.chgt !== undefined){
			       			 client[1] = result.liste_billets;
						liste_billets[nouveau]["nbPlace"] = result.chgt;
						$('#'+nouveau+' span').text(result.chgt);	
						console.log(liste_billets[nouveau]["nbPlace"]);
						$('#Panier').prop("value", "Profil (" + client[1].length + ")");
			    		}
				},
			    	error:function(err){
			        	alert("erreur ! "+JSON.stringify(err)) ;
			        	$('#billets').hide();
			    	},
			    	complete:function(){
			        	///alert("Terminé! ") ;
			    	}
			});
			$(this).addClass("grey");
		});
		$(document).on('click','#Panier', function()
		{
			$.ajax({
				type: 'POST',
				url: 'Php/panier.php',
				data:{liste_billets: JSON.stringify(liste_billets), client: JSON.stringify(client)},
				success: function(rep){
					result = JSON.parse(rep);
	        			$('#achats').empty();
	        			$.each(result, function(i, val) {
		        			$('#achats').append("<div class='billet'>"+val['depart']+" - "+val['arrive'] + " " + val['prix']);
		    			});
	        			if(result.length > 0){
	            				$('#achats').show();
	       				}
	        			else {$('#achats').empty(); $('#achats').hide();}
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

		$( ".button_cont" ).click(function() {
		   	$( "#section_billets:visible" ).slideUp("fast",function() {
	  			$( "#section_achats:hidden" ).slideDown("fast");	
			});
			$( ".button_cont:visible" ).slideUp("fast",function() {
	  			$( ".button_rev:hidden" ).slideDown("fast");	
			});	
		});

		$( ".button_rev" ).click(function() {
		   	$( "#section_achats:visible" ).slideUp("fast",function() {
	  			$( "#section_billets:hidden" ).slideDown("fast");	
			});
			$( ".button_rev:visible" ).slideUp("fast",function() {
	  			$( ".button_cont:hidden" ).slideDown("fast");	
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
		        $('#billets').append("<div id='"+i+"' class='billet'>"+val['depart']+ " - " + val['arrive'] + " " + val['prix'] + "</br>Place(s) restante(s) <span>" +val['nbPlace']+"</span></div>");
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