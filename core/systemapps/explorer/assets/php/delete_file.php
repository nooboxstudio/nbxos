<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit();
}

$user_id = $_SESSION['user_id'];
$baseDir = '../../../users/'.$user_id.'/userfiles/';
$fileName = $_POST['fileName'];
$folder = $_POST['folder'];
$trashDir = $baseDir . 'trash/';

if (!is_dir($trashDir)) {
    mkdir($trashDir, 0777, true);
}

$filePath = $baseDir . $folder . '/' . $fileName;
$trashPath = $trashDir . $fileName;

if (rename($filePath, $trashPath)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Falha ao mover para a lixeira']);
}
?>
