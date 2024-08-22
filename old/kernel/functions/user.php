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

// Consulta SQL para selecionar apenas as colunas 'email' e 'username'
$selectuser = "SELECT * FROM tb_users WHERE email = :email";
$stmt = $db->prepare($selectuser);

if ($stmt) {
    $stmt->bindValue(':email', $mail, SQLITE3_TEXT);
    $resultuser = $stmt->execute();

    // Verificar se há resultados e processar os dados
    if ($user = $resultuser->fetchArray(SQLITE3_ASSOC)) {
        $user_mail = $user['email'];
        $user_name = $user['username'];
        $user_id = $user['user_id'];
    } else {
        echo "Nenhum usuário encontrado.";
    }
} else {
    echo "Erro ao preparar a consulta.";
}
?>
