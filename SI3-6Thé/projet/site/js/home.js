var init = function () {
  loadFlights();
  $('#btnLogout').click(() => logout());
  $('#btnBook').click(() => getInfo());
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
          const sCodeDep = result[i].departureAirport.airportName;
          const sCodeDest = result[i].arrivalAirport.airportName;
          const sDate = result[i].date;
          const sPrice = result[i].price;
          addFlight(i, sCodeDep, sCodeDest, sDate, sPrice);
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

var addFlight = function (index, codeDep, codeDest, date, price) {
  $('#tbody')
  .append('<tr>' +
  '<th scope="row">' + index + '</th>' +
  '<td class="codeDep">' + codeDep + '</td>' +
  '<td class="codeDest">' + codeDest + '</td>' +
  '<td class="date">' + date + '</td>' +
  '<td class="price">' + price + ' €</td>' +
  '<td><button id="btnBook" class="btn btn-success" onclick="bookFlight();">Réserver</button></td>' +
  '</tr>');
};

var bookFlight = function () {
  const sToken = localStorage.getItem('auth_token');
  const oInfo = getInfo();
  $.ajax({
    url: "http://localhost:8080/reservations/book",
    type: 'post',
    data: {
      codeDep: oInfo.codeDep,
      codeDest: oInfo.codeDest,
      date: oInfo.date,
      price: oInfo.price
    },
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      loadFlights();
    }
  });
};

var getInfo = function () {
  let sCodeDep = $(this).closest("tr").find(".codeDep").text();
  let sCodeDest = $(this).closest("tr").find(".codeDest").text();
  let sDate = $(this).closest("tr").find(".date").text();
  let sPrice = $(this).closest("tr").find(".price").text();
  return {
    codeDep: sCodeDep,
    codeDest: sCodeDest,
    date: sDate,
    price: sPrice
  }
}

$(document).ready(function () {
  init();
});
