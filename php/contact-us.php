<?php
// Set your email below
$to = "ministeriosgetsemani@yahoo.com";
// Receive and sanitize input
$name = $_POST['name'];
$email = $_POST['email'];
$phone = $_POST['phone'];
$message = $_POST['message'];
$subject = "Encuesta de pagina oficial Ministerios Getsemani";
$headers = "From: ". $email;

// set up email
$msg = "Información del Remitente \nName: " . $name . "\nEmail: " . $email . "\nPhone: " . $phone . "\n\n" . $message;
$msg = wordwrap($msg,70);

// mail
mail($to,$subject,$msg,$headers);
header('Location: ../visitanos.html');
?>