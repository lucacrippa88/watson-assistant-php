/*************************************
 * Manage post functions Â©
 * Requires: nothing
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


/*
 * Function: saveDataWA Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function saveDataWA(postdata) {

    var seltitle = selectRandomTitle(); // select random title (+ image for confirmation swal: not working!)

    var api = 'api/UpdateDB.php'; // connects and updates the selected DB table

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
            title: seltitle.title,
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


/*
 * Function: publishData Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function publishData(id) {
  $("#publish-post").click(function() {

    var post_id = id; // get id of post: if numeric, edit post; if not numeric (null or something else), create a new post

		var postdata;
		postdata = getAllData(id); // get all data from admin create/edit post page

    postdata.public = true; // set publish (instead of save draft)
    postdata.id = post_id; // insert id to postdata

    var seltitle = selectRandomTitle(); // select random title (+ image for confirmation swal: not working!)

    var api = 'api/UpdateDB.php'; // connects and updates the selected DB table

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
            title: seltitle.title,
            html: 'Il post &egrave; pubblico e visibile da tutti gli utenti del sito.<br><br>',
            type: 'success',
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

  });

}
