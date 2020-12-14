if(!sessionStorage.getItem('userCurrent'))
	window.location.href = "../index.html";

let user = sessionStorage.getItem('userCurrent');
user = JSON.parse(user);

user = new USER(user.name,user.firstname,user.mail,user.trips);

function mainInitWeb(list)
{
	list = document.getElementById(list);
	user.displayUserTrips(list);
}

function cancel(ID_Trip)
{
	hide_button('button_tab');
	user.canceling(ID_Trip);
	sessionStorage.setItem('userCurrent',JSON.stringify(user));
	document.location.reload();
}

function disconnect()
{
    if(confirm("Are you sure you want to log off ?"))
    {
		sessionStorage.clear();
		document.location.href = '../index.html';
	}
}

function homeBack()
{
	document.location.href = "../index.html";
}
