<?php
session_start();
include_once('../conn.php');

function sanitize_input($data) {
    global $conn;
    return mysqli_real_escape_string($conn, trim($data));
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obter dados do formulário
    $username = sanitize_input($_POST['username']);
    $email = sanitize_input($_POST['email']);
    $password = password_hash(sanitize_input($_POST['password']), PASSWORD_BCRYPT); // Criptografar a senha

    // Verificar se o email já existe
    $sql = "SELECT * FROM tb_users WHERE email='$email'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        // Email já está sendo usado
        $_SESSION['message'] = 'Email já está sendo usado. Por favor, escolha outro email ou faça login.';
    } else {
        // Registrar novo usuário
        $sql = "INSERT INTO tb_users (username, email, password) VALUES ('$username', '$email', '$password')";

        if ($conn->query($sql) === TRUE) {
            // Obter o ID do novo usuário
            $user_id = $conn->insert_id;

            // Criar uma pasta com o ID do usuário
            $user_directory = "../../users/" . $user_id;
            if (!file_exists($user_directory)) {
                mkdir($user_directory, 0777, true);
            }
            $_SESSION['message'] = 'Registrado com sucesso!';
            header("Location: ../../login");
            $conn->close();

    exit();
        } else {

            $_SESSION['message'] = 'Erro ao registrar. Por favor, tente novamente.';
            header("Location: ../../register");
            $conn->close();

    exit();
        }
    }
    
}
?>
