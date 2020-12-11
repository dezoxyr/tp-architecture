var init = function () {
  saveUserId()
  loadFlights();
  $('#btnLogout').click(() => logout());
};

var loadFlights = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/flight/",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          const sId = result[i].id;
          const sCodeDep = result[i].departureAirport.airportName + " (" + result[i].departureAirport.airportCode + ")";
          const sCodeDest = result[i].arrivalAirport.airportName + " (" + result[i].arrivalAirport.airportCode + ")";
          const sDate = result[i].date;
          const sPrice = result[i].price;
          addFlight(sId, sCodeDep, sCodeDest, sDate, sPrice);
        }
      }
    }
  });
};

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

var saveUserId = function() {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/user/information",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        localStorage.setItem('Id', result.id);
      }
    },
    error : function() {
      location.href = "index.html";
    }
  });
};

var addFlight = function (id, codeDep, codeDest, date, price) {
  $('#tbody')
  .append('<tr>' +
  '<th id="' + id + '">' + id + '</th>' +
  '<td class="codeDep">' + codeDep + '</td>' +
  '<td class="codeDest">' + codeDest + '</td>' +
  '<td class="date">' + date + '</td>' +
  '<td class="price">' + price + ' €</td>' +
  '<td>' +
  '<select class="custom-select custom-select-sm sm-3 persons' + id + '">' +
  '<option value="1" selected>1</option>' +
  '<option value="2">2</option>' +
  '<option value="3">3</option>' +
  '<option value="4">4</option>' +
  '<option value="5">5</option>' +
  '<option value="6">6</option>' +
  '<option value="7">7</option>' +
  '<option value="8">8</option>' +
  '<option value="9">9</option>' +
  '</select>' +
  '</td>' +
  '<td><button id="btnBook' + id + '" class="btn btn-success">Réserver</button></td>' +
  '</tr>');
  $('#btnBook' + id).click(() => bookFlight(id));
};

var bookFlight = function (id) {
  const sToken = localStorage.getItem('auth_token');
  const sNbPersons = getNbPersons(id);
  $.ajax({
    url: "http://localhost:8080/flight/book",
    type: 'post',
    data: {
      flightId: id,
      userId: localStorage.getItem('Id'),
      nbPersons: sNbPersons
    },
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      $('#message').html(
      "<div id=\"alert\" class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">" +
      "La réservation pour le vol numéro " + id + " a été effectuée avec succès" +
      "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
      "<span aria-hidden=\"true\">&times;</span>" +
      "</button>" +
      "</div>");
    },
    error: function (xhr) {
      if (xhr.status === 500) {
        $('#message').html(
        "<div id=\"alert\" class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">" +
        "Vous avez déjà réservé ce vol" +
        "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
        "<span aria-hidden=\"true\">&times;</span>" +
        "</button>" +
        "</div>");
      }
    }
  });
};

var getNbPersons = function (id) {
  return $(".persons" + id).val();
}

$(document).ready(function () {
  init();
});
