<?php
// Receive and sanitize input
$date = $_POST['event-date'];
$title = $_POST['event-title'];
$details = $_POST['event-details'];
$pw = $_POST['psw'];

// Ensure correct pw
$hash = '$2y$10$jQXUxyEnb5G.68UEn1odY.iA.aCazgeaQg2LKEvrHcmeuk175Jj3y';

if (password_verify($pw, $hash)) {
    // open events xml and add event
	$xml = simplexml_load_file(__DIR__ . '/../events/eventos-getsemani.xml');
	$sxml = $xml->addChild('date');
	$sxml->addAttribute('value', $date);
	$ttl = $sxml->addChild('title');
	$ttl->addAttribute('value', $title);
	$ttl->addChild('startTime', '8:00 AM');
	$ttl->addChild('endTime', '5:00 PM');
	$ttl->addChild('description', $details);

	$xml->asXML(__DIR__ . '/../events/eventos-getsemani.xml');
}
header('Location: ../eventos.html');
?>