<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require "PHPMailer/src/Exception.php";
require "PHPMailer/src/PHPMailer.php";

$mail = new PHPMailer(true);

$mail->CharSet = "UTF-8";
$mail->IsHTML(true);

$email = $_POST["email"];
$email_template = "template_mail.html";

$body = file_get_contents($email_template);
$body = str_replace('%email%', $email, $body);

$mail->addAddress("vacheslav69moss@gmail.com");
$mail->setFrom($email);
$mail->Subject = "[Form request]";
$mail->MsgHTML($body);

if (!$mail->send()) {
    $message = 'Ошибка';
} else {
    $message = 'Данные отправлены!';
    // Отправка автоматического ответа пользователю
    $autoResponse = new PHPMailer(true);
    $autoResponse->CharSet = "UTF-8";
    $autoResponse->IsHTML(true);
    $autoResponse->addAddress($email); // Адрес, на который отправляется автоответ
    $autoResponse->setFrom("your_email@example.com"); // Твой адрес электронной почты
    $autoResponse->Subject = "thank you for your request!";
    $autoResponse->Body = "Thank you for submitting your email address! Here is your free tutorial: https://www.youtube.com/watch?v=fV1er2csjro&ab_channel=Creaconelb%C3%BAho";
    $autoResponse->send();
}

$response = ['message' => $message];

header('location: index.html');
echo json_encode($response);

?>