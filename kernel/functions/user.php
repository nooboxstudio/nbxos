<?php
// Verificar se a sessão já não foi iniciada
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

include_once('./kernel/conn.php');

// Verificar se o usuário está logado
if (!isset($_SESSION['email'])) {
    // Se não estiver logado, redirecionar para a página de login
    header("Location: ../../login");
    exit();
}

// Obter o email do usuário da sessão
$mail = $_SESSION['email'];

// Consulta SQL para selecionar apenas as colunas 'email' e 'nome'
// Envolver o valor do email com aspas simples
$selectuser = "SELECT email, username FROM tb_users WHERE email = '$mail'";
$resultuser = $conn->query($selectuser);

// Verificar se há resultados e processar os dados
if ($resultuser->num_rows > 0) {
    while ($user = $resultuser->fetch_assoc()) {
        $user_mail = $user['email'];
        $user_name = $user['username'];
    }
} else {
    echo "Nenhum usuário encontrado.";
}

// Fechar a conexão (se necessário)
$conn->close();
?>
