<?php
// Incluye el archivo de conexión
include("conexion.php");

// Recibe los valores del formulario
$nombre = $_POST["nombre"];
$contrasena = $_POST["contrasena"];
$correo = $_POST["correo"];
$usuario = $_POST["usuario"];

// Prepara la consulta SQL
$sql = "INSERT INTO registro_us (Correo, Nombre, Usuario, Contrasena) VALUES ('$correo', '$nombre', '$usuario', '$contrasena')";

// Ejecuta la consulta y verifica si se ha insertado correctamente
if (mysqli_query($conexion, $sql)) {
    echo "Los valores se han insertado correctamente en la tabla.";
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conexion);
}

?>
