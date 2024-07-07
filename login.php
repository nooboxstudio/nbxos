<?php
// Incluir a conexão com o banco de dados
include('kernel/conn.php');

// Configurar o tempo de vida da sessão para 8 horas (em segundos)
$session_lifetime = 8 * 60 * 60; // 8 horas
session_set_cookie_params($session_lifetime);

// Início da sessão após configurar o cookie
session_start();

// Verificar se o usuário já está logado
if (isset($_SESSION['email'])) {
    // Se estiver logado, redirecionar para a página inicial
    header("Location: ./");
    exit();
}

// Processar o formulário de login se o método for POST
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // Obter dados do formulário
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Consulta SQL para verificar as credenciais
    $sql = "SELECT * FROM tb_users WHERE email='$email' AND password='$password'";
    $result = $conn->query($sql);

    // Verificar se o usuário foi encontrado
    if ($result->num_rows > 0) {
        $users = $result->fetch_assoc();
        // Iniciar a sessão e armazenar o nome de usuário na variável de sessão
        $_SESSION['email'] = $email;
        $_SESSION['user_id'] = $users['user_id'];

        // Redirecionar para a página inicial
        header("Location: ./");
        exit();
    } else {
        echo "Credenciais inválidas. Tente novamente.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>LOGIN | NBX OS</title>
    <script src="kernel/uuidGenerator.js"></script>
    <link rel="stylesheet" href="core/assets/css/login.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Alerta de erro -->
    <div id="alertError" class="alert alert-danger" role="alert" style="display: none;">
        <span id="alertText"></span>
        <button type="button" class="btn-close" onclick="closeAlert()">×</button>
    </div>

    <div id="loginWindow">
        <form id="loginForm" method="post" action="login">
            <div id="row">
                <span class="form-logo">NBX OS</span>
            </div>
            <div id="row">
                <input type="text" name="email" placeholder="E-mail" required>
            </div>
            <div id="row">
                <input type="password" name="password" placeholder="Password" required>
            </div>
            <div id="row">
                <button type="submit" class="btn-login">Login</button>
            </div>
        </form>
        <div id="row" class="register-span">Não possui uma conta? <a href="register" class="purple">Registre-se!</a></div>
    </div>
</body>
</html>
