$(document).ready(function () {
    $.getJSON("http://localhost:8080/tickets?name=thibaud", function (data) {
        console.log(data);
        $.each(data, function (i, item) {

            var row = $('<tr></tr>');

            var rowData1 = $('<td></td>').text(item["flight"]["id"]);
            var rowData2 = $('<td></td>').text(item["flight"]["departureDate"].substring(0, 9));
            var rowData3 = $('<td></td>').text(item["flight"]["departure"]["name"].concat(" (", item["flight"]["departure"]["code"], ")"));
            var rowData4 = $('<td></td>').text(item["flight"]["destination"]["name"].concat(" (", item["flight"]["destination"]["code"], ")"));
            var rowData5 = $('<td></td>').text(item["flight"]["price"].toString().concat("€"));

            row.append(rowData1, rowData2, rowData3, rowData4, rowData5);
            $("#reserved_flights").append(row);

        });
    });
});