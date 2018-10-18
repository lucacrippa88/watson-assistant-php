/*
 * Function: sendPush ©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: May 2018
 */
function sendPush(){

	var api = 'php/CreatePush.php';

	var post_title = $("#text1").val();
  var post_text = $("#text2").val();
  var post_url = $("#url").val();
  var post_segment = "All";


    $.ajax({
      url: api,
      type: 'POST',
      data: {
        title: post_title,
        text: post_text,
        url: post_url,
        segment: post_segment
      },
      dataType: 'json',
      async: false, // must be synchronous to enable swal on confirm
      success: function(result) {

        if(result.Response.sent == "ok"){
          swal({
            title: 'Push inviata!',
            html: 'I tuoi utenti sono appena stati notificati.<br><br>',
            type: 'success',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: true,
            buttonsStyling: false,
            animation: false,
            customClass: 'dialog',
            confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
            confirmButtonText: 'Grande!',
            allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
          }).then(function() {
            location.reload() // redirect after clicking "ok"
          })
        }

     }

    });

  }

}
