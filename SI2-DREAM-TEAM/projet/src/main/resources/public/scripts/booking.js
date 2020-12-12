function loadFlights() {
    $.getJSON("http://localhost:8080/available_flights", function (data) {
        console.log(data);
        $.each(data, function (i, item) {

            var row = $('<tr></tr>');

            var rowData1 = $('<td></td>').text(item["id"]);
            var rowData2 = $('<td></td>').text(item["departureDate"].substring(0, 9));
            var rowData3 = $('<td></td>').text(item["departure"]["name"].concat(" (", item["departure"]["code"], ")"));
            var rowData4 = $('<td></td>').text(item["destination"]["name"].concat(" (", item["destination"]["code"], ")"));
            var rowData5 = $('<td></td>').text(item["price"].toString().concat("€"));

            var SelectData1 = $('<option></option>').text("N°" + item["id"] + " " + item["departure"]["code"] + "-" + item["destination"]["code"] + " " + item["price"] + "€").val(item['id']);

            row.append(rowData1, rowData2, rowData3, rowData4, rowData5);
            $("#available_flights_tab").append(row);
            $("#available_flights_select").append(SelectData1);
        });
    });
}

function btn_book_onClick() {
    console.log($("#available_flights_select option:selected").val());
    $.ajax({
        url: "http://localhost:8080/book",
        type: "POST",
        data: JSON.stringify({
            name: localStorage.getItem("name"),
            id: $("#available_flights_select option:selected").val()
        }),
        contentType: "application/json",
        dataType: "json",
        complete: function (data) {
            console.log(data);
            if (data["status"] == 201) {
                $("#lbl_booked").show();
                $("#strg_booked").show().text($("#available_flights_select option:selected").text());
            }

        }
    });
}

$(document).ready(function () {
    loadFlights();
    $('#btn_book').click(btn_book_onClick);
    $("#btn_disconnect").click(btn_disconnect_onClick);

    if (localStorage.length != 0 && localStorage.getItem("name") != "undefined") {
        $("#btn_book").prop("disabled", false); //allowBooking();
    } else {
        $("#btn_book").prop("disabled", true); //forbidBooking();
    }

    $("#lbl_booked").hide();
    $("#strg_booked").hide();
});
