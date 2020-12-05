const from = "Tous";
const to   = "Tous";

function getIdClient() {
	return window.location.search.split('&')[0].replace('?idClient=', '');
}

function initDestLabels() {
	searchSplit = window.location.search.split('&');
	if (searchSplit.length == 3) {
		console.log("ok")
		this.from = searchSplit[1].replace('from=', '');
		this.to   = searchSplit[2].replace('to=', '');
		document.getElementById('from_' + this.from).setAttribute("selected", true);
		document.getElementById('to_' + this.to).setAttribute("selected", true);
		printBillets()
	} else {
		console.log("ko")
		printBillets();
	}
}

function printBillets() {
	var f = ("" + this.from).replaceAll('_', ' ');
	var t = ("" + this.to).replaceAll('_', ' ');
	if (f == 'undefined') f = "Tous";
	if (t == 'undefined') t = "Tous";
	document.getElementById("lesBillets").innerHTML = addAllBillet(f, t);
	document.getElementById("mesBillets").innerHTML = addAllMyBillet(window.location.search.replace('?idClient=', ''));
}

function getFrom(){
	return document.getElementById("rechercheFrom").value;
}
function getTo(){
	return document.getElementById("rechercheTo").value;    
}

function rechercheButtonAction(){
	this.from = getFrom();
	this.to   = getTo();

	window.location.href = "http://localhost:80/home.html?idClient=" + (getIdClient()) + "&from=" + this.from + "&to=" + this.to;
}

function addOneBillet(id, from, to, date, departure_time, arrival_time, price){
	return '<div class="billet" id="'+id+'"><div class="textArea"><label>De :</label><label class="from">'+from+'</label><label>à :</label><label class="to">'+to+'</label><br><label>Départ :</label><label class="departure_time">'+date + "-" + departure_time+'</label><label>arrivé :</label><label class="arrival_time">'+date+"-"+arrival_time+'</label></div><div class="addButton"><input type="button" onClick="addToMyBillet(' + id + ')" value="Add"></div><div class="price"><label>'+price+'</label></div></div>'
}

function addMyOneBillet(id, label, departure_time, arrival_time){
	return '<div class="billetClient" id="'+id+'"><div class="billetClientTop"><label>'+label+'</label></div><br><div><label>Départ :</label><label>'+departure_time+'</label><br><label>Arrivé :</label><label>'+arrival_time+'</label></div> </div>'
}

function addAllBillet(from, to){
	var result="";
	var req = new XMLHttpRequest();  
	req.open("GET", "http://localhost:80/Flights", false);
	req.send(null);
	const resJson = JSON.parse(req.responseText);
	console.log(from, to)

	resJson.forEach((i) => {
		if (from == "Tous" && to == "Tous")
			result += addOneBillet(i.id, i.from, i.to, i.date, i.departure_time, i.arrival_time, i.price);
		else if (from == "Tous" && to != "Tous") {
			if (i.to == to) {
				result += addOneBillet(i.id, i.from, i.to, i.date, i.departure_time, i.arrival_time, i.price);
			}
		} else if (from != "Tous" && to == "Tous") {
			console.log(i.from)
			if (i.from == from) {
				result += addOneBillet(i.id, i.from, i.to, i.date, i.departure_time, i.arrival_time, i.price);
			}
		} else if (from != "Tous" && to != "Tous") {
			if (from == i.from && to == i.to)
			result += addOneBillet(i.id, i.from, i.to, i.date, i.departure_time, i.arrival_time, i.price);
		}
	})
	return result;
}

function addAllMyBillet(idClient){
	var result="";
	var req = new XMLHttpRequest();
	req.open("GET", ("http://localhost:80/myFlights/" + idClient), false);
	req.send(null);
	const resJson = JSON.parse(req.responseText);

	resJson.forEach((i) => {
		result += addMyOneBillet(i.id, i.label, i.departure_time, i.arrival_time);
	})
	return result;
}

function addToMyBillet(idFlight) {
	idClient = getIdClient()
	var req = new XMLHttpRequest();
	var url = ("http://localhost:80/myFlights/" + idFlight + "&" + idClient);
	req.open("POST",url, false);
	req.send(null);
	const resJson = JSON.parse(req.responseText);
	window.location.href = "http://localhost:80/home.html?idClient=" + idClient;
}