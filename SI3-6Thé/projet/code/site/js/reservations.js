var init = function () {
  loadFlights();
  $('#btnLogout').click(() => logout());
};

var loadFlights = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/flight/bookings",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    data: {
      userId: localStorage.getItem('Id')
    },
    success : function (result) {
      if (result) {
        for (let i = 0; i < result.length; i++) {
          const sId = result[i].flight.id;
          const sCodeDep = result[i].flight.departureAirport.airportName + " (" + result[i].flight.departureAirport.airportCode + ")";
          const sCodeDest = result[i].flight.arrivalAirport.airportName + " (" + result[i].flight.arrivalAirport.airportCode + ")";
          const sDate = result[i].flight.date;
          const iPrice = result[i].flight.price;
          const iNbPersons = result[i].nbPersons;
          addFlight(sId, sCodeDep, sCodeDest, sDate, iPrice, iNbPersons);
        }
      }
    },
    error: function () {
      location.href = "index.html";
    }
  });
};

var logout = function () {
  localStorage.setItem('auth_token', '');
  localStorage.setItem('Id', '');
  location.href = "index.html";
};

var cancelFlight = function (id) {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/flight/cancel",
    type: 'post',
    data: {
      flightId: id,
      userId: localStorage.getItem('Id')
    },
    headers: {"Authorization": "Bearer " + sToken},
    complete : function (result) {
      $('#tbody').html("");
      loadFlights();
      $('#message').html(
      "<div id=\"alert\" class=\"alert alert-success alert-dismissible fade show\" role=\"alert\">" +
      "La réservation pour le vol numéro " + id + " a été annulée avec succès" +
      "<button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">" +
      "<span aria-hidden=\"true\">&times;</span>" +
      "</button>" +
      "</div>");
    }
  });
};

var addFlight = function (id, codeDep, codeDest, date, price, nbPersons) {
  $('#tbody')
  .append('<tr>' +
  '<th id="' + id + '">' + id + '</th>' +
  '<td class="codeDep">' + codeDep + '</td>' +
  '<td class="codeDest">' + codeDest + '</td>' +
  '<td class="date">' + date + '</td>' +
  '<td class="price">' + price * nbPersons + ' €</td>' +
  '<td class="persons">' + nbPersons + '</td>' +
  '<td><button id="btnCancel' + id + '" class="btn btn-danger">Annuler</button></td>' +
  '</tr>');
  $('#btnCancel' + id).click(() => cancelFlight(id));
};

$(document).ready(function () {
  init();
});
