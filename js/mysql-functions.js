/*************************************
 * Watson Assistant to MySQL functions ©
 * Requires: sweetalert2
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


/*
 * Function: saveDataWA ©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di draft
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: October 2018
 */
function saveDataWA(postdata) {

    var api = 'link-to-your-du-update-api'; // connects and updates the selected DB table

    $.ajax({
      url: api,
      type: 'POST',
      data: postdata,
      dataType: 'json',
      async: true,
      success: function(result) {
        var obj = result.Response;

        // Check connection
        if (obj.connected != "ok") {
          swal({
            title: 'Errore connessione DB',
            html: obj.connected + '<br><br>',
            customClass: 'dialog',
            buttonsStyling: false,
            confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
            confirmButtonText: 'Ok',
            type: 'error'
          }).then(function() {
            window.location.replace("/" + admin_page + "/" + list_page) // redirect after clicking "ok"
          })
        }

        // Check update
        else if (obj.updated != "ok") {
          swal({
            title: 'Errore update DB',
            html: obj.updated + '<br><br>',
            customClass: 'dialog',
            buttonsStyling: false,
            confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
            confirmButtonText: 'Ok',
            type: 'error',
          }).then(function() {
            window.location.replace("/" + admin_page + "/" + list_page) // redirect after clicking "ok"
          })
        }

        // DB updated!
        else if (obj.updated == "ok") {
          swal({
            title: 'Contenuto pubblicato!',
            html: 'Watson Assistant ha salvato il post in bozza.<br><br>',
            // type: 'success',
						imageUrl: 'img/watson.png',
						imageWidth: 200,
						imageHeight: 186,
						imageAlt: 'Watson logo',
            showCloseButton: false,
            showCancelButton: false,
            showConfirmButton: true,
            buttonsStyling: false,
            animation: false,
            customClass: 'dialog',
            confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
            confirmButtonText: 'Ok',
            allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
          }).then(function() {
            window.location.replace("/" + admin_page + "/" + list_page) // redirect after clicking "ok"
          })
        }

      } // end of function
    }); // end of ajax call

}
