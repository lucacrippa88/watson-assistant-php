/*************************************
 * Watson Assistant functions ©
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Requires: php/ChatBot.php
 *************************************/


/*
 * Function: chatWA ©
 * Returns: sends message to the backend and gets result
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: April 2018
 * Requires: php/ChatBot.php ©
 * Status: stable
 */

// Define and set context empty
var context = ""; // Context of the conversation

function chatWA(message){

var api = "php/ChatBot.php"; // Backend api URl

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
 * Requires: chatWA ©
 * Status: stable
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
 * General functions ©
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Requires: nothing
 *************************************/


/*
 * Function: createHead ©
 * Returns: head delle pagine - inclusione di utilities, pagine css e titolo tab browser
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: March 2017
 * Status: stable
 */
function createHead(){
	var met_sta = ["<meta http-equiv='X-UA-Compatible' content='IE=edge'><meta name='viewport' content='width=device-width, initial-scale=1.0'><meta name='ROBOTS' content='INDEX,FOLLOW'><meta name='GOOGLEBOT' content='ARCHIVE'>"];
	var css_ico = ["<link rel='stylesheet' href='https://fonts.googleapis.com/icon?family=Material+Icons'>"]; // css per Material Design Icons
	var css_def = ["<link rel='stylesheet' type='text/css' href='css/default.css'/>"]; // css default (reset)
	var css_mat = ["<link rel='stylesheet' type='text/css' href='css/material-design.css' media='screen,projection'/>"]; // css per Material Design
	var title = ["<title>Watson Assistant in PHP</title>"];
	var headfull = met_sta.concat(css_ico, css_def, css_mat, title);
	$('head').append(headfull);
}


/*
 * Function: scrollToMsg ©
 * Returns: show-hide chatbot panel
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: June 2018
 * Status: stable
 */
function toggleChat(){
  $('body').on("click",".toggle-assistant",function(){
    $('#chat-form').fadeToggle("fast");
    $('#virtual-assistant').slideToggle("fast");
  });
}
