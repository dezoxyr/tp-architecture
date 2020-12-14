var express = require('express');
var serve_static = require('serve-static');
var http = require('http');
var fs = require('fs');

var app = express();
app.use(serve_static(__dirname+"/api"));
var serveur = http.Server(app);

serveur.listen(8080,function()
{
    console.log("Listening to the port 8080");
});

let data = JSON.parse(fs.readFileSync('data.json'));
let trip = new Array();
let airports = data.Airports;

app.get('/airports', function (req, res)
{
	res.send(airports);
});

app.get('/trip', function (req, res)
{
	if(trip.length == 0)
	{
		for(var i = 0 ; i < 10; i++)
		{
			let prix = randomInt(200,1000);
			trip.push([randomTab(airports),randomTab(airports),prix]);
		}
	}

	res.send(trip);
});

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
let user = new Array();

app.post('/register',function(req,res)
{
	var newUser = JSON.parse(req.body.data);

	if(i = existUser(newUser) < 0)
	{
		user.push(newUser);
		res.send(true);
	}

	console.log(user);
})

app.post('/user',function(req,res)
{
	let newUser = JSON.parse(req.body.data);
	console.log("checking...");

    var i = existUser(newUser);
	if(i < 0)
		res.send('-1');
	else
		res.send(JSON.stringify(user[i]));
	
	console.log(user);
})

app.post('/saveUser',function(req,res)
{
	let saveUser = JSON.parse(req.body.data);
	console.log("save...");
	var i = existUser(saveUser);
	if(i < 0){
		console.log('error save');
		res.send(false);
	}else{
		user[i] = saveUserAccount(saveUser,user[i]);
		res.send(true);
	}
	console.log(user);
})

function randomInt(min=0, max=1)
{
	min = Math.ceil(min);
	max = Math.floor(max);
  	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomTab(tab)
{
    if(!Array.isArray(tab))
    {
		console.log("It's not an array");
		return false;
	}

    if(tab.length < 1)
    {
		console.log("The array length is egual to 0")
		return false;
	}

	return Math.floor(Math.random() * tab.length);
}

function existUser(newUser)
{

    for (var i = 0; i < user.length; i++)
    {
		
		if(user[i].nom == newUser.nom
			&& user[i].prenom == newUser.prenom
            && user[i].mail == newUser.mail)
            {
			return i;
		}
	}
	
	return -1;
}

function saveUserAccount(newUser,oldUser)
{

    if(oldUser.nom != newUser.nom)
    {
		oldUser.nom = newUser.nom;
	}

    if(oldUser.prenom != newUser.prenom)
    {
		oldUser.prenom = newUser.prenom;
	}

    if(oldUser.mail != newUser.mail)
    {
		oldUser.mail = newUser.mail;
	}

	if(JSON.stringify(oldUser.trips) != JSON.stringify(newUser.trips)){
		oldUser.trips = newUser.trips;
	}

	return oldUser;
}
