$(document).ready(function() {
    console.log( "ready!" );

    /*const sendData = () => {
        let firstname = $('#firstname').val();
        let lastname = $('#lastname').val();
        
        $.post("/user/signin", { firstname: firstname, lastname: lastname })
         .done(function( data ) {
            //alert( "Data Loaded: " + data );
        });
    }

    $('#submit-signin').click(e => {
        e.preventDefault(); //retirer la tentative d'envoi de données //retire son comportement par défaut
        sendData();
    });*/


    $('#btn1').click(e => {
        e.preventDefault();

        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();
        //console.log(firstname)
        window.location.replace("/user/billet/1?firstname="+firstname+"&lastname="+lastname);
        
        /*$.post("/airport", { departure:'Paris', destination:'New York', code:'CDG'})
        .done(function( data ) {
            //alert( "Data Loaded: " + data );
        });*/
    })

    $('#btn2').click(e => {
        e.preventDefault();
        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();

        window.location.replace("/user/billet/2?firstname="+firstname+"&lastname="+lastname);
    })

    $('#btn3').click(e => {
        e.preventDefault();
        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();

        window.location.replace("/user/billet/3?firstname="+firstname+"&lastname="+lastname);
    })

    $('#btn4').click(e => {
        e.preventDefault();
        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();

        window.location.replace("/user/billet/4?firstname="+firstname+"&lastname="+lastname);
    })

    $('#btn5').click(e => {
        e.preventDefault();
        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();

        window.location.replace("/user/billet/5?firstname="+firstname+"&lastname="+lastname);
    })

    $('#btn6').click(e => {
        e.preventDefault();
        let firstname = $('#megafirstname').val();
        let lastname = $('#megalastname').val();
        
        window.location.replace("/user/billet/6?firstname="+firstname+"&lastname="+lastname);
    })
});
