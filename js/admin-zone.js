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










/*
 * Function: fillTexts Â©
 * Returns: configurazione degli input per Admin Zone da config.json
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function fillTexts(result){

	for (var j=1 in result.Textarea){
		if(result.Textarea[j][0] != ""){
			$('#'+j+'-img').attr("style", "display:block;");
			$('#'+j).attr("style", "display:block;");
			$('#'+j).attr("data-length", result.Textarea[j][1]);
			$('label[for="'+j+'"]').attr("style", "display:block;");
			$('label[for="'+j+'"]').text(result.Textarea[j][0]);
		} else {
			$('#'+j+'-img').attr("style", "display:none;");
			$('#'+j).attr("style", "display:none;");
			$('label[for="'+j+'"]').attr("style", "display:none;");
		}
	}

	for (var j=1 in result.Text){
		if(result.Text[j][0] != ""){
			$('#'+j).attr("style", "display:block;");
			$('#'+j).attr("data-length", result.Text[j][1]);
			$('label[for="'+j+'"]').attr("style", "display:block;");
			$('label[for="'+j+'"]').text(result.Text[j][0]);
		} else {
			$('#'+j).attr("style", "display:none;");
			$('label[for="'+j+'"]').attr("style", "display:none;");
			$('#'+j+'-img').attr("style", "display:none;");
		}
	}

	for (var j=1 in result.Check){
		if(result.Check[j][0] != ""){
			$('#'+j).attr("style", "display:block;");
			$('label[for="'+j+'"]').attr("style", "display:block;");
			$('label[for="'+j+'"]').text(result.Check[j][0]);
		} else {
			$('#'+j).attr("style", "display:none;");
			$('label[for="'+j+'"]').attr("style", "display:none;");
		}
	}

}


/*
 * Function: fillSwitches Â©
 * Returns: configurazione degli input switchabili per Admin Zone da config.json
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function fillSwitches(result){

 // $('label[for="text5-sw"]').text(result.Text.text5[0]);
 // $('#text5').hide();
 $('label[for="text6-sw"]').text(result.Text.text6[0]);
 $('#text6').hide();
 $('#text6-sw').change(function() {
	 $('#text6').toggle();
	 $('#text6').attr("placeholder", result.Text.text6[0]);
	 $('#text6').attr("data-length", result.Text.text6[1]);
	 $('#text6').toggleClass('form-unchecked');
	 $('#text6').val('');
	 $('#select3-div').toggle();
	 $('#select3-div').toggleClass('form-unchecked');
 });

}


/*
* Function: initQuill Â©
* Returns: inizializzazione di Quill (https://github.com/quilljs/quill)
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: May 2018
*/
function initQuillEditor(textareaId){

 var toolbarOptions = [
	 ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
	 ['blockquote', 'code-block'],
	 [{ 'header': 1 }, { 'header': 2 }],               // custom button values
	 [{ 'list': 'ordered'}, { 'list': 'bullet' }],
	 [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
	 [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
	 [{ 'direction': 'rtl' }],                         // text direction
	 // [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
	 // [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
	 // [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
	 // [{ 'font': [] }],
	 // [{ 'align': [] }],
	 ['clean']                                         // remove formatting button
 ];

 var quill = new Quill(textareaId, {
	 modules: {
		 toolbar: toolbarOptions
	 },
	 theme: 'snow'
 });

}


/*
* Function: configurePage Â©
* Returns: configurazione della pagina di creazione/edit di un post per Admin Zone da config.json
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: July 2017
*/
function configurePage(){
 $.ajax({
	 contentType: "application/json",
	 dataType: "json",
	 url: "../../"+root+"admincfg/config.json", // page configuration file
	 async: false,
	 success: function (result){

					 for(var i in result){

						 fillSelect('#select1', result[i].select1);
						 fillSelect('#select2', result[i].select2);
						 if(result[i].select3 != ""){
							 fillSelect('#select3', result[i].select3);
						 } else { // If select3 is empty, do not show it, neither the switch to show the related custom text input
							 $('#select3-div').attr("style", "display:none");
							 $('#text6-sw').attr("style", "display:none");
						 }
						 fillKeys(result[i]);
						 fillTexts(result[i]);
						 fillSwitches(result[i]);
						 if(result[i].datetime == ""){ // If datetime is empty, do not show it, neither the add date button
							 $('#event-dates').attr("style", "display:none");
							 $('#addicon-date').attr("style", "display:none");
						 }

					 } // end main for

		} // end ajax success
 }); // end of ajax call
}


/*
* Function: configureLevels Â©
* Returns: configurazione della pagina di creazione/edit di un post per Admin Zone da config.json
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: May 2018
*/
function configureLevels(){
 $.ajax({
	 contentType: "application/json",
	 dataType: "json",
	 url: "../../"+root+"admincfg/config.json", // page configuration file
	 async: false,
	 success: function (result){

					 for(var i in result){

						var chipsdata2 = "[";
						var chipsdata3 = "[";

				 				for(var j in result[i].select1){
									$('.chips-sezioni').append("<div class='chip'>"+result[i].select1[j]);
				 				}
								$('.sez1').html("<b>"+result[i].select1[0]+"</b>");
								$('.sez2').html("<b>"+result[i].select1[1]+"</b>");
								$('.sez3').html("<b>"+result[i].select1[2]+"</b>");
								$('.sez4').html("<b>"+result[i].select1[3]+"</b>");

								$('.chips-categorie').material_chip();
								for(var j in result[i].select2){
									chipsdata2 = chipsdata2 + '{"tag": "'+result[i].select2[j]+'"},';
								}
								chipsdata2 = chipsdata2.slice(0,-1);
								chipsdata2 = chipsdata2 + "]";
								var chipsdatajson2 = $.parseJSON(chipsdata2);
								$('.chips-categorie').material_chip({
									data:chipsdatajson2,
									placeholder: 'Aggiungi...',
								});

								$('.chips-specifiche').material_chip();
								for(var j in result[i].select3){
									chipsdata3 = chipsdata3 + '{"tag": "'+result[i].select3[j]+'"},';
								}
								chipsdata3 = chipsdata3.slice(0,-1);
								chipsdata3 = chipsdata3 + "]";
								var chipsdatajson3 = $.parseJSON(chipsdata3);
								$('.chips-specifiche').material_chip({
									data:chipsdatajson3,
									placeholder: 'Aggiungi...',
								});

					 } // end main for

		} // end ajax success
 }); // end of ajax call
}


/*
* Function: configureKeywords Â©
* Returns: configurazione della pagina di creazione/edit di un post per Admin Zone da config.json
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: May 2018
*/
function configureKeywords(){

		$.ajax({
	 	 contentType: "application/json",
	 	 dataType: "json",
		 // data: text,
	 	 url: "../../"+root+"admincfg/config.json", // page configuration file
	 	 async: false,
	 	 success: function (result){

			 for(var k in result){

				 for(var i in result){

					 $('.chips-sezioni-keyword1').material_chip();
					 var chipsdata1 = "[";
					 for(var j in result[i].TextChip.keyword1){
						 chipsdata1 = chipsdata1 + '{"tag": "'+result[i].TextChip.keyword1[j]+'"},';
					 }
					 chipsdata1 = chipsdata1.slice(0,-1);
					 chipsdata1 = chipsdata1 + "]";
					 var chipsdatajson1 = $.parseJSON(chipsdata1);
					 $('.chips-sezioni-keyword1').material_chip({
						 data:chipsdatajson1,
						 placeholder: 'Aggiungi keyword...',
					 });

					 $('.chips-sezioni-keyword2').material_chip();
					 var chipsdata2 = "[";
					 for(var j in result[i].TextChip.keyword2){
						 chipsdata2 = chipsdata2 + '{"tag": "'+result[i].TextChip.keyword2[j]+'"},';
					 }
					 chipsdata2 = chipsdata2.slice(0,-1);
					 chipsdata2 = chipsdata2 + "]";
					 var chipsdatajson2 = $.parseJSON(chipsdata2);
					 $('.chips-sezioni-keyword2').material_chip({
						 data:chipsdatajson2,
						 placeholder: 'Aggiungi keyword...',
					 });

					 $('.chips-sezioni-keyword3').material_chip();
					 var chipsdata3 = "[";
					 for(var j in result[i].TextChip.keyword3){
						 chipsdata3 = chipsdata3 + '{"tag": "'+result[i].TextChip.keyword3[j]+'"},';
					 }
					 chipsdata3 = chipsdata3.slice(0,-1);
					 chipsdata3 = chipsdata3 + "]";
					 var chipsdatajson3 = $.parseJSON(chipsdata3);
					 $('.chips-sezioni-keyword3').material_chip({
						 data:chipsdatajson3,
						 placeholder: 'Aggiungi keyword...',
					 });

					 $('.chips-sezioni-keyword4').material_chip();
					 var chipsdata4 = "[";
					 for(var j in result[i].TextChip.keyword4){
						 chipsdata4 = chipsdata4 + '{"tag": "'+result[i].TextChip.keyword4[j]+'"},';
					 }
					 chipsdata4 = chipsdata4.slice(0,-1);
					 chipsdata4 = chipsdata4 + "]";
					 var chipsdatajson4 = $.parseJSON(chipsdata4);
					 $('.chips-sezioni-keyword4').material_chip({
						 data:chipsdatajson4,
						 placeholder: 'Aggiungi keyword...',
					 });

				}}

	 		} // end ajax success
	  }); // end of ajax call

}


/*
 * Function: saveConfig Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: May 2018
 */
function saveConfig() {
  $("#save-config").click(function() {

		var std_keywords = new Array();
		$(".chips-sezioni-keys").each(function(i) {
			// Extract and work with "sezioni" chips
			var sez_chips = "";
			var sez_chips_text = $(this).text();
			sez_chips = sez_chips.concat(sez_chips_text);
			var sez_chips_arr = sez_chips.split("cancel");
			sez_chips_arr.pop();
			std_keywords[i] = sez_chips_arr; // Array of arrays
			i++;
		});

		// Extract and work with "categorie" chips
		var cat_chips = "";
		var cat_chips_text = $(".chips-categorie").text();
		cat_chips = cat_chips.concat(cat_chips_text);
		var cat_chips_arr = cat_chips.split("cancel");
		cat_chips_arr.pop();

		// Extract and work with "specifiche" chips
		var spe_chips = "";
		var spe_chips_text = $(".chips-specifiche").text();
		spe_chips = spe_chips.concat(spe_chips_text);
		var spe_chips_arr = spe_chips.split("cancel");
		spe_chips_arr.pop();

		// Call updateConfig function to update config.json file
		updateConfig(cat_chips_arr, spe_chips_arr, std_keywords);

	});
}


/*
 * Function: updateConfig Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post pubblicato
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: May 2018
 */
function updateConfig(cat, spe, key){

	var api = 'api/UpdateConfig.php';

	var post_cat = cat;
	var post_spe = spe;
	var post_key = key;

			$.ajax({
				url: api,
				type: 'POST',
				data: {
					s2: post_cat,
					s3: post_spe,
					kw: post_key
				},
				dataType: 'json',
				async: true,
				success: function(result) {

					console.log(result.Response.config);
					console.log(result.Response.updated);

					if(result.Response.updated == null){
						swal({
	            title: 'Update effettuato!',
	            html: 'Configurazioni salvate correttamente.<br><br>',
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
	            window.location.replace("/" + admin_page + "/" + config_page) // redirect after clicking "ok"
	          })
					}
					if(result.Response.updated == "error"){
						swal({
							title: 'Errore',
							html: 'Errore durante il salvataggio. Riprova.<br><br>',
							customClass: 'dialog',
							buttonsStyling: false,
							confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
							confirmButtonText: 'Torna',
							type: 'error'
						}).then(function() {
							return false; // Break if URL is found
						})
					}
					if(result.Response.updated == "empty"){
						swal({
							title: 'Errore',
							html: 'Non puoi lasciare tag o sezioni vuote.<br><br>',
							customClass: 'dialog',
							buttonsStyling: false,
							confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
							confirmButtonText: 'Torna',
							type: 'error'
						}).then(function() {
							return false; // Break if URL is found
						})
					}

			 }

			});

}


/*
* Function: initGA Â©
* Returns: inclusione dello script GA per l'acquisizione di info
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: January 2018
*/
function initGA(){
 (function(w,d,s,g,js,fs){
	 g=w.gapi||(w.gapi={});g.analytics={q:[],ready:function(f){this.q.push(f);}};
	 js=d.createElement(s);fs=d.getElementsByTagName(s)[0];
	 js.src='https://apis.google.com/js/platform.js';
	 fs.parentNode.insertBefore(js,fs);js.onload=function(){g.load('analytics');};
 }(window,document,'script'));
}


/*
* Function: createGA Â©
* Returns: creazione del grafico GA
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: January 2018
*/
function createGA(){
 $(document).ready(function() {

		 gapi.analytics.ready(function() {
			 gapi.analytics.auth.authorize({
				 container: 'embed-api-auth-container',
				 clientid: '822960784048-079vq63i6pct0uqfuvm3u1q19eq26g38.apps.googleusercontent.com'
			 });

			 var viewSelector = new gapi.analytics.ViewSelector({
				 container: 'view-selector-container'
			 });

			 viewSelector.execute();

			 var start = "30daysAgo";
			 var end = "yesterday";
			 var metr = "ga:sessions";

			 var dataChart = new gapi.analytics.googleCharts.DataChart({
				 query: {
					 metrics: metr,
					 dimensions: 'ga:date',
					 'start-date': start,
					 'end-date': end
				 },
				 chart: {
					 container: 'chart-container',
					 type: 'LINE',
					 options: {
						 width: '100%'
					 }
				 }
			 });

			 viewSelector.on('change', function(ids) {
				 dataChart.set({query: {ids: ids}}).execute();
			 });

		 });

 });

}


/*
* Function: updateGA Â©
* Returns: update del grafico GA
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: January 2018
*/
function updateGA(){

 loadingProcess("#fade-loader-ga", ".fade-page");

	 gapi.analytics.ready(function() {
		 gapi.analytics.auth.authorize({
			 container: 'embed-api-auth-container',
			 clientid: '822960784048-079vq63i6pct0uqfuvm3u1q19eq26g38.apps.googleusercontent.com'
		 });

		 var viewSelector = new gapi.analytics.ViewSelector({
			 container: 'view-selector-container'
		 });

		 viewSelector.execute();

		 var start = $("#start-view").val();
		 var end = $("#stop-view").val();
		 var metr = $("#metr-data").val();

		 var dataChart = new gapi.analytics.googleCharts.DataChart({
			 query: {
				 metrics: metr,
				 dimensions: 'ga:date',
				 'start-date': start,
				 'end-date': end
			 },
			 chart: {
				 container: 'chart-container',
				 type: 'LINE',
				 options: {
					 width: '100%'
				 }
			 }
		 });

		 viewSelector.on('change', function(ids) {
			 dataChart.set({query: {ids: ids}}).execute();
		 });

	 });

}


/*
* Function: autocompleteURL Â©
* Returns: automatically creates SEO optimized URL using title
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: July 2017
*/
function autocompleteURL(input, output){

 var delayMs = 100; // Delay time between input and live output
 var delayAction = (function() {
	 var timerId = 0;
	 return function(callback, ms) {
		 clearTimeout(timerId);
		 timerId = setTimeout(callback, ms);
	 };
 })();

 $('input[name="'+input+'"]').on('keyup', function(e) {
	 delayAction(function() {
		 $('input[name="'+output+'"]').val(normalizeInput($(e.target).val()));
	 }, delayMs);
	 $('input[name="'+output+'"]').next('label').addClass("active");
 });

}


/*
* Function: autocompleteURL Â©
* Returns: automatically creates SEO optimized URL using title coming from Watson Assistant
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: May 2018
*/
function autocompleteURLonWA(input){
	var output = normalizeInput(input);
	return output;
}


/*
* Function: normalizeInput Â©
* Returns: normalizes input by replacing spaces with - and remoing special chars. Problems with "
* Author: Luca Crippa - luca.crippa88@gmail.com
* Date: December 2017
*/
function normalizeInput(str) {
 str = str.replace('Ã¨', 'e');
 str = str.replace('Ã©', 'e');
 str = str.replace('Ã ', 'a');
 str = str.replace('Ã²', 'o');
 str = str.replace('Ã¹', 'u');
 str = str.replace('Ã¬', 'i');
 str = str.replace("'", "");
 str = str.replace('"', '');
 str = str.replace(/[^a-z0-9\s]/gi, "-");
 str = str.replace(/[_\W]+/g, "-");
 str = str.replace("?", "");
 str = str.replace("!", "");
 str = str.replace("#", "");
 str = str.replace("@", "");
 str = str.replace("(", "");
 str = str.replace(")", "");
 str = str.replace("[", "");
 str = str.replace("]", "");
 str = str.replace(" ", "-");
 // return removeDiacritics(str).replace(/[ ]/g, '-').toLowerCase();
 return str.toLowerCase();
}


/*
* Function: removeDiacritics Â© CREDO SIA INUTILE
* Returns: normalizes input by replacing spaces with - and remoing special chars. Problems with "
* Author: http://stackoverflow.com/a/18123985
* Date: December 2017
*/
function removeDiacritics(str) {
	 var defaultDiacriticsRemovalMap = [
		 {'base':'A', 'letters':/[\u0041\u24B6\uFF21\u00C0\u00C1\u00C2\u1EA6\u1EA4\u1EAA\u1EA8\u00C3\u0100\u0102\u1EB0\u1EAE\u1EB4\u1EB2\u0226\u01E0\u00C4\u01DE\u1EA2\u00C5\u01FA\u01CD\u0200\u0202\u1EA0\u1EAC\u1EB6\u1E00\u0104\u023A\u2C6F]/g},
		 {'base':'AA','letters':/[\uA732]/g},
		 {'base':'AE','letters':/[\u00C6\u01FC\u01E2]/g},
		 {'base':'AO','letters':/[\uA734]/g},
		 {'base':'AU','letters':/[\uA736]/g},
		 {'base':'AV','letters':/[\uA738\uA73A]/g},
		 {'base':'AY','letters':/[\uA73C]/g},
		 {'base':'B', 'letters':/[\u0042\u24B7\uFF22\u1E02\u1E04\u1E06\u0243\u0182\u0181]/g},
		 {'base':'C', 'letters':/[\u0043\u24B8\uFF23\u0106\u0108\u010A\u010C\u00C7\u1E08\u0187\u023B\uA73E]/g},
		 {'base':'D', 'letters':/[\u0044\u24B9\uFF24\u1E0A\u010E\u1E0C\u1E10\u1E12\u1E0E\u0110\u018B\u018A\u0189\uA779]/g},
		 {'base':'DZ','letters':/[\u01F1\u01C4]/g},
		 {'base':'Dz','letters':/[\u01F2\u01C5]/g},
		 {'base':'E', 'letters':/[\u0045\u24BA\uFF25\u00C8\u00C9\u00CA\u1EC0\u1EBE\u1EC4\u1EC2\u1EBC\u0112\u1E14\u1E16\u0114\u0116\u00CB\u1EBA\u011A\u0204\u0206\u1EB8\u1EC6\u0228\u1E1C\u0118\u1E18\u1E1A\u0190\u018E]/g},
		 {'base':'F', 'letters':/[\u0046\u24BB\uFF26\u1E1E\u0191\uA77B]/g},
		 {'base':'G', 'letters':/[\u0047\u24BC\uFF27\u01F4\u011C\u1E20\u011E\u0120\u01E6\u0122\u01E4\u0193\uA7A0\uA77D\uA77E]/g},
		 {'base':'H', 'letters':/[\u0048\u24BD\uFF28\u0124\u1E22\u1E26\u021E\u1E24\u1E28\u1E2A\u0126\u2C67\u2C75\uA78D]/g},
		 {'base':'I', 'letters':/[\u0049\u24BE\uFF29\u00CC\u00CD\u00CE\u0128\u012A\u012C\u0130\u00CF\u1E2E\u1EC8\u01CF\u0208\u020A\u1ECA\u012E\u1E2C\u0197]/g},
		 {'base':'J', 'letters':/[\u004A\u24BF\uFF2A\u0134\u0248]/g},
		 {'base':'K', 'letters':/[\u004B\u24C0\uFF2B\u1E30\u01E8\u1E32\u0136\u1E34\u0198\u2C69\uA740\uA742\uA744\uA7A2]/g},
		 {'base':'L', 'letters':/[\u004C\u24C1\uFF2C\u013F\u0139\u013D\u1E36\u1E38\u013B\u1E3C\u1E3A\u0141\u023D\u2C62\u2C60\uA748\uA746\uA780]/g},
		 {'base':'LJ','letters':/[\u01C7]/g},
		 {'base':'Lj','letters':/[\u01C8]/g},
		 {'base':'M', 'letters':/[\u004D\u24C2\uFF2D\u1E3E\u1E40\u1E42\u2C6E\u019C]/g},
		 {'base':'N', 'letters':/[\u004E\u24C3\uFF2E\u01F8\u0143\u00D1\u1E44\u0147\u1E46\u0145\u1E4A\u1E48\u0220\u019D\uA790\uA7A4]/g},
		 {'base':'NJ','letters':/[\u01CA]/g},
		 {'base':'Nj','letters':/[\u01CB]/g},
		 {'base':'O', 'letters':/[\u004F\u24C4\uFF2F\u00D2\u00D3\u00D4\u1ED2\u1ED0\u1ED6\u1ED4\u00D5\u1E4C\u022C\u1E4E\u014C\u1E50\u1E52\u014E\u022E\u0230\u00D6\u022A\u1ECE\u0150\u01D1\u020C\u020E\u01A0\u1EDC\u1EDA\u1EE0\u1EDE\u1EE2\u1ECC\u1ED8\u01EA\u01EC\u00D8\u01FE\u0186\u019F\uA74A\uA74C]/g},
		 {'base':'OI','letters':/[\u01A2]/g},
		 {'base':'OO','letters':/[\uA74E]/g},
		 {'base':'OU','letters':/[\u0222]/g},
		 {'base':'P', 'letters':/[\u0050\u24C5\uFF30\u1E54\u1E56\u01A4\u2C63\uA750\uA752\uA754]/g},
		 {'base':'Q', 'letters':/[\u0051\u24C6\uFF31\uA756\uA758\u024A]/g},
		 {'base':'R', 'letters':/[\u0052\u24C7\uFF32\u0154\u1E58\u0158\u0210\u0212\u1E5A\u1E5C\u0156\u1E5E\u024C\u2C64\uA75A\uA7A6\uA782]/g},
		 {'base':'S', 'letters':/[\u0053\u24C8\uFF33\u1E9E\u015A\u1E64\u015C\u1E60\u0160\u1E66\u1E62\u1E68\u0218\u015E\u2C7E\uA7A8\uA784]/g},
		 {'base':'T', 'letters':/[\u0054\u24C9\uFF34\u1E6A\u0164\u1E6C\u021A\u0162\u1E70\u1E6E\u0166\u01AC\u01AE\u023E\uA786]/g},
		 {'base':'TZ','letters':/[\uA728]/g},
		 {'base':'U', 'letters':/[\u0055\u24CA\uFF35\u00D9\u00DA\u00DB\u0168\u1E78\u016A\u1E7A\u016C\u00DC\u01DB\u01D7\u01D5\u01D9\u1EE6\u016E\u0170\u01D3\u0214\u0216\u01AF\u1EEA\u1EE8\u1EEE\u1EEC\u1EF0\u1EE4\u1E72\u0172\u1E76\u1E74\u0244]/g},
		 {'base':'V', 'letters':/[\u0056\u24CB\uFF36\u1E7C\u1E7E\u01B2\uA75E\u0245]/g},
		 {'base':'VY','letters':/[\uA760]/g},
		 {'base':'W', 'letters':/[\u0057\u24CC\uFF37\u1E80\u1E82\u0174\u1E86\u1E84\u1E88\u2C72]/g},
		 {'base':'X', 'letters':/[\u0058\u24CD\uFF38\u1E8A\u1E8C]/g},
		 {'base':'Y', 'letters':/[\u0059\u24CE\uFF39\u1EF2\u00DD\u0176\u1EF8\u0232\u1E8E\u0178\u1EF6\u1EF4\u01B3\u024E\u1EFE]/g},
		 {'base':'Z', 'letters':/[\u005A\u24CF\uFF3A\u0179\u1E90\u017B\u017D\u1E92\u1E94\u01B5\u0224\u2C7F\u2C6B\uA762]/g},
		 {'base':'a', 'letters':/[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/g},
		 {'base':'aa','letters':/[\uA733]/g},
		 {'base':'ae','letters':/[\u00E6\u01FD\u01E3]/g},
		 {'base':'ao','letters':/[\uA735]/g},
		 {'base':'au','letters':/[\uA737]/g},
		 {'base':'av','letters':/[\uA739\uA73B]/g},
		 {'base':'ay','letters':/[\uA73D]/g},
		 {'base':'b', 'letters':/[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/g},
		 {'base':'c', 'letters':/[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/g},
		 {'base':'d', 'letters':/[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/g},
		 {'base':'dz','letters':/[\u01F3\u01C6]/g},
		 {'base':'e', 'letters':/[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/g},
		 {'base':'f', 'letters':/[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/g},
		 {'base':'g', 'letters':/[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/g},
		 {'base':'h', 'letters':/[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/g},
		 {'base':'hv','letters':/[\u0195]/g},
		 {'base':'i', 'letters':/[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/g},
		 {'base':'j', 'letters':/[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/g},
		 {'base':'k', 'letters':/[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/g},
		 {'base':'l', 'letters':/[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/g},
		 {'base':'lj','letters':/[\u01C9]/g},
		 {'base':'m', 'letters':/[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/g},
		 {'base':'n', 'letters':/[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/g},
		 {'base':'nj','letters':/[\u01CC]/g},
		 {'base':'o', 'letters':/[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/g},
		 {'base':'oi','letters':/[\u01A3]/g},
		 {'base':'ou','letters':/[\u0223]/g},
		 {'base':'oo','letters':/[\uA74F]/g},
		 {'base':'p','letters':/[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/g},
		 {'base':'q','letters':/[\u0071\u24E0\uFF51\u024B\uA757\uA759]/g},
		 {'base':'r','letters':/[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/g},
		 {'base':'s','letters':/[\u0073\u24E2\uFF53\u00DF\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/g},
		 {'base':'t','letters':/[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/g},
		 {'base':'tz','letters':/[\uA729]/g},
		 {'base':'u','letters':/[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/g},
		 {'base':'v','letters':/[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/g},
		 {'base':'vy','letters':/[\uA761]/g},
		 {'base':'w','letters':/[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/g},
		 {'base':'x','letters':/[\u0078\u24E7\uFF58\u1E8B\u1E8D]/g},
		 {'base':'y','letters':/[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/g},
		 {'base':'z','letters':/[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/g}
	 ];

	 for (var i = 0; i < defaultDiacriticsRemovalMap.length; i++) {
		 str = str.replace(defaultDiacriticsRemovalMap[i].letters, defaultDiacriticsRemovalMap[i].base);
	 }

	 return str;
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
 * Function: findRecord Â©
 * Returns: searches for record in DB and returns "yes" if found
 * Requires: value to be searched, id of record to be excluded from the search
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function findRecord(search, id) {
  var post_search = search;
  var post_id = id;
  var found;

  var api = 'api/FindRecordDB.php';

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      s: post_search,
      i: post_id
    },
    dataType: 'json',
    async: false, // wait for response to check if value already exists in DB: need to be sync
    success: function(result) {
      found = result.Response.found;
    }
  });
  return found;
}


/*
 * Function: checkRequired Â©
 * Returns: check if required fields are filled
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function checkRequired(postdata) {
  var check_required;
  if ((postdata.select1 == null) || (postdata.select2 == null) || (postdata.url == "")) { // Set required fields here
    swal({
      title: 'Attenzione',
      html: 'Devi compilare tutti i campi richiesti (*).<br><br>',
      customClass: 'dialog',
      buttonsStyling: false,
      confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
      confirmButtonText: 'Torna',
      type: 'error'
    }).then(function() {
      check_required = "error";
      return check_required;
    })
  } else {
    check_required = "ok";
    return check_required;
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
 * Function: saveData Â©
 * Returns: lettura e invio dati da pagina di creazione/edit di post verso API per update del DB in stato di post salvato in draft
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function saveData(id) {
  $("#save-draft").click(function() {

    var post_id = id; // get id of post: if numeric, edit post; if not numeric (null or something else), create a new post
    var postdata = getAllData(id); // get all data from admin create/edit post page
    postdata.public = false; // set save draft (instead of publish)
    postdata.id = post_id; // insert id to postdata

    var seltitle = "Post salvato in bozza"; // select random title + image for confirmation swal

    var api = 'api/UpdateDB.php'; // connects and updates the selected DB table

    $.ajax({
      url: api,
      type: 'POST',
      data: postdata,
      dataType: 'json',
      async: true,
      success: function(result) {
        var obj = result.Response;

        // DB updated!
        if (obj.updated == "ok") {
          swal({
            title: seltitle,
            html: 'Il post &egrave; stato salvato come bozza.<br><br>',
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
 * Function: moveToTrash Â©
 * Returns: edita il DB settando il post su trash
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function moveToTrash(id) {

  var post_id = id;
  var post_trash = "true";
  var seltitle = "Good bye!"; // select random title + image for confirmation swal

  var api = 'api/UpdateDBTrash.php'; // connects and updates the selected DB table

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      id: post_id,
      tr: post_trash
    },
    dataType: 'json',
    async: true,
    success: function(result) {
      var obj = result.Response;

      // DB updated!
      if (obj.updated == "ok") {
        swal({
          title: seltitle,
          html: 'Il post &egrave; stato cestinato. Lo trovi ancora nel <a href="/admin/list.php?lista=cestino">cestino</a>.<br><br>',
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

}


/*
 * Function: restoreFromTrash Â©
 * Returns: edita il DB recuperando il post dal trash
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function restoreFromTrash(id) {

  var post_id = id;
  var post_trash = "false";
  var seltitle = "Welcome back!"; // select random title + image for confirmation swal

  var api = 'api/UpdateDBTrash.php'; // connects and updates the selected DB table

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      id: post_id,
      tr: post_trash
    },
    dataType: 'json',
    async: true,
    success: function(result) {
      var obj = result.Response;

      // DB updated!
      if (obj.updated == "ok") {
        swal({
          title: seltitle,
          html: 'Il post &egrave; stato recuperato dal cestino. Lo trovi quindi nella <a href="/admin/list.php?lista=post">lista dei post</a>.<br><br>',
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
          window.location.replace("/" + admin_page + "/" + trash_page) // redirect after clicking "ok"
        })
      }

    } // end of function
  }); // end of ajax call

}


/*
 * Function: deleteForever Â©
 * Returns: edita il DB eliminando il post definitivamente
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function deleteForever(id) {

  var post_id = id;
  var seltitle = "Farewell!"; // select random title + image for confirmation swal

  var api = 'api/deleteDBTrash.php'; // connects and updates the selected DB table

  swal({
    title: 'Sei sicuro?',
    html: 'Se cancelli il post non potrai recuperarlo.<br><br>',
    type: 'warning',
    showCloseButton: false,
    showCancelButton: true,
    showConfirmButton: true,
    buttonsStyling: false,
    animation: false,
    customClass: 'dialog',
    confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
    confirmButtonText: 'Ok, procedi',
    cancelButtonClass: 'bx--btn bx--btn--sm bx--btn--secondary',
    cancelButtonText: 'Annulla',
    allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
  }).then(function(isConfirm) {

    if (isConfirm != null && isConfirm != "") {

      $.ajax({
        url: api,
        type: 'POST',
        data: {
          id: post_id
        },
        dataType: 'json',
        async: true,
        success: function(result) {
          var obj = result.Response;

          // DB updated!
          if (obj.updated == "ok") {
            swal({
              title: seltitle,
              html: 'Il post &egrave; stato eliminato definitivamente.<br><br>',
              type: 'success',
              showCloseButton: false,
              showCancelButton: false,
              showConfirmButton: true,
              buttonsStyling: false,
              animation: false,
              customClass: 'dialog',
              confirmButtonClass: 'but flat blue-trans right',
              confirmButtonText: 'Ok',
              allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
            }).then(function() {
              window.location.replace("/" + admin_page + "/" + trash_page) // redirect after clicking "ok"
            })
          }

        } // end of function
      }); // end of ajax call

    } else {
      swal({
        title: "Eliminazione annullata",
        html: 'Non hai cancellato il post.<br><br>',
        type: 'error',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        buttonsStyling: false,
        animation: false,
        customClass: 'dialog',
        confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
        confirmButtonText: 'Ok',
        allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
      });
    }
  });

}


/*
 * Function: deleteAllForever Â©
 * Returns: edita il DB eliminando definitivamente tutti i post flaggati come trash
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
function deleteAllForever() {

  var seltitle = "Trashed away!"; // select random title + image for confirmation swal

  var api = 'api/deleteAllDBTrash.php'; // connects and updates the selected DB table

  swal({
    title: 'Sei sicuro?',
    html: 'Stai per eliminare definivamente <b>tutti</b> i post cestinati: non potrai pi&ugrave; recuperarli.<br><br>',
    type: 'warning',
    showCloseButton: false,
    showCancelButton: true,
    showConfirmButton: true,
    buttonsStyling: false,
    animation: false,
    customClass: 'dialog',
    confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
    confirmButtonText: 'Ok, procedi',
    cancelButtonClass: 'bx--btn bx--btn--sm bx--btn--secondary',
    cancelButtonText: 'Annulla',
    allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
  }).then(function(isConfirm) {

    if (isConfirm != null && isConfirm != "") {

      $.ajax({
        url: api,
        type: 'POST',
        dataType: 'json',
        async: true,
        success: function(result) {
          var obj = result.Response;

          // DB updated!
          if (obj.updated == "ok") {
            swal({
              title: seltitle,
              html: 'Hai svuotato definitivamente il cestino.<br><br>',
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
              window.location.replace("/" + admin_page + "/" + trash_page) // redirect after clicking "ok"
            })
          }

        } // end of function
      }); // end of ajax call

    } else {
      swal({
        title: "Eliminazione annullata",
        html: 'Non hai svuotato il cestino.<br><br>',
        type: 'error',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        buttonsStyling: false,
        animation: false,
        customClass: 'dialog',
        confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
        confirmButtonText: 'Ok',
        allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
      });
    }
  });

}


/*
 * Function: selectRandomTitle Â©
 * Returns: randomly selected JSON object containing title of publication confirmation swal
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function selectRandomTitle() {

  var alltitles = {
    "title1": {
      "title": "Boom! Shakalaka",
      "image": "imagename"
    },
    "title2": {
      "title": "High fives!",
      "image": "imagename"
    },
    "title3": {
      "title": "And lift-off!",
      "image": "imagename"
    },
    "title4": {
      "title": "Yeah, baby",
      "image": "imagename"
    },
    "title5": {
      "title": "Really not bad",
      "image": "imagename"
    },
    "title6": {
      "title": "Go, Johnny",
      "image": "imagename"
    }

  }

  var allkeys = Object.keys(alltitles);
  var randomkey = allkeys[Math.floor(Math.random() * allkeys.length)];
  var seltitle = alltitles[randomkey];

  return seltitle;

}


/*
 * Function: retrieveListLoad Â©
 * Returns: lettura dal DB dell'elenco dei post non filtrati (on load della pagina)
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function downloadAll(type) {

  swal({
    title: 'Download ' + type,
    html: 'Seleziona il materiale che vuoi scaricare.<br><br><input align="left" type="checkbox" id="dl-list"/><label for="dl-list">Elenco post (csv)</label><br><input type="checkbox" id="dl-img"/><label for="dl-img">Immagini di copertina</label><br><input type="checkbox" id="dl-file"/><label for="dl-file">File allegati</label>',
    // type: 'question',
    imageUrl: "http://icons.iconarchive.com/icons/paomedia/small-n-flat/1024/funnel-icon.png",
    imageWidth: '100px',
    imageHeight: '100px',
    showCloseButton: false,
    showCancelButton: true,
    showConfirmButton: true,
    buttonsStyling: false,
    animation: false,
    customClass: 'dialog',
    confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
    confirmButtonText: 'Ok',
    cancelButtonClass: 'bx--btn bx--btn--sm bx--btn--secondary',
    cancelButtonText: 'Annulla',
    allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
  }).then(function(isConfirm) {

    if (isConfirm != null && isConfirm != "") {
      //
      //       $.ajax(
      //       {
      //         url: api,
      //         type: 'POST',
      //         data: {id: post_id},
      //         dataType: 'json',
      //         async: true,
      //         success: function(result){
      //           var obj = result.Response;
      //
      // DB updated!
      // if(obj.updated == "ok"){

      var dl_list = $('#dl-list').val();
      var dl_img = $('#dl-img').val();
      var dl_file = $('#dl-file').val();

      swal({
        position: 'bottom-start',
        title: 'Download ' + type,
        html: 'Il download dei ' + type + ' pubblicati &egrave; iniziato.<br><br>',
        type: 'success',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: false,
        buttonsStyling: false,
        animation: false,
        customClass: 'dialog',
        timer: 3500,
        allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
      });
      // }
      //
      //         } // end of function
      //       }); // end of ajax call
      //
    } else {
      swal({
        title: "Download annullato",
        html: 'Hai annullato il download del materiale.<br><br>',
        type: 'error',
        showCloseButton: false,
        showCancelButton: false,
        showConfirmButton: true,
        buttonsStyling: false,
        animation: false,
        customClass: 'dialog',
        confirmButtonClass: 'bx--btn bx--btn--sm bx--btn--primary',
        confirmButtonText: 'Ok',
        allowOutsideClick: false // prevent user by clicking outside instead of clickinf "ok"
      });
    }

  });
}


/*
 * Function: retrieveListLoad Â©
 * Returns: lettura dal DB dell'elenco dei post non filtrati (on load della pagina)
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function retrieveListLoad(type) {
  $(document).ready(function() {
    select1 = $("#select1").val();
    select2 = $("#select2").val();
    selectA = $("#selectA").val();
    selectB = $("#selectB").val();
    updateList(type, select1, select2, selectA, selectB);
  });
}


/*
 * Function: retrieveListChange Â©
 * Returns: lettura dal DB dell'elenco dei post filtrati
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function retrieveListChange(type) {
  $(".filter").change(function() {
    select1 = $("#select1").val();
    select2 = $("#select2").val();
    selectA = $("#selectA").val();
    selectB = $("#selectB").val();
    updateList(type, select1, select2, selectA, selectB);
  });
}


/*
 * Function: retrieveListReset Â©
 * Returns: lettura dal DB dell'elenco dei post filtrati
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function retrieveListReset(type) {
  $('body').on("click", "#reset-table", function() {
    select1 = "tutti";
    select2 = "tutti";
    selectA = "tutti";
    selectB = "tutti";
    $("#select1 option:first").prop('selected', true);
    $("#select2 option:first").prop('selected', true);
    $("#selectA option:first").prop('selected', true);
    $("#selectB option:first").prop('selected', true);
    updateList(type, select1, select2, selectA, selectB);
  });
}


/*
 * Function: updateList Â©
 * Returns: lettura dal DB dell'elenco dei post filtrati
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: December 2017
 */
function updateList(type, select1, select2, selectA, selectB) {

  $('#loading-table').show();

  var qnumber;

  if ((select1 == "tutti") && (select2 == "tutti") && (selectA == "tutti") && (selectB == "tutti")) {
    qnumber = 0;
  }
  if ((select1 != "tutti") && (select2 == "tutti") && (selectA == "tutti") && (selectB == "tutti")) {
    qnumber = 1;
  }
  if ((select1 == "tutti") && (select2 != "tutti") && (selectA == "tutti") && (selectB == "tutti")) {
    qnumber = 2;
  }
  if ((select1 == "tutti") && (select2 == "tutti") && (selectA != "tutti") && (selectB == "tutti")) {
    qnumber = 3;
  }
  if ((select1 == "tutti") && (select2 == "tutti") && (selectA == "tutti") && (selectB != "tutti")) {
    qnumber = 4;
  }
  if ((select1 != "tutti") && (select2 != "tutti") && (selectA == "tutti") && (selectB == "tutti")) {
    qnumber = 5;
  }
  if ((select1 == "tutti") && (select2 == "tutti") && (selectA != "tutti") && (selectB != "tutti")) {
    qnumber = 6;
  }
  if ((select1 != "tutti") && (select2 == "tutti") && (selectA != "tutti") && (selectB == "tutti")) {
    qnumber = 7;
  }
  if ((select1 != "tutti") && (select2 == "tutti") && (selectA == "tutti") && (selectB != "tutti")) {
    qnumber = 8;
  }
  if ((select1 == "tutti") && (select2 != "tutti") && (selectA != "tutti") && (selectB == "tutti")) {
    qnumber = 9;
  }
  if ((select1 == "tutti") && (select2 != "tutti") && (selectA == "tutti") && (selectB != "tutti")) {
    qnumber = 10;
  }
  if ((select1 != "tutti") && (select2 != "tutti") && (selectA != "tutti") && (selectB == "tutti")) {
    qnumber = 11;
  }
  if ((select1 != "tutti") && (select2 != "tutti") && (selectA == "tutti") && (selectB != "tutti")) {
    qnumber = 12;
  }
  if ((select1 != "tutti") && (select2 == "tutti") && (selectA != "tutti") && (selectB != "tutti")) {
    qnumber = 13;
  }
  if ((select1 == "tutti") && (select2 != "tutti") && (selectA != "tutti") && (selectB != "tutti")) {
    qnumber = 14;
  }
  if ((select1 != "tutti") && (select2 != "tutti") && (selectA != "tutti") && (selectB != "tutti")) {
    qnumber = 15;
  }

  var post_select1 = select1;
  var post_select2 = select2;
  var post_selectA = selectA;
  var post_selectB = selectB;

  $('#add-post-table-here').empty();
  $('#add-page-table-here').empty();
  $('#add-trash-table-here').empty();

  var api = 'api/RetrieveListDB.php'; // connects and updates the selected DB table

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      q: qnumber,
      s1: post_select1,
      s2: post_select2,
      sA: post_selectA,
      sB: post_selectB
    },
    dataType: 'json',
    async: true,
    success: function(result) {

      if (type == "post") { // if post not trashed is selected
        $("#main-title").text("Lista dei post");
        for (var i in result.Response) {
          var obj = result.Response[i];
          if (obj.posted != "0000-00-00 00:00:00") {
            if ((obj.trash != "true") && (obj.page != "true")) { // if post is not trashed and is not a page
              var maincontent;
              if (obj.maincontent != "") {
                maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
                maincontent = jQuery.parseJSON(maincontent);
                if (obj.updated == "0000-00-00 00:00:00") {
                  obj.updated = "-";
                }
                var draft;
                if (obj.public == "false") {
                  draft = "<span class='bx--tag bx--tag--local'>Bozza</span>";
                } else {
                  draft = "";
                }
                var archived;
                if (obj.check3 == "true") {
                  archived = "<span class='bx--tag bx--tag--beta'>Archiviato</span>";
                } else {
                  archived = "";
                }
								var featured;
								if (obj.check2 == "true") {
									featured = "<span class='bx--tag bx--tag--private'>In evidenza</span>";
								} else {
									featured = "";
								}
								var slider;
								if (obj.check1 == "true") {
									slider = "<span class='bx--tag bx--tag--community'>Slider</span>";
								} else {
									slider = "";
								}
                var block = "<tr class='.post-container'><td class='.post-title'><b>" + maincontent.text1 + "&ensp;</b>" + draft + archived + featured + slider + "</td><td>" + obj.posted + "</td><td>" + obj.updated + "</td><td>" + obj.select1 + "</td><td>" + obj.select2 + "</td><td><a href='/" + admin_page + "/post.php?id=" + obj.id + "'<i class='material-icons'>create</i></a><a target='_blank' href='/"+obj.url+"'><i class='material-icons'>exit_to_app</i></a>&ensp;&ensp;<i class='material-icons move-trash' style='cursor:pointer;' id='move-trash" + obj.id + "'>delete</i></td></tr>";
                $('#add-post-table-here').append(block);
              }
            }
          }
        }
      }
      if (type == "pagine") { // if pages page is selected
        $("#main-title").text("Elenco delle pagine");
        for (var i in result.Response) {
          var obj = result.Response[i];
          if (obj.posted != "0000-00-00 00:00:00") {
            if (obj.page == "true") { // if post is a page
              var maincontent;
              if (obj.maincontent != "") {
                maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
                maincontent = jQuery.parseJSON(maincontent);
                if (obj.updated == "0000-00-00 00:00:00") {
                  obj.updated = "-";
                }
                var page;
                if (obj.page == "true") {
                  page = "<span class='bx--tag bx--tag--ibm'>Pagina</span>";
                } else {
                  page = "";
                }
                var block = "<tr><td><b>" + maincontent.text1 + "&ensp;</b>" + page + "</td><td>" + obj.posted + "</td><td>" + obj.updated + "</td><td>Pagina</td><td>-</td><td><a href='/" + admin_page + "/post.php?id=" + obj.id + "'<i class='material-icons'>create</i></a></td></tr>";
                $('#add-page-table-here').append(block);
              }
            }
          }
        }
      }
      if (type == "cestino") { // if trashed post page is selected
        $("#main-title").text("Cestino");
        for (var i in result.Response) {
          var obj = result.Response[i];
          if (obj.posted != "0000-00-00 00:00:00") {
            if (obj.trash == "true") { // if post is trashed
              var maincontent;
              if (obj.maincontent != "") {
                maincontent = obj.maincontent.slice(1, -1); // Delete first "[" and last "]" to allow right json parsing
                maincontent = jQuery.parseJSON(maincontent);
                if (obj.updated == "0000-00-00 00:00:00") {
                  obj.updated = "-";
                }
                var draft;
                if (obj.public == "false") {
                  draft = "<span class='bx--tag bx--tag--local'>Bozza</span>";
                } else {
                  draft = "";
                }
                var archived;
                if (obj.check3 == "true") {
                  archived = "<span class='bx--tag bx--tag--beta'>Archiviato</span>";
                } else {
                  archived = "";
                }
                var trashed;
                if (obj.trash == "true") {
                  trashed = "<span class='bx--tag bx--tag--experimental'>Cestinato</span>";
                } else {
                  trashed = "";
                }
								var featured;
								if (obj.check2 == "true") {
									featured = "<span class='bx--tag bx--tag--private'>In evidenza</span>";
								} else {
									featured = "";
								}
								var slider;
								if (obj.check1 == "true") {
									slider = "<span class='bx--tag bx--tag--community'>Slider</span>";
								} else {
									slider = "";
								}
                var block = "<tr><td><b>" + maincontent.text1 + "&ensp;</b>" + draft + archived + trashed + featured + slider +"</td><td>" + obj.posted + "</td><td>" + obj.updated + "</td><td>" + obj.select1 + "</td><td>" + obj.select2 + "</td><td><i class='material-icons restore-trash' style='cursor:pointer;' id='restore-trash" + obj.id + "'>restore</i>&ensp;&ensp;<i class='material-icons delete-trash' style='cursor:pointer;' id='delete-trash" + obj.id + "'>cancel</i></td></tr>";
                $('#add-trash-table-here').append(block);
              }
            }
          }
        }
      }
    }

  }); // end of ajax call

  $('#loading-table').hide();

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


/*
 * Function: retrieveQuickInfo Â©
 * Returns: ricerca veloce di dati: bozza oppure no
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: July 2017
 */
function retrieveQuickInfo(id) {

  var post_id = id;
  var api = 'api/RetrieveQuickInfoDB.php'; // connects and updates the selected DB table
  var is_draft;

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      i: post_id
    },
    dataType: 'json',
    async: false,
    success: function(result) {

      for (var i in result.Response) {
        var obj = result.Response[i];
        is_draft = obj.public;
        return is_draft;

      }
    }

  }); // end of ajax call

  return is_draft;
}


/*
 * Function: retrieveQuickInfoPg Â©
 * Returns: ricerca veloce di dati: bozza oppure no
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: March 2018
 */
function retrieveQuickInfoPg(id) {

  var post_id = id;
  var api = 'api/RetrieveQuickInfoDB.php'; // connects and updates the selected DB table
  var is_page;

  $.ajax({
    url: api,
    type: 'POST',
    data: {
      i: post_id
    },
    dataType: 'json',
    async: false,
    success: function(result) {

      for (var i in result.Response) {
        var obj = result.Response[i];
        is_page = obj.page;
        return is_page;

      }
    }

  }); // end of ajax call

  return is_page;
}


/*
 * Function: generatePie Â©
 * Returns:
 * Author: Luca Crippa - luca.crippa88@gmail.com
 * Date: January 2018
 */
// function generatePie(num) {
//
//   const data = [
//     ['Gryffindor', 23],
//     ['Slytherin', 12],
//     ['Ravenclaw', 19],
//     ['Hufflepuff', 15],
//     ['Teachers', 5]
//   ];
//
//   const radius = 96;
//   const width = radius * 2;
//   const height = radius * 2;
//
//   const svg = d3.select('svg')
//     .attr('width', width)
//     .attr('height', height)
//     .append('g')
//     .attr('id', 'group-container' + num)
//     .attr('transform', `translate(${width / 2}, ${height / 2})`);
//
//   const color = d3.scaleOrdinal(['#3b1a40', '#473793', '#3c6df0', '#00a68f', '#56D2BB']);
//
//   const pie = d3.pie()
//     .sort(null)
//     .value((d) => d[1]);
//
//   const path = d3.arc()
//     .outerRadius(radius - 10)
//     .innerRadius(radius - 40);
//
//   const pathTwo = d3.arc()
//     .outerRadius(radius)
//     .innerRadius(radius - 40);
//
//   const arc = svg.selectAll('.arc')
//     .data(pie(data))
//     .enter().append('g')
//     .attr('class', 'arc')
//
//   arc.append('path')
//     .attr('d', path)
//     .attr('fill', (d, i) => color(i))
//     .attr('stroke-width', 2)
//     .attr('stroke', '#FFFFFF')
//     .on('mouseover', function(d) {
//       d3.select(this)
//         .transition()
//         .style('cursor', 'pointer')
//         .attr('d', pathTwo);
//
//       const tooltip = d3.select('#tooltip' + num)
//         .style('display', 'inherit');
//
//       const amount = d3.select('#amount' + num);
//       const item = d3.select('#item' + num);
//
//       amount
//         .text(`${d.data[1]}`);
//
//       item
//         .text(`${d.data[0]}`);
//     })
//     .on('mouseout', function(d) {
//       const tooltip = d3.select('#tooltip' + num)
//         .style('display', 'none')
//
//       d3.select(this)
//         .transition()
//         .attr('d', path);
//     });
//
// }
