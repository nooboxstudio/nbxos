<?php
include_once('kernel/conn.php');
include_once('kernel/functions.php');


// Verifica se a sessão não está ativa antes de iniciar
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}



// Verificar se o usuário está logado
if (!isset($_SESSION['email'])) {
    // Se não estiver logado, redirecionar para a página de login
    header("Location: login");
    exit();
}


$user_id = $_SESSION['user_id'];
echo "<script>";
echo "localStorage.setItem('user_id', '" . $user_id . "');";
echo "</script>";

?>

<!DOCTYPE html>
<html lang="pt">
<head>
    <meta charset="UTF-8">
    <title>DESKTOP | NBX OS</title>
    <link rel="stylesheet" href="core/assets/css/style.css">
    <link rel="shortcut icon" href="core/assets/img/favicon.ico" type="image/x-icon">
</head>
<body style="
            background-image: url('core/assets/img/login_bg.jpg');
            background-position: center;
            background-repeat: no-repeat;
            background-size: cover;
        ">
    <div id="taskbar">
        <div id="menu"></div>
        <div id="taskbar-apps"></div>
        <div id="clock">
            <div class="clock-container">
                <span class="time" id="time"></span>
                <span class="date" id="date"></span>
            </div>
            <div class="notify">
                <img src="core/assets/img/notifications_0.png"  width="24">
            </div>
            <script src="core/systemapps/clock.js"></script>
        </div>
    </div>
    <div id="notifications-center"></div>
    <div id="desktop">
    </div>
    <div id="menu-content">
        <div id="menu-content-list">
        <ul><?php echo listUserApps(); ?></ul>
        </div>
        <div id="menu-content-fixed">
            <div id="profile" style="cursor: pointer;"><?php echo $user_name; ?> | <?php echo $user_id?></div>
            <div id="settings" class="shutdown" style="cursor: pointer;"><img src="core/assets/img/settings.png" width="20"></div>
            <div id="appstore" class="shutdown" style="cursor: pointer;"><img src="core/assets/img/appstore.png" width="20"></div>
            <div id="shutdown" class="shutdown" style="cursor: pointer;"><a href="shutdown"><img src="core/assets/img/power.png" width="20"></a></div>
        </div>
    </div>
    <ul id="context-menu" class="context-menu">
        <li id="option1">Opção 1</li>
        <li id="option2">Opção 2 <span>></span>
            <ul class="submenu">
                <li>Sub-opção 2</li>
                <li>Sub-opção 1 <span>></span>
                    <ul class="submenu">
                        <li>Sub-opção 1</li>
                        <li>Sub-opção 2</li>
                    </ul>
                </li>
                
            </ul>
        </li>
        <li id="option3">Opção 3</li>
    </ul>

    <script src="core/assets/js/script.js"></script>
</body>
</html>
