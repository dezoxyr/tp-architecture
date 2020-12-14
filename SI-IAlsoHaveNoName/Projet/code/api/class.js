class Airport
{
    constructor(name,code)
    {
		this.name = name;
		this.code = code;
	}

	displayAirport(){
		console.log(this.name + " " + this.code);
	}
}

class Trip
{
    constructor(departure,arrival,price)
    {
		this.departure = departure;
		this.arrival = arrival;
		this.price = price;
	}

    displayTrips(i,User=false)
    {
		let departure = this.departure.name + " " + this.departure.code;
		let arrival = this.arrival.name + " " + this.arrival.code;
		let price = this.price  + "€";
		let input;

		if(User)
			input = "<input class=\"button_tab\" type=\"button\" onClick=\"Cancel("+i+")\" value=\"Cancel\">";
		else
			input = "<input  class=\"button_tab\" type=\"button\" onClick=\"Book("+i+")\" value=\"Book\">";
		

		return "<tr>\
					<td class=\"flights\">\
						<h3>"+ departure +" - "+ arrival +"</h3>\
					</td>\
					<td class=\"price\">\
						<span>"+price+"</span>\
					</td>\
					<td class=\"in_action\">\
						"+input+"\
					</td>\
				</tr>";
	}
}

class User
{
    constructor(name,firstname,mail,trips)
    {
		this.name = name;
		this.firstname = firstname;
		this.mail = mail;

        if(Array.isArray(trips) && trips != 'undefined')
        {
			this.trips = new Array();
            if(trips.length > 0)
            {
                for (var i = 0; i < trips.length; i++)
                {
					this.trips.push(new Trip(trips[i].departure,trips[i].arrival,trips[i].price));
				}
			}
        }
        else
			this.trips = new Array();
		
	}

    booking(Trip)
    {
		this.trips.push(Trip);
	}

    canceling(ID_Trip)
    {
		this.trips.splice(ID_Trip, 1);
	}

    displayUserTrips(list)
    {
        if(this.trips.length == 0)
        {
			list.innerHTML = "\
			<tr>\
				<td colspan='3' style='text-align:center'>No booked trips.</td>\
			</tr>";
        }
        else
        {
            for (var i = 0; i < this.trips.length; i++)
            {
				list.innerHTML += this.trips[i].displayTrips(i,true);
			}
		}
	}

}

class ListTrip
{
    constructor(ID_div,AirportsList)
    {
		this.ID_div = ID_div;
		this.AirportsList = AirportsList;
		this.trips = new Array();
	}

    async loadTrips()
    {
		console.log('loading trips...');
		var res = await axiosLoad('trips');

		let departure,arrival,price;

        for(var i = 0 ; i < res.data.length; i++)
        {
			departure = this.AirportsList[res.data[i][0]];
			arrival = this.AirportsList[res.data[i][1]];
			price = res.data[i][2];

			this.trips.push(new Trip(departure,arrival,price));
		}

		console.log('update trips');
	}

    displayListTrip()
    {
		var list = document.getElementById(this.ID_div);

		list.innerHTML = "";
        for (var i = 0; i < this.trips.length; i++)
        {
			list.innerHTML += this.trips[i].displayTrips(i,false);
		}
	}

    getTrip(id)
    {
		if(id < this.trips.length)
			return this.trips[id];
		else
			return false;
	}
}

class ListAirports
{
    constructor(data)
    {
		this.AirportsList = new Array();
		this.data = data;
	}

    async loadAirports()
    {
		console.log('loading airports...');
		var res = await axiosLoad(this.data);
        for (var i = 0; i < res.data.length; i++)
        {
		 	this.AirportsList.push(new Airport(res.data[i].name,res.data[i].code));
		}
		console.log('update airports');
	}

}

function axiosLoad(data)
{
	return new Promise(resolve => {
		try{
			const res = axios.get(data+"/");
			resolve(res);
		}catch(e){
			console.log(e);
		}
	});
}

function axiosSend(url,data)
{
    if(!data)
    {
		console.log("No data");
		return false;
	}

	return new Promise(resolve => {
		try{
			const res = axios.post(url+'/',{
				data:data
			});

			resolve(res);
		}catch(e){
			console.log(e);
		}
	});
}

function hide_button(className)
{	
	var button_tab = document.getElementsByClassName(className);
    for (var i = 0; i < button_tab.length; i++)
    {
		button_tab[i].disabled='disabled';
	}
}

if(sessionStorage.getItem('userCurrent'))
{
    window.addEventListener("beforeload", async function(event)
    {

        try
        {
			var res = await axiosSend("../saveUser",JSON.stringify(User));
            if(!res.data)
            {
				Alert('Une erreur est survenue');
		    }
        }
        catch(e)
        {
			event.preventDefault();
			console.log(e);
		}

		return null;
	});
}
