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



/*
 * Function: retrieveData Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function retrieveData(id) {

  var post_id = id;
  var api = 'api/RetrievePostDB.php'; // connects and updates the selected DB table

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      i: post_id
    },
    dataType: 'json',
    async: true,
    success: function(result) {

      for (var i in result.Response) {
        var obj = result.Response[i];

        $("#select1 > [value='" + obj.select1 + "']").prop("selected", "true");
        $("#select2 > [value='" + obj.select2 + "']").prop("selected", "true");

        var maincontent;
        maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
        maincontent = jQuery.parseJSON(maincontent);

        $('#text0').val(maincontent.text0);
        $('#text0').next('label').addClass("active");
        $('#text1').val(maincontent.text1);
        $('#text1').next('label').addClass("active");
        $('#text2').val(maincontent.text2);
        $('#text2').next('label').addClass("active");
        $('#text3').val(maincontent.text3);
        $('#text3').next('label').addClass("active");
        $('#text4').val(maincontent.text4);
        $('#text4').next('label').addClass("active");
        $('#text5').val(maincontent.text5);
        $('#text5').next('label').addClass("active");

        // Check if option exists and then append to the select if the option is custom
        var optionExists = ($('#select3 option[value="' + maincontent.text6 + '"]').length > 0);
        if (!optionExists) {
          $("#select3").append($('<option>', {
            value: maincontent.text6,
            text: maincontent.text6
          }).attr('selected', 'selected'));
        } else {
          $("#select3 > [value='" + maincontent.text6 + "']").attr('selected', 'selected');
        }

        $('#text7').val(maincontent.text7);
        $('#text7').next('label').addClass("active");
        $('#text8').val(maincontent.text8);
        $('#text8').next('label').addClass("active");

        // Update uploaded files list
        if (maincontent.uploads != "") {
          for (var j in maincontent.uploads) {
            var upload = maincontent.uploads[j];
            $(".put-files-here").append("<li class=''><p class='upload2-file' style='left:10px;'>" + upload.file + "</p><span class='delete-file'></span>");
          }
        }
        // Remove uploaded file on click on trash icon
        $('.delete-file').click(function() {
          $(this).closest("li").remove();
        });

				$('#textarea1').html(maincontent.textarea1);
				$('#textarea2').val(maincontent.textarea2);
        $('#text8').next('label').addClass("active");
        $('#url').val(obj.url);
        $('#url').next('label').addClass("active");

        initQuillEditor('#textarea1'); // Reinitialize Quill Editor
        $('.ql-toolbar:first').remove(); // Remove previous Quill Editor toolbar

        if (obj.check1 == "true") {
          $('#check1').prop('checked', true);
        }
        if (obj.check2 == "true") {
          $('#check2').prop('checked', true);
        }
        if (obj.check3 == "true") {
          $('#check3').prop('checked', true);
        }

        // Manage datetimes
        var datetimes = obj.datetimes;
        datetimes = jQuery.parseJSON(datetimes);

        for (var i in datetimes) {
          updateDatetime(datetimes[i].date, datetimes[i].time, i);
        }

        // Manage chips
        var chips = obj.chips1;
        chipsdatajson = jQuery.parseJSON(chips);

        $('.chips-initial').material_chip({ // Add existing chips and enable editing them
          data:chipsdatajson,
        });

				$('#posted').append("Postato: "+obj.posted);
				$('#updated').append("Ultima modifica: "+obj.updated);

      }
    }

  }); // end of ajax call

}
