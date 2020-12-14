window.addEventListener("DOMContentLoaded", (event) => {
    console.log("DOM entièrement chargé et analysé");
    var page = document.documentURI.split('/');

    if(page[page.length - 1] == 'user.html'){
    	upage = true;
    }else{
    	upage = false;
    }

    top_ban(upage);
    theadTable();
    mainInitWeb('list_voyages');
});


function top_ban(upage){
	if(upage){
		img = "../Ressources/";
		img2 = "<img src='../Ressources/turn-off.png' onclick='disconnect()' />";
	}else{
		img = "Ressources/";
		img2 = "<img src='Ressources/user.png' onclick='userAccount()' />";
	}

	document.getElementById('top_ban').innerHTML = "\
		<div class=\"el_top\">\
			<img src='"+img+"homepage.png' onclick='homeBack()' />\
		</div>\
		<div class=\"el_top\">\
			<h1 onclick=\"homeBack()\">Air barre barre</h1>\
		</div>\
		<div class=\"el_top\">\
			"+img2 + "\
		</div>"
}

function theadTable(){
	document.getElementById('head_list_vols').innerHTML = "\
		<tr>\
			<th>Départ - Destination</th>\
			<th>Nom de l'avion</th>\
			<th>Sièges total</th>\
			<th>Prix</th>\
			<th></th>\
		</tr>"
}