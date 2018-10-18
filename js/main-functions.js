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
  var css_car = ["<link rel='stylesheet' type='text/css' href='css/carbon-components.min.css'/>"]; // css carbon design
  var js_car  = ["<link rel='stylesheet' type='text/css' href='js/carbon-components.min.js'/>"]; // js carbon design
  var css_def = ["<link rel='stylesheet' type='text/css' href='css/default.css'/>"]; // css default (reset)
	var css_mat = ["<link rel='stylesheet' type='text/css' href='css/material-design.css' media='screen,projection'/>"]; // css per Material Design
	var title = ["<title>Watson Assistant in PHP</title>"];
	var headfull = met_sta.concat(css_ico, css_car, js_car, css_def, css_mat, title);
	$('head').append(headfull);
}


/*
 * Function: toggleChat ©
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
