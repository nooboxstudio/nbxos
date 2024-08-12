<?php
session_start();

if (!isset($_SESSION['user_id']) || !isset($_SESSION['email'])) {
    header("Location: login");
    exit();
}

$user_id = $_SESSION['user_id'];

// Corrija o caminho da pasta clipboard conforme necessário
$clipboardDir = __DIR__ . '/../../users/' . $user_id . '/clipboard/';

// Função para remover arquivos e diretórios recursivamente
function recursiveDelete($dir) {
    if (!file_exists($dir)) return;

    if (is_file($dir)) {
        unlink($dir);
    } elseif (is_dir($dir)) {
        $items = array_diff(scandir($dir), array('.', '..'));
        foreach ($items as $item) {
            recursiveDelete($dir . DIRECTORY_SEPARATOR . $item);
        }
        rmdir($dir);
    }
}

// Limpa o diretório do clipboard
recursiveDelete($clipboardDir);

echo json_encode(['success' => true]);
?>
