/*
 * Main variables
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
var root = "";
var admin_page = "admin";
var list_page = "list.php?lista=post";
var trash_page = "list.php?lista=cestino";
var pages_page = "list.php?lista=pagine";
var config_page = "configure.php";
var version = "v 0.3"; // set correct version


/*************************************
 * Generic functions Â©
 * Requires: nothing
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


/*
 * Function: createHead Â©
 * Returns: head delle pagine - inclusione di utilities, pagine css e titolo tab browser
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: March 2017
 */
function createHead(){
	var met_sta = ["<meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='ROBOTS' content='INDEX,FOLLOW'><meta name='GOOGLEBOT' content='ARCHIVE'>"];
	var css_ico = ["<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>"]; // css per Material Design Icons
	var css_def = ["<link rel='stylesheet' type='text/css' href='css/default.css'/>"]; // css default (reset)
	var css_swa = ["<link rel='stylesheet' type='text/css' href='css/sweetalert2_mine.css'/>"]; // css per SweetAlert2
	var css_mat = ["<link rel='stylesheet' type='text/css' href='css/material-design.css' media='screen,projection'/>"]; // css per Material Design
	var favicon = ["<link rel='shortcut icon' type='image/png' href='/admin/img/az_logo.png'/>"];
	var js_swal = ["<script src='js/sweetalert2_mine.js'>"];
	// var js_mat = ["<script src='js/materialize.min.js'>"];
	// var js_mdl = ["<script src='js/material-lite.js'>"];
	var title = ["<title>Admin Zone</title>"];
	// var headfull = met_sta.concat(css_ico, css_def, css_swa, css_mat, js_swal, js_mat, js_mdl, title);
	var headfull = met_sta.concat(css_ico, css_def, css_swa, css_mat, favicon, js_swal, title);
	$('head').append(headfull);
}



/*************************************
 * Watson Assistant functions Â©
 * Requires: nothing
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


/*
 * Function: chatWA Â©
 * Returns: sends message to the backend and gets result
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: April 2018
 */
function chatWA(message){

	var api = "api/ChatBot.php"; // Backend api URl
	var context = ""; // Context of the conversation

  $.ajax({
    url: api,
    type: 'post',
    dataType: 'json',
    data: {
      message: message,
      context: context
    },
    timeout: 5000 // Wait (ms) to check new message arrival from Watson Assistant
  }).done(function(response) {
    // Check the result
    if(response.error) { // Timed-out (no answer from Watson Assistant): display error
      $('#messages').append('<p>Non ho capito. Mi rimanderesti il tuo messaggio?</p>');
    } else { // Succeeded: display message
			// Clear the input element
      $("#input-ask").val("");
			// Gray out all old messages (both from and to Watson Assistant)
      $('.latest').removeClass("latest");
			// Display the new message from Watson Assistant
      $('#messages').append('<p class="from-watson latest">'+JSON.parse(response).output.text+'</p>');
			// Animation of chat panel: scroll down to the new message from Watson Assistant
      $('#virtual-assistant').animate({ scrollTop: $("#messages p").last().offset().top }, 'slow');
      // Upodate the conversation context
      context = JSON.stringify(JSON.parse(response).context);
			// Call function to retrieve conversation context
      getWAData(context);
    }
  }).fail(function () {
    // Failed (Watson Assistant error): display a error message
    $('#messages').append('<p>Non ho capito. Mi rimanderesti il tuo messaggio?</p>');
  });

}


/*
 * Returns: implements conversation with Watson Assistant
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: April 2018
 * Requires: chatWA Â©
 */
$(function(){
  chatWA(""); // Initialization of the chatbot
  // Send a Message, When the form will be submitted
  $("#chat-form").submit(function(e){
    e.preventDefault(); // Prevent the form submission
    if($("#input-ask").val()){
			// Send the message to Watson Assistant by calling chatWA function
      chatWA($("#input-ask").val());
			// Display the message to Watson Assistant
      $('#messages').append('<p class="to-watson">' + $("#input-ask").val() + '</p>');
			// Animation of chat panel: scroll down to the new message to Watson Assistant
      $('#virtual-assistant').animate({ scrollTop: $("#messages p").last().offset().top }, 'slow');
    }
  })
})


