<?php
/*
 * API: SendPush ©
 * Returns: sends push notification using OneSignal
 * Requires: OneSignal app_id & auth key
 * Author: OneSignal, Luca Crippa - luca.crippa88@gmail.com
 * Reference: https://documentation.onesignal.com/reference#create-notification
 * Date: July 2018
 */

function sendMessage() {

  $title = addslashes($_POST['title']);
  $text = addslashes($_POST['text']);
  $url = addslashes($_POST['url']);
  $segment = addslashes($_POST['segment']);

    $content = array("en" => $text);
    $headings = array("en" => $title);
    $hashes_array = array();

    $fields = array(
        'app_id' => "insert-app-id-here", // INSERT APP ID HERE
        'included_segments' => array($segment),
        'contents' => $content,
        'headings' => $headings,
        'url' => $url,
    );

    $fields = json_encode($fields);

    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic insert-rest-api-key-here' // INSERT API KEY HERE
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);

    $response = curl_exec($ch);
    curl_close($ch);

    return $response;
}

$response = sendMessage();

$array['Response'] = array(
  'sent' => 'ok',
);

echo json_encode($array); // Returns confirmation

?>
