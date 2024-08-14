<?php
session_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

// Obtém o ID do usuário a partir da sessão
$user_id = $_SESSION['user_id'];

// Verifica se o usuário está autenticado
if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit();
}

// Define o diretório base do usuário
$baseDir = '../../../../../users/'.$user_id.'/userfiles/';

if (isset($_GET['file'])) {
    // Decodifica o caminho do arquivo
    $filePath = urldecode($_GET['file']);
    
    // Constrói o caminho completo do arquivo
    $fullPath = $baseDir . $filePath;

        // Verifica se o arquivo existe
    if (file_exists($fullPath)) {
        // Lê o conteúdo do arquivo
        $content = file_get_contents($fullPath);

        // Retorna o conteúdo como JSON
        echo json_encode([
            'success' => true,
            'content' => $content
        ]);
    } else {
        // Retorna erro se o arquivo não for encontrado
        echo json_encode([
            'success' => false,
            'error' => 'Arquivo não encontrado. Caminho: ' . htmlspecialchars($fullPath)
        ]);
    }
} else {
    // Retorna erro se o parâmetro não for passado
    echo json_encode([
        'success' => false,
        'error' => 'Nenhum arquivo especificado.'
    ]);
}
?>
