<?php
// Incluir a conexão com o banco de dados SQLite
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

    // Consulta SQL para obter a senha criptografada do usuário
    $sql = "SELECT * FROM tb_users WHERE email=:email";
    $stmt = $db->prepare($sql);

    if ($stmt) {
        $stmt->bindValue(':email', $email, SQLITE3_TEXT);
        $result = $stmt->execute();

        // Verificar se o usuário foi encontrado
        if ($row = $result->fetchArray(SQLITE3_ASSOC)) {
            // Verificar a senha usando password_verify
            if (password_verify($password, $row['password'])) {
                // Iniciar a sessão e armazenar o email do usuário na variável de sessão
                $_SESSION['email'] = $email;
                $_SESSION['user_id'] = $row['user_id'];

                // Criar um script JavaScript para definir o user_id em localStorage
                echo "<script>";
                echo "localStorage.setItem('user_id', '" . $row['user_id'] . "');";
                echo "</script>";

                // Redirecionar para a página inicial
                header("Location: ./");
                exit();
            } else {
                // Senha incorreta
                ?>
                <div id="alertError" class="alert alert-danger" role="alert" style="display: block;">
                    <span id="alertText">Email ou senha incorretos, tente novamente!</span>
                </div>
                <?php
            }
        } else {
            // Email não encontrado
            ?>
            <div id="alertError" class="alert alert-danger" role="alert" style="display: block;">
                <span id="alertText">Email ou senha incorretos, tente novamente!</span>
            </div>
            <?php
        }
    } else {
        // Erro na preparação da consulta
        ?>
        <div id="alertError" class="alert alert-danger" role="alert" style="display: block;">
            <span id="alertText">Erro no banco de dados. Por favor, tente novamente mais tarde.</span>
        </div>
        <?php
    }
}
?>
<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>LOGIN | NBX OS</title>
    <script src="kernel/uuidGenerator.js"></script>
    <link rel="stylesheet" href="core/assets/css/login.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body>
    <!-- Exibir mensagens de sessão, se houver -->
    <?php if (isset($_SESSION['message'])): ?>
        <div class="alert alert-danger" role="alert">
            <?php echo htmlspecialchars($_SESSION['message']); ?>
        </div>
        <?php unset($_SESSION['message']); ?>
    <?php endif; ?>

    <!-- Formulário de login -->
    <div id="loginWindow">
        <form id="loginForm" method="post" action="login.php">
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

    <!-- Script para fechar alerta de erro automaticamente -->
    <script>
        function closeAlert() {
            var alertError = document.getElementById('alertError');
            if (alertError) {
                alertError.style.display = 'none';
            }
        }
        setTimeout(closeAlert, 5000);
    </script>
</body>
</html>
