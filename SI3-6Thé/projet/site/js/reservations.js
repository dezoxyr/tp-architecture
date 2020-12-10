var init = function () {
  loadFlights();
  $('#btnLogout').click(() => logout());
};

var loadFlights = function () {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/flight/",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    data: {
      userId: localStorage.getItem('Id')
    },
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
      location.href = "reservations.html";
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
  '<td><button id="btnCancel' + id + '" class="btn btn-danger">Annuler</button></td>' +
  '</tr>');
  $('#btnCancel' + id).click(() => cancelFlight(id));
};

$(document).ready(function () {
  init();
});
