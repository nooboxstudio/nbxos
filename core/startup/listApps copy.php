<?php
session_start(); // Inicia a sessão, se ainda não estiver iniciada
include_once('../../kernel/conn.php');

if (isset($_SESSION['email'])) {
    $userEmail = $_SESSION['email'];

    // Query para obter o user_id da tabela tb_users com base no email da sessão
    $sql = "SELECT user_id FROM tb_users WHERE email = '$userEmail'";
    $result = $conn->query($sql);

    if ($result->num_rows > 0) {
        $row = $result->fetch_assoc();
        $userId = $row["user_id"];
        
        // Constrói o caminho para a pasta de aplicativos do usuário
        $appsDir = "../../users/{$userId}/apps/";
        
        $apps = [];

        // Verifica e lê os manifest.json de cada pasta de aplicativo
        foreach (glob($appsDir . '*', GLOB_ONLYDIR) as $appDir) {
            $manifestFile = $appDir . '/manifest.json';
            if (file_exists($manifestFile)) {
                $manifest = json_decode(file_get_contents($manifestFile), true);
                if ($manifest) {
                    $apps[] = $manifest;
                }
            }
        }

        // Retorna a lista de aplicativos em formato JSON
        header('Content-Type: application/json');
        echo json_encode($apps);

    } else {
        echo "Nenhum usuário encontrado na tabela tb_users com o email $userEmail.";
    }
} else {
    echo "A sessão de email não está definida.";
}

$conn->close();
?>
