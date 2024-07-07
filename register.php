<?php
session_start();
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
    <form id="registerForm" method="post" action="kernel/functions/register.php">
        <div id="row"><span class="form-logo">NBX OS</span></div>
        <div id="row"><input type="text" name="username" placeholder="Name" required></div>
        <div id="row"><input type="text" name="email" placeholder="E-mail" required></div>
        <div id="row"><input type="password" name="password" placeholder="Senha" required></div>
        <div id="row"><button type="submit" class="btn-login">Register</button></div>
        <div id="row" class="register-span">Já possuí conta? <a href="login.php" class="purple">Login!</a></div>
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
