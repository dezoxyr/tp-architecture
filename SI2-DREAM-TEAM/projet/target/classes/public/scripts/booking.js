$(document).ready(function () {
    $.getJSON("http://localhost:8080/available_flights", function (data) {
        console.log(data);
        $.each(data, function (i, item) {
            var row = $('<tr></tr>');

            // console.log(item["departure"]["name"].concat(" (", item["departure"]["code"], ")"));
            // console.log(item["destination"]["name"].concat(" (", item["destination"]["code"], ")"));
            // console.log(item["price"].toString().concat("€"));
            var rowData1 = $('<td></td>').text(item["id"]);
            var rowData2 = $('<td></td>').text(item["departureDate"].substring(0,9));
            var rowData3 = $('<td></td>').text(item["departure"]["name"].concat(" (", item["departure"]["code"], ")"));
            var rowData4 = $('<td></td>').text(item["destination"]["name"].concat(" (", item["destination"]["code"], ")"));
            var rowData5 = $('<td></td>').text(item["price"].toString().concat("€"));

            var SelectData1 = $('<option></option>').text("N°"+item["id"]+" "+item["departure"]["code"]+"-"+item["destination"]["code"]+" "+item["price"]+"€").val(item['id']);


            row.append(rowData1, rowData2, rowData3, rowData4, rowData5);
            $("#available_flights_tab").append(row);
            $("#available_flights_select").append(SelectData1);

        });
    });

    $('#push').click(function() {

        $.ajax({
            url:"http://localhost:8080/reservation",
            type:"POST",
            data:JSON.stringify({
                name: $('#name').val(),
                id: $("#available_flights_select option:selected").val()
            }),
            contentType:"application/json",
            dataType:"json",
            complete:function(data){
                console.log(data);}
        });
    });
});
