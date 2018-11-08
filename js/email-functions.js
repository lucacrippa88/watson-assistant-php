/*************************************
 * Send email functions ©
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Requires: php/SendEmail.php, chatbot.js
 * Status: currently unstable / out of service
 *************************************/


// Main sendmail function
function sendEmailWA(data) {

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
            allowOutsideClick: false // prevent user by clicking outside instead of clicking "ok"
          }).then(function () {
            window.location.replace("/") // redirect after clicking "ok"
          })

        }

      } // end of function
    }); // end of ajax call

});
