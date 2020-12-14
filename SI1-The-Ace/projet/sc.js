function printAll(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8001/test?param=all",
		success: function(msg){
			var obj = JSON.parse(msg);
			$.each(obj, function(key, value){
				$("#affich").append("ID : "+key+" --Details : "+value+"<br>");
				
			});
			
		},
		error: function(msg){
			console.log(msg);
			$("#affichr").append("Liste des vols indisponible");
		}
	});
}

function printReserv(){
	$.ajax({
		type: "GET",
		url: "http://localhost:8001/test?param=booked",
		success: function(msg){
			var obj = JSON.parse(msg);
			$.each(obj, function(key, value){
				$("#affichr").append("ID : "+key+" Details : "+value+"<br>");
			});
			
		},
		error: function(msg){
			console.log(msg);
			$("#affich").append("Liste des réservations indisponible");
		}
	});
}

function doReserv(i){
	$.ajax({
		type: "GET",
		url: "http://localhost:8001/test?param="+i,
		success: function(msg){
			
		},
		error: function(msg){
			console.log(msg);
		}
	});
}

$(document).ready(function(){
	$("#button").click(function(){
		doReserv($("#input").val());
		$("#affich").empty();
		$("#affichr").empty();
		printAll();
		printReserv();
	});
	console.log("test");
	printAll();
	printReserv();
});