var init = function () {
  $("#btnLogin").click(() => login());
  $('#btnSignup').click(() => signup());
}

var login = function () {
  const sUsername = $('#inputLogin').val();
  const sPassword = $('#inputPassword').val();
  $('#loginError').css('display', 'none');
  if (sUsername.length === 0 || sPassword.length === 0) {
    $('#loginError').html("Veuillez renseigner tous les champs");
    $('#loginError').css('display', 'block');
  } else {
    $.ajax({
      url: "http://localhost:8080/login",
      type: 'post',
      data: {
        username: sUsername,
        password: sPassword
      },
      success : function (result) {
        if (result && result.token.length > 1) {
          $('#loginError').css('display', 'none');
          localStorage.setItem('auth_token', result.token);
          saveUserId()
          location.href = "home.html";
        }
      },
      error : function() {
        $('#loginError').html("Nom d'utilisateur/Mot de passe invalide(s)");
        $('#loginError').css('display', 'block');
      }
    });
  }
};

function saveUserId() {
  const sToken = localStorage.getItem('auth_token');
  $.ajax({
    url: "http://localhost:8080/user/information",
    type: 'get',
    headers: {"Authorization": "Bearer " + sToken},
    success : function (result) {
      if (result) {
        localStorage.setItem('Id', result.id);
      }
    }
  });
};

var signup = function () {
  location.href = "signup.html";
};

$(document).ready(function () {
  init();
});
