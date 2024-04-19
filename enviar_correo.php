<?phpuse PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require_once 'PHPMailer-master/src/Exception.php';
require_once 'PHPMailer-master/src/PHPMailer.php';
require_once 'PHPMailer-master/src/SMTP.php';

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com';
    $mail->SMTPAuth = true;
    $mail->Username = 'personacuenta582@gmail.com';
    $mail->Password = '2006Ricardo,'; // Reemplazar con tu contraseña SMTP
    $mail->SMTPSecure = 'tls';
    $mail->Port = 587;

    $email = 'coladoroberto04@gmail.com'; // Dirección de correo del destinatario
    $name = 'PSICOLOGO1'; // Nombre del destinatario

    // Configurar el remitente y el destinatario
    $mail->setFrom('personacuenta582@gmail.com', 'Remitente');
    $mail->addAddress($email, $name); // Cambiar a la dirección del destinatario
    $mail->addReplyTo('personacuenta582@gmail.com', 'Responder');

    // Reemplazar variables de plantilla en el cuerpo del correo


    $mail->Subject = 'PROPUESTA DE CITA';
    $mail->Body =$body = "Hola ,

    Tienes una propuesta de cita por parte de VAT.
    
    El usuario $name ha decidido contactarse con usted para agendar una cita. A continuación, se detallan los datos proporcionados:
    
    Nombre: $name
    Edad: {{age}}
    Sexo: {{gender}}
    Fecha de Nacimiento: {{birthdate}}
    Fecha de Cita Propuesta: {{appointmentDate}}
    
    Por favor, confirma la disponibilidad y confirma la cita.
    
    O si lo prefieres puedes enviar tu mismo un correo al usuario:
    
    Correo del usuario: {{email}}
    
    Saludos,
    Equipo de VAT";;

    // Enviar el correo
    $mail->send();
    echo 'Correo enviado correctamente';
} catch (Exception $e) {
    echo 'Error al enviar el correo: ' . $mail->ErrorInfo;
}

?>
