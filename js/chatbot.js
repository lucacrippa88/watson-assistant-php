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
    timeout: 10000 // Wait (ms) to check new message arrival from Watson Assistant
                   // Can be used if a response is needed in a certain time
  }).done(function(response) {
    // Check the result
    if(response.error) { // Timed-out (no answer from Watson Assistant): display a error message to ask user to resend message
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
			// Call function to retrieve conversation context variables
      getWatsonAssistantData(context);
    }
  }).fail(function () {
    // Failed (Watson Assistant error): display a error message to ask user to resend message
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


/*
 * Function: getWatsonAssistantData ©
 * Returns: retrieves context variables and uses them
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: June 2018
 * Requires: nothing
 * Status: stable - to be customized
 */
function getWatsonAssistantData(context){

  // Here you can use context variables as defined in Watson Assistant
  // to perform actions when i.e. a variable gets a certain value

  context = JSON.parse(context); // get context from chatbot
  // console.log(context); // check context status

  // Conditions: check context variables status to perform actions
  if(context.put_variable_name_here == "put-variable-value-here"){

      // Prepare response with data collected from chatbot context variables
      var allcontent = [];
      var context_data = {
        "key1": context.var_name1,
        "key2": context.var_name2,
        "key3": context.var_name3,
        // etc...
      }
      allcontent.push(context_data);

      // console.log(allcontent); // check data status

      var allcontent_string = JSON.stringify(allcontent);

      // Function to properly use Watson Assistant collected data
      useWatsonAssistantData(allcontent_string);

  }

}


/*
 * Function: useWatsonAssistantData ©
 * Returns: uses data collected by Watson Assistant chatbot
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: June 2018
 * Requires: getWatsonAssistantData © input
 * Status: to be fully customized
 */
function useWatsonAssistantData(data){

  // Here you can use context variables collected in getWatsonAssistantData ©
  // to perform actions when i.e. write on DB, call IBM Cloud Functions,
  // call other code, or anything else.

  // To be customized
  var data = JSON.parse(data); // get context from chatbot
  // console.log(data);

  // Use collected data to perform some actions!

}
