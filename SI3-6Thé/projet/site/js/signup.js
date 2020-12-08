var init = function() {
  $("#btnSignup").click(() => signup());
  $('#btnCancel').click(() => cancel());
};

var signup = function() {
  const sUsername = $('#inputLogin').val();
  const sMail = $('#inputMail').val();
  const sPassword = $('#inputPassword').val();
  const sConfirmPassword = $('#inputConfirmPassword').val();
  $('#error').css('display', 'none');
  if (sUsername.length === 0 || sMail.length === 0 || sPassword.length === 0 || sConfirmPassword.length === 0) {
    $('#error').css('display', 'block');
    $('#error').html('Veuillez renseigner tous les champs');
  } else if (!sMail.includes('@')) {
    $('#error').css('display', 'block');
    $('#error').html('Veuillez rentrer un mail valide');
  } else if (sPassword !== sConfirmPassword) {
    $('#error').css('display', 'block');
    $('#error').html('Vos deux mots de passe sont différents. Veuillez réessayer');
  } else {
    $.ajax({
      url: "http://localhost:8080/user/new",
      type: 'post',
      data: {
        username: sUsername,
        password: sPassword,
        mail: sMail
      },
      success : function(result) {
        location.href = "index.html";
      },
      error : function() {
        $('#error').css('display', 'block');
        $('#error').html('Utilisateur déjà existant');
      }
    });
  }
};

var cancel = function () {
  location.href = "index.html";
};

$(document).ready(function(){
  init();
});
