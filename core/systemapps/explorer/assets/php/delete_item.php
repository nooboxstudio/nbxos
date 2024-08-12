<?php
session_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$user_id = $_SESSION['user_id'];

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit();
}

$baseDir = '../../../../../users/'.$user_id.'/userfiles/';
$data = json_decode(file_get_contents('php://input'), true);
$path = $baseDir . '/' . $data['path'];

if (is_file($path)) {
    if (unlink($path)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao excluir o arquivo']);
    }
} elseif (is_dir($path)) {
    // Move para a pasta trash
    $trashDir = $baseDir . '/trash/';
    if (!is_dir($trashDir)) {
        mkdir($trashDir, 0777, true);
    }

    $newPath = $trashDir . basename($path);
    if (rename($path, $newPath)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao mover a pasta para o lixo']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Item não encontrado']);
}
?>
