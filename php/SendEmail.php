<?
// -----------------------------------------------------------------------------
// Website info

	$SiteName = "...";
	$SiteWork = "...";
	$SiteMin = "...";
  $SiteEmail = "info@...";
	$ThankYouMessage = "$SiteMin - Messaggio inviato!";
	// $SiteTel = "Tel (+39) 039. ...";
	// $SiteFax = "Fax (+39) 039. ...";
	// $SiteSocial = "#...";
	// $SiteAddress = "...";

	$secret = "put-here-recaptcha-secret";


// -----------------------------------------------------------------------------
// Retrieve contents

	$UserName = $_POST['UserName'];
	$UserSubject = $_POST['UserSubject'];
	$UserEmail = $_POST['UserEmail'];
	$UserComments = $_POST['UserComments'];
	$UserAuth = $_POST['UserAuth'];
	$response = $_POST["UserCaptcha"];

	$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$secret}&response={$response}");
	$captcha_success = json_decode($verify);

// Send error to contact page
	if ( ($captcha_success->success==false)||($UserAuth=="false") ) {
		$array['Sent'] = array('payload' => 'error');
		echo json_encode($array);
	}

// Send error to contact page
	// if ($UserAuth=="false") {
	// 	$array['Sent'] = array('payload' => 'errorauth');
	// 	echo json_encode($array);
	// }

	if ( ($captcha_success->success==true)&&($UserAuth=="true") ) {

    $UserAuth_norm = "sì"; // Authorization from "true" to "sì"


// -----------------------------------------------------------------------------
// Set up admin message

	$UserSubj = "$UserSubject";

	$AdminHeaders = "From: $UserEmail\r\n";
	$AdminHeaders .= "To: $SiteEmail\r\n";
	$AdminHeaders .= "Reply-To: $UserEmail\r\n";
	$AdminHeaders .= "Return-Path: $UserEmail\r\n";
	$AdminHeaders .= "CC:\r\n";
	$AdminHeaders .= "BCC:\r\n";
	$AdminHeaders .= "MIME-Version: 1.0\r\n";
	$AdminHeaders .= "Content-Type: text/html; charset=ISO-8859-1\r\n";
	$AdminHeaders .= "X-Priority: 3\r\n";
	$AdminHeaders .= "X-Mailer: PHP". phpversion() ."\r\n";

	$AdminMessage = "Messaggio ricevuto da $UserName \n";
	$AdminMessage .= "$UserEmail \n";
	$AdminMessage .= "-------------------------------------------------\n";
	$AdminMessage .= "Messaggio:\n";
	$AdminMessage .= "\n";
	$AdminMessage .= "$UserComments\n";
	$AdminMessage .= "\n\n";
	$AdminMessage .= "-------------------------------------------------\n";
	$AdminMessage .= "Autorizzo al trattamento dei miei dati personali ai sensi degli art. 13-14 del GDPR 2016/679: $UserAuth_norm \n";
	$AdminMessage .= "-------------------------------------------------\n";
	$AdminMessage .= "Puoi rispondere al messaggio di $UserName scrivendo all'indirizzo $UserEmail\n\n";

// -----------------------------------------------------------------------------
// Send confirmation to contact page

	$array['Sent'] = array('payload' => 'sent');
	echo json_encode($array);

// -----------------------------------------------------------------------------
// Send the emails

	//mail($UserEmail, $ThankYouMessage, $UserMessage, $UserHeaders); // confirmation email to user
	mail("$SiteEmail", "$UserSubj", $AdminMessage, "From: $UserEmail"); // email to admin

}

?>
