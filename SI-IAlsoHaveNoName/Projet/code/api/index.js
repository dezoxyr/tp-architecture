
let trips;
async function mainInitWeb(ID_Trips_List)
{
	let Airports;

	Airports = new ListAirports('Airports');
	await Airports.loadAirports();

	trips = new ListTrip(ID_Trips_List,Airports.AirportsList);
	await trips.loadTrips();
	trips.displayListTrips();
}

function book(ID_Trip)
{

    if(!sessionStorage.getItem('userCurrent'))
		connection(ID_Trip);
    
    else
    {
		let user = sessionStorage.getItem('userCurrent');
		user = JSON.parse(user);
		user = new USER(user.name,user.firstname,user.mail,user.trips);

		user.booking(trips.getTrip(ID_Trip));
		sessionStorage.setItem('userCurrent',JSON.stringify(user));

		hide_button('button_tab');
		
        setTimeout(function()
        {
			document.location.href="../user.html";
		},10);
	}
}

function connection(ID_Trip=-1)
{
	let title = document.getElementById('book_title');
	let trips_list = trips.trips;

    if(ID_Trip >= 0)
    {
		title.innerHTML = "booking for \
		"+ trips_list[ID_Trip].departure.name +" - "+ trips_list[ID_Trip].arrival.name +"\
		<input type=\"hidden\" name=\"ID_Trip\" value='"+ID_Trip+"'/>";
    }
    else
		title.innerHTML = "connection";
	

}

async function addUser(form)
{
	form = document.getElementById('form_connexion');

	let name = form.elements['name'].value;
	let firstname = form.elements['firstname'].value;
	let mail = form.elements['mail'].value;
	let ID_Trip = form.elements['ID_Trip'] ? form.elements['ID_Trip'].value : -1;

	let error = document.getElementsByClassName('error');

    if(name == '')
    {
		error[0].innerHTML = "Field empty";
		return false;
    }
    else
		error[0].innerHTML = "";

    if(firstname == '')
    {
		error[1].innerHTML = "Field empty";
		return false;
    }
    else
		error[1].innerHTML = "";

    if(mail =='')
    {
		error[2].innerHTML = "Field empty";
		return false;
    }
    else
		error[2].innerHTML = "";

    if(!sessionStorage.getItem('userCurrent'))
    {
		let addUser = new User(name,firstname,mail);

		if(ID_Trip >= 0)
			addUser.booking(trips.getTrip(ID_Trip));

		var result = await axiosSend('user',JSON.stringify(addUser));

        if(result.data == -1)
        {
            if(confirm("Are you sure ?"))
            {
				var result = await axiosSend('register',JSON.stringify(addUser));

                if(result.data)
                {
					sessionStorage.setItem('userCurrent',JSON.stringify(addUser));
					document.location.href ='../user.html';
				}
			}
        }
        else
        {
            if(ID_Trip >= 0)
            {
				result.data.trips.push(trips.getTrip(ID_Trip));
			}

			sessionStorage.setItem('userCurrent',JSON.stringify(result.data));
			document.location.href ='../user.html';			
		}

    }
    else
		return false;
}

function userAccount()
{
    if(!sessionStorage.getItem('userCurrent'))
		connection();
	else
		document.location.href="../user.html";
	
}

function closePopup()
{
	document.getElementById('connection').removeAttribute('style');
}

function homeBack()
{
	document.location.href = "index.html";
}
