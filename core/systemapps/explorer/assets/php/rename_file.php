<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit();
}

$user_id = $_SESSION['user_id'];
$baseDir = '../../../users/'.$user_id.'/userfiles/';
$oldName = $_POST['oldName'];
$newName = $_POST['newName'];
$folder = $_POST['folder'];

$oldPath = $baseDir . $folder . '/' . $oldName;
$newPath = $baseDir . $folder . '/' . $newName;

if (rename($oldPath, $newPath)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Falha ao renomear o arquivo']);
}
?>
