<?php
$to = "jcsiervo8701parado@yahoo.com";
$subject = "Working Subject";
$txt = "Hello world! YESSS";
$headers = "From: raullavin18@gmail.com" . "\r\n" .
"CC: jarias1@knights.ucf.edu";

mail($to,$subject,$txt,$headers);
?>