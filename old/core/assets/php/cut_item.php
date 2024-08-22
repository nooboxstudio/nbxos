<?php
header('Content-Type: application/json');

// Recebe os dados enviados pela requisição POST
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['path'])) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

session_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$user_id = $_SESSION['user_id'];

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit();
}

$baseDir = __DIR__ . '../../../../../../users/' . $user_id . '/userfiles/';
$clipboardDir = __DIR__ . '../../../../../../users/' . $user_id . '/clipboard/';

$sourcePath = realpath($baseDir . '/' . $data['path']);
$destinationPath = $clipboardDir . basename($sourcePath);

if (!file_exists($sourcePath)) {
    echo json_encode(['success' => false, 'error' => 'Item não encontrado.']);
    exit;
}

// Garante que o diretório de clipboard exista
if (!is_dir($clipboardDir)) {
    mkdir($clipboardDir, 0777, true);
}

// Move o arquivo ou pasta para o clipboard
try {
    if (is_file($sourcePath)) {
        rename($sourcePath, $destinationPath);
    } elseif (is_dir($sourcePath)) {
        rename($sourcePath, $destinationPath);
    }
    echo json_encode(['success' => true, 'clipboardPath' => $destinationPath]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}
