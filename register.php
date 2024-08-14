<?php
session_start();

// Incluir a conexão com o banco de dados SQLite
include('kernel/conn.php');

// Função para sanitizar dados de entrada
function sanitize_input($data) {
    return SQLite3::escapeString(trim($data));
}

// Verificar se o formulário foi enviado via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Obter dados do formulário
    $username = sanitize_input($_POST['username']);
    $email = sanitize_input($_POST['email']);
    $password = password_hash(sanitize_input($_POST['password']), PASSWORD_BCRYPT); // Criptografar a senha

    // Verificar se o email já existe
    $sql = "SELECT * FROM tb_users WHERE email=:email";
    $stmt = $db->prepare($sql);
    if ($stmt) {
        $stmt->bindValue(':email', $email, SQLITE3_TEXT);
        $result = $stmt->execute();

        if ($result->fetchArray(SQLITE3_ASSOC)) {
            // Email já está sendo usado
            $_SESSION['message'] = 'Email já está sendo usado. Por favor, escolha outro email ou faça login.';
            header("Location: register.php");
            exit();
        } else {
            // Registrar novo usuário
            $sql = "INSERT INTO tb_users (username, email, password) VALUES (:username, :email, :password)";
            $stmt = $db->prepare($sql);
            $stmt->bindValue(':username', $username, SQLITE3_TEXT);
            $stmt->bindValue(':email', $email, SQLITE3_TEXT);
            $stmt->bindValue(':password', $password, SQLITE3_TEXT);

            if ($stmt->execute()) {
                // Obter o ID do novo usuário
                $user_id = $db->lastInsertRowID();

                // Criar uma pasta com o ID do usuário
                $user_directory = "users/" . $user_id;
                if (!file_exists($user_directory)) {
                    mkdir($user_directory, 0777, true);
                    mkdir($user_directory.'/clipboard', 0777, true);
                    mkdir($user_directory.'/trash-inf', 0777, true);
                    mkdir($user_directory.'/apps', 0777, true);
                    mkdir($user_directory.'/userfiles/desktop', 0777, true);
                    mkdir($user_directory.'/userfiles/documents', 0777, true);
                    mkdir($user_directory.'/userfiles/images', 0777, true);
                    mkdir($user_directory.'/userfiles/musics', 0777, true);
                    mkdir($user_directory.'/userfiles/trash', 0777, true);
                    mkdir($user_directory.'/userfiles/videos', 0777, true);
                }
                $_SESSION['message'] = 'Registrado com sucesso!';
                header("Location: login");
                exit();
            } else {
                $_SESSION['message'] = 'Erro ao registrar. Por favor, tente novamente.';
                header("Location: register");
                exit();
            }
        }
    } else {
        $_SESSION['message'] = 'Erro ao preparar a consulta. Por favor, tente novamente.';
        header("Location: register");
        exit();
    }
}

// Fechar a conexão com o banco de dados
$db->close();
?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>Registro | NBX OS</title>
    <script src="kernel/uuidGenerator.js"></script>
    <link rel="stylesheet" href="core/assets/css/login.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body>
<?php
if (isset($_SESSION['message'])) { ?>
    <div id="alertError" class="alert alert-danger" role="alert" style="display: block;">
        <span id="alertText">
            <?php echo htmlspecialchars($_SESSION['message']); ?>
        </span>
        <button type="button" class="btn-close" onclick="closeAlert()">×</button>
    </div>
    <?php unset($_SESSION['message']); }  ?>

<div id="loginWindow">
    <form id="registerForm" method="post" action="register.php">
        <div id="row"><span class="form-logo">NBX OS</span></div>
        <div id="row"><input type="text" name="username" placeholder="Name" required></div>
        <div id="row"><input type="text" name="email" placeholder="E-mail" required></div>
        <div id="row"><input type="password" name="password" placeholder="Senha" required></div>
        <div id="row"><button type="submit" class="btn-login">Register</button></div>
        <div id="row" class="register-span">Já possui conta? <a href="login.php" class="purple">Login!</a></div>
    </form>
</div>

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
