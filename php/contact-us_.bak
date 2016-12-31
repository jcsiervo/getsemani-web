<?php

$senderName = 'Raul Lavin'; //Enter the sender name
$username = 'lavin.raul@yahoo.com'; //Enter your Email
$password = 'Skyline18';// Enter the Password


$recipients = array(
    'lavin.raul@yahoo.com' => 'Yahoo User'
);
///That's all you need to do

//No need to edit bellow
require '../PHPMailerAutoload.php';

//Create a new PHPMailer instance
$mail = new PHPMailer();

// Set up SMTP
$mail->IsSMTP();
$mail->SMTPAuth   = true;
$mail->SMTPSecure = "tls";
$mail->Host       = "smtp.mail.yahoo.com";
$mail->Port       = 465; // we changed this from 486
$mail->Username   = $username;
$mail->Password   = $password;


$msg = 'Name: ' .$_POST['name'] ."\n"
        .'Email: ' .$_POST['email'] ."\n"
        . 'Phone: ' .$_POST['phone'] ."\n"
        . 'Message: ' .$_POST['message'];

$msg = wordwrap($msg,70);
mail($recipients,"New Form Submission",$msg);

header('location:contact-thank-you.html');


?>