/*************************************
 * Manage post functions Â©
 * Requires: nothing
 * Author: Luca Crippa - luca.crippa88@gmail.com
 *************************************/


 /*
  * Function: getWAData Â©
  * Returns: read data from Watson Assistant draft creation
  * Author: Luca Crippa - luca.crippa88@gmail.com
  * Date: July 2017
  */
 function getWAData(context) {

 	context = JSON.parse(context); // get context from chatbot

 	if(context.write_db == "write"){ // check wether is needed to write on db

 			// Prepare response with data collected from chatbot context variables
 			var allcontent = [];
 		  var obj_main = {
 		    "text0": "",
 		    "text1": context.titolo,
 				"textarea1": context.testo,
 		    "textarea2": context.descrizione,
 		    "text5": "",
 		    "text2": "",
 		    "text3": "",
 		    "text4": "",
 		    "text7": "",
 		    "text8": "",
 		    "uploads": "",
 		    "text6": ""
 		  }
 		  allcontent.push(obj_main);
 		  var main_string = JSON.stringify(allcontent);

			var url_wa = autocompleteURLonWA(context.titolo);

 		  // Collect optimized data
 		  var postdata_wa = {
 		    check1: "",
 		    check2: "",
 		    check3: "",
 		    select1: context.sezione,
 		    select2: "",
 		    chips1: "",
 		    datetimes: "",
 		    public: "false",
 		    url: url_wa,
 		    maincontent: main_string
 		  };

 			// console.log(postdata_wa);
 			saveDataWA(postdata_wa); // Call function to save data in draft from chatbot

 	}

 }


/*
 * Function: getAllData Â©
 * Returns: read data from create / edit post page, with some checks (required fields and existing URL)
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function getAllData(id) {

  var alldatetimes = [];
  $('.moltiplicandum').each(function() {
    var date = $(this).find('.datepicker').val();
    var time = $(this).find('.timepicker').val();
    var obj_date = {
      "date": date,
      "time": time
    }
    if ((date != "") && (time != "")) alldatetimes.push(obj_date);
  });

  // Convert to string JSON objects to store them correctly in DB
  var alldatetimes_string = JSON.stringify(alldatetimes);
  var chips1_string = JSON.stringify($('.chips-initial').material_chip('data'));

  // Text6 is alternative to Select3 and vice-versa
  if ($("#text6").val() != "") var content_text6 = $("#text6").val();
  else var content_text6 = $("#select3").val();

  var allfiles = [];
  $('.upload2-file').each(function() {
    var file = $(this).text();
    var obj_files = {
      "file": file
    }
    allfiles.push(obj_files);
  });

  // Compactification in JSON of main contents
  var allcontent = [];
  var obj_main = {
    "text0": $("#text0").val(),
    "text1": $("#text1").val(),
		"textarea1": $("#textarea1").html(),
    "textarea2": $("#textarea2").val(),
    "text5": $("#text5").val(),
    "text2": $("#text2").val(),
    "text3": $("#text3").val(),
    "text4": $("#text4").val(),
    "text7": $("#text7").val(),
    "text8": $("#text8").val(),
    "uploads": allfiles,
    "text6": content_text6
  }
  allcontent.push(obj_main);
  var main_string = JSON.stringify(allcontent);

  // Collect optimized data
  var postdata = {
    check1: $("#check1").prop('checked'),
    check2: $("#check2").prop('checked'),
    check3: $("#check3").prop('checked'),
    select1: $("#select1").val(),
    select2: $("#select2").val(),
    chips1: chips1_string,
    datetimes: alldatetimes_string,
    public: "",
    url: $("#url").val(),
    maincontent: main_string
  };
  // console.log(postdata);

  // Check required forms are filled
  var checked = checkRequired(postdata);

  // Check existing URL (after required inputs check)
  if (checked == "ok") {
    var search = $("#url").val();
    var found = findRecord(search, id); //Need search value and id of current post (create: id=="", edit: id!="")
    if (found == "yes") {
      swal({
        title: 'URL gi&agrave; esistente',
        html: 'Cambia titolo del post per pubblicarlo.<br><br>',
        customClass: 'dialog',
        buttonsStyling: false,
        confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
        confirmButtonText: 'Torna',
        type: 'error'
      }).then(function() {
        return false; // Break if URL is found
      })
    } else {
      // Send post data
      return postdata; // Send data to be posted id URL is not found
    }
  }

}



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
