/* ======================================================= */
/* ---------------------- < main > ----------------------- */
/* ======================================================= */
let voyages;	// list of object voyages

/*! \brief initialise le tableau des voyages */
async function mainInitWeb(ID_list_Voyages){

	voyages = new ListTrip(ID_list_Voyages);
	await voyages.loadVoyages();
	voyages.displayListTrip();
}

/* ======================================================= */
/* ------------------- < Reservation > ------------------- */
/* ======================================================= */

/*! \brief Display or not, the popup "connection" */
function reserver(id_voyage){

	if(!sessionStorage.getItem('userCurrent')){
		//Connection user
		connexionBan(id_voyage);
	}else{
		//Add this trip in user's list
		let user = sessionStorage.getItem('userCurrent');
		user = JSON.parse(user);
		user = new USER(user.nom,user.prenom,user.mail,user.voyages);

		user.reservation(voyages.getOneVoyage(id_voyage));
		sessionStorage.setItem('userCurrent',JSON.stringify(user));

		desactiverButton('button_tab');
		
		setTimeout(function(){
			document.location.href="view/user.html";
		},10);
	}
}

/*! \brief Display title : connexion or the airport of departure And airport of destination */
function connexionBan(id_voyage=-1){
	let connexion = document.getElementById('connexion');
	connexion.style.display = "flex";
	let title = document.getElementById('title_reservation');
	let voyagesList = voyages.Voyages;

	if(id_voyage >= 0){
		title.innerHTML = "Réservation pour \
		"+ voyagesList[id_voyage].depart.nom +" - "+ voyagesList[id_voyage].destination.nom +"\
		<input type=\"hidden\" name=\"id_voyage\" value='"+id_voyage+"'/>";
	}else{
		title.innerHTML = "Connexion";
	}

}

/*! \brief verfication of form to the connection */
async function newUser(form){
	form = document.getElementById('form_connexion');

	let nom = form.elements['nom_user'].value;
	let prenom = form.elements['prenom_user'].value;
	let mail = form.elements['mail'].value;
	let id_voyage = form.elements['id_voyage'] ? form.elements['id_voyage'].value : -1;

	let error = document.getElementsByClassName('erreur');

	if(nom == ''){
		error[0].innerHTML = "Le champs est vide";
		return false;
	}else{
		error[0].innerHTML = "";
	}

	if(prenom == ''){
		error[1].innerHTML = "Le champs est vide";
		return false;
	}else{
		error[1].innerHTML = "";
	}

	if(mail ==''){
		error[2].innerHTML = "Le champs est vide";
		return false;
	}else{
		error[2].innerHTML = "";
	}

	if(!sessionStorage.getItem('userCurrent')){
		let newUser = new USER(nom,prenom,mail);

		if(id_voyage >= 0)
			newUser.reservation(voyages.getOneVoyage(id_voyage));

		var result = await axiosSend('user',JSON.stringify(newUser));

		if(result.data == -1){
			if(confirm("Voulez-vous inscrire avec ces informations ?")){
				var result = await axiosSend('regist',JSON.stringify(newUser));

				if(result.data){
					sessionStorage.setItem('userCurrent',JSON.stringify(newUser));
					document.location.href ='view/user.html';
				}
			}
		}else{
			if(id_voyage >= 0){
				result.data.voyages.push(voyages.getOneVoyage(id_voyage));
			}

			sessionStorage.setItem('userCurrent',JSON.stringify(result.data));
			document.location.href ='view/user.html';			
		}

	}else{
		return false;
	}

}

/*! \brief To go to account page or connection if the user is not connected */
function userAccount(){
	if(!sessionStorage.getItem('userCurrent')){
		connexionBan();
	}else{
		document.location.href="view/user.html";
	}
}

/*! \brief  To close popup of connection */
function closePopup(){
	document.getElementById('connexion').removeAttribute('style');
}

function homeBack(){
	document.location.href = "index.html";
}
