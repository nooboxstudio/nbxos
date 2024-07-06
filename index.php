<!DOCTYPE html>
<html lang="en">
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
    <div id="topbar">
        <div id="menutop"></div>
        <div id="menutopcontent" class="menutopcontent">
        <!-- Conteúdo do menu aqui -->
            <ul>
                <li id="profile" class="user"><a>Profile</a></li>
                <li class="logout"><a href="core/login/logout.php">Logout</a></li>
            </ul>
        </div>
    </div>
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
        <ul>
            <li>teste</li>
        </ul>
        </div>
        <div id="menu-content-fixed">
            
        </div>
    </div>
    

    <script src="core/assets/js/script.js"></script>
</body>
</html>
