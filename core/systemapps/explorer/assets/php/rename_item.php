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
$oldPath = $baseDir . '/' . $data['oldPath'];
$newPath = $baseDir . '/' . $data['newPath'];

if (rename($oldPath, $newPath)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['success' => false, 'error' => 'Erro ao renomear o item']);
}
?>
