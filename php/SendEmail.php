<?
// -----------------------------------------------------------------------------
// Support info

	$ThankYouMessage = "$SiteMin - Messaggio inviato!";

// -----------------------------------------------------------------------------
// Retrieve contents

	$UserName = $_POST['UserName'];
	$UserSubject = $_POST['UserSubject'];
	$UserEmail = $_POST['UserEmail'];
	$UserComments = $_POST['UserComments'];


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
	$AdminMessage .= "Puoi rispondere al messaggio di $UserName scrivendo all'indirizzo $UserEmail\n\n";

// -----------------------------------------------------------------------------
// Send confirmation to contact page

	$array['Sent'] = array('payload' => 'sent');
	echo json_encode($array);

// -----------------------------------------------------------------------------
// Send the emails

	mail("$SiteEmail", "$UserSubj", $AdminMessage, "From: $UserEmail"); // email to admin

?>
