<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect and sanitize form data
    $name = htmlspecialchars(strip_tags(trim($_POST["name"])));
    $email = htmlspecialchars(strip_tags(trim($_POST["email"])));
    $message = htmlspecialchars(strip_tags(trim($_POST["message"])));

    // Validate email
    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid email format";
        exit;
    }

    // Email parameters
    $to = "enquiries@wobbob.pro";
    $subject = "New message from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email";

    // Send email
    if (mail($to, $subject, $body, $headers)) {
        echo "Your message has been sent successfully!";
    } else {
        echo "There was an error sending your message. Please try again later.";
    }
}
?>
