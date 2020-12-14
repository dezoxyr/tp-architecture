/*! \brief redirection to home page
* If you are not connected you go back on home page
*/
if(!sessionStorage.getItem('userCurrent'))
	window.location.href = "../index.html";

/*! \brief load tab of trip's user */
let user = sessionStorage.getItem('userCurrent');
user = JSON.parse(user);

user = new USER(user.nom,user.prenom,user.mail,user.voyages);

function mainInitWeb(list){
	list = document.getElementById(list);
	user.displayVoyagesUser(list);
}


/*! \brief Function to cancel a reservation
*/
function annuler(id_voyage){
	desactiverButton('button_tab');
	user.annulation(id_voyage);
	sessionStorage.setItem('userCurrent',JSON.stringify(user));
	document.location.reload();
}

/*! 
* \brief Function to disconnect of session but there is a save of user session on server
*/
function disconnect(){
	// console.log(user);
	if(confirm("Déconnexion... Voulez-vous continuer ?")){
		sessionStorage.clear();
		document.location.href = '../index.html';
	}
}

/*! \brief back to home */
function homeBack(){
	document.location.href = "../index.html";
}
