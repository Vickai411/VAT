<?php
session_start(); // Iniciamos la sesión
include('conexion.php'); // Incluimos el archivo de conexión

if(isset($_POST['login'])) { // Verificamos si se ha enviado el formulario
    $correo = $_POST['correo'];
    $contrasena = $_POST['contrasena'];

    // Verificamos si el usuario y la contraseña existen en la base de datos
    $consulta = "SELECT * FROM usuarios WHERE correo = '$correo' AND contrasena = '$contrasena'";
    $resultado = mysqli_query($conexion, $consulta);

    if(mysqli_num_rows($resultado) > 0) { // Si el usuario y la contraseña son correctos
        $_SESSION['correo'] = $correo; // Iniciamos la sesión para el usuario
        header('Location: pg3-1.html'); // Redirigimos a la página de bienvenida
    } else { // Si el usuario y/o la contraseña son incorrectos
        $error = "El correo electrónico y/o la contraseña son incorrectos";
    }
}
?>

<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="estilo.css">
    <title>Login</title>
</head>
<body>
    
    <?php if(isset($error)) echo $error; ?>
<div class="box"><h1>Iniciar sesión</h1>
<form method="post" action="login.php">
    <label for="correo">Correo electrónico:</label>
    <input type="email" name="correo" required><br>

    <label for="contrasena">Contraseña:</label>
    <input type="password" name="contrasena" required><br>

    <input type="submit" name="login" value="Iniciar sesión">
</form><div class="bottom">
    <a class="back-button" onclick="window.history.back()">Volver a la página anterior</a>
</div>
</div>


</body>
</html>