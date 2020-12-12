$(document).ready(function () {
    $("#btn_login").click(btn_login_onClick);
    $("#btn_disconnect").click(btn_disconnect_onClick);

    if (localStorage.length != 0 && localStorage.getItem("name") != "undefined") {
        forbidConnection();
    } else {
        allowConnection();
    }
})

function allowConnection() {
    $("#btn_disconnect").hide();
    $("#lbl_name").hide();
    $("#ipt_name_login").show();
    $("#btn_login").show();
}

function forbidConnection() {
    $("#btn_disconnect").show();
    $("#lbl_name").show();
    $("#strg_name").text(localStorage.getItem("name"));
    $("#ipt_name_login").hide();
    $("#btn_login").hide();
}

function btn_login_onClick() {
    $.ajax({
        url: "http://localhost:8080/login",
        type: "POST",
        data: JSON.stringify({
            name: $('#ipt_name_login').val()
        }),
        contentType: "application/json",
        dataType: "json",
        complete: function (data) {
            console.log(data);

            let json = data["responseJSON"];
            localStorage.setItem("name", json["name"]);
            let tickets = data["status"] == 201 ? [] : json["tickets"];
            localStorage.setItem("tickets", tickets);

            forbidConnection();
        }
    });
}

function btn_disconnect_onClick() {
    localStorage.clear();
    location = "../index.html";
}