// Set subject as requested
// Get subject from url
var subject = getURLParameter("subject");
$(document).ready(function() {
  if(subject != null) {
    $("#usersubject").val(subject);
  }
});


// main sendmail function
$("#submitmessage").click(function() {

  var data = {
      UserSubject: $("#usersubject").val(),
      UserName: $("#username").val(),
      UserEmail: $("#useremail").val(),
      UserComments: $("#usercomments").val(),
      UserAuth: $('#userauth').is(":checked"),
      UserCaptcha: grecaptcha.getResponse()
  };

   console.log(data);

    $.ajax(
    {
      url: '/api/SendEmail.php', // retrieve page contents
      type: 'POST',
      data: data,
      dataType: 'json',
      success: function(data)
      {
        var obj = data.Sent;
        if(obj.payload == "sent"){

          swal({
            title: 'Grazie!',
            html: 'Messaggio inviato correttamente!<br><br>',
            type: 'success',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: true,
            buttonsStyling: false,
            animation: false,
            customClass: 'mdl-dialog',
            confirmButtonClass: 'mdl-button',
            confirmButtonText: 'Ok',
            allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
          }).then(function () {
            window.location.replace("/") // redirect after clicking "ok"
          })

        }
        if(obj.payload == "error"){

          swal({
            title: 'Errore',
            html: 'Controlla i dati mancanti.<br><br>',
            customClass: 'mdl-dialog',
            buttonsStyling: false,
            confirmButtonClass: 'mdl-button',
            confirmButtonText: 'Ok',
            // showCancelButton: true,
            // cancelButtonClass: 'mdl-button close',
            // cancelButtonText: 'Annulla',
            type: 'error'
          })

        }
        // if(obj.payload == "errorauth"){
        //
        //   swal({
        //     title: 'Errore',
        //     html: 'Devi autorizzarmi al trattamento dei tuoi dati personali ai sensi degli art. 13-14 del GDPR 2016/679.<br><br>',
        //     customClass: 'dialog',
        //     buttonsStyling: false,
        //     confirmButtonClass: 'but flat blue-trans right',
        //     confirmButtonText: 'Ok',
        //     type: 'error'
        //   })
        //
        // }

      } // end of function
    }); // end of ajax call

});
