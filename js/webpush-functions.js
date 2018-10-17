/*
 * Function: sendPush ©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: May 2018
 */
function sendPush(){

	var api = 'api/SendPush.php';

	var post_title = $("#text1").val();
  var post_text = $("#text2").val();
  var post_url = $("#url").val();
  if( $("#segment:checked").val() ) { var post_segment = "All"; } else { var post_segment = "Test"; }

  // Check data posted
  if( (post_title == "")||(post_text == "")||(post_url == "") ){

    swal({
      title: 'Attenzione',
      html: 'Devi compilare tutti i campi richiesti.<br><br>',
      type: 'error',
      showCloseButton: false,
      showCancelButton: false,
      showConfirmButton: true,
      buttonsStyling: false,
      animation: false,
      customClass: 'dialog',
      confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--secondary',
      confirmButtonText: 'Ok',
      allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
    })

  } else {

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
