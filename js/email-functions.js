/*************************************
 * Send email functions ©
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Requires: php/SendEmail.php, chatbot.js
 * Status: currently unstable / out of service
 *************************************/


// Main sendmail function
$("#submitmessage").click(function() {

  // NEED TO GET CONTEXT FROM WATSON ASSISTANT CHATBOT!
  // Values should be retrieved from context variables
  // To be updated!

    $.ajax(
    {
      url: 'php/SendEmail.php', // retrieve page contents
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
            type: 'error'
          })

        }

      } // end of function
    }); // end of ajax call

});
