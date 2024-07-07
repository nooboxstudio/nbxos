<?php

// Configurações do banco de dados
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "nbxos";

// Criar a conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar a conexão
if ($conn->connect_error) {
    die("Erro na conexão: " . $conn->connect_error);
}

?>
