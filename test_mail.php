<?php
$to = "bobbot@wobbob.pro";
$subject = "Test email from PHP";
$message = "This is a test email to verify PHP mail function.";
$headers = "From: your-email@example.com";

if (mail($to, $subject, $message, $headers)) {
    echo "Test email sent successfully!";
} else {
    echo "Failed to send test email.";
}
?>
