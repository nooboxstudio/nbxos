<?php
session_start();

// Verificar se o usuário está logado
if (isset($_SESSION['email'])) {
    // Destruir a sessão
    session_destroy();

    // Redirecionar para a página de login após o logout
    header("Location: login");
    exit();
} else {
    // Se o usuário não estiver logado, redirecionar para a página de login
    header("Location: login");
    exit();
}
?>
