<?php
require_once 'core/startup/clear_clipboard.php';
session_start();
echo "<script>";
echo "localStorage.removeItem('user_id');";
echo "</script>";
// Verificar se o usuário está logado
if (isset($_SESSION['email'])) {
    // Destruir a sessão
    session_destroy();

    // Limpar o user_id do localStorage via JavaScript
    

    // Redirecionar para a página de login após o logout
    header("Location: login.php");
    exit();
} else {
    // Se o usuário não estiver logado, redirecionar para a página de login
    header("Location: login.php");
    exit();
}
?>
