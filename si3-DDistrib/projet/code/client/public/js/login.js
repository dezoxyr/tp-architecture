var req = new XMLHttpRequest();

async function submit() {
	const email = document.getElementById('email').value;
	console.log(email);
	try {
		req.open("GET", ("http://localhost:80/client/" + email), false);
		req.send(null);
		const responseJson = JSON.parse(req.responseText);
		window.location.href = 'http://localhost:80/home.html?idClient=' + responseJson.id;
	} catch (error) {
		console.log("There is an error : " + error);
	}
}