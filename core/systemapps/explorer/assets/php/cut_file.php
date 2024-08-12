<?php
session_start();

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['error' => 'Usuário não autenticado']);
    exit();
}

$user_id = $_SESSION['user_id'];
$baseDir = '../../../users/'.$user_id.'/userfiles/';
$fileName = $_POST['fileName'];
$sourceFolder = $_POST['sourceFolder'];
$targetFolder = $_POST['targetFolder'];

$sourcePath = $baseDir . $sourceFolder . '/' . $fileName;
$targetPath = $baseDir . $targetFolder . '/' . $fileName;

if (rename($sourcePath, $targetPath)) {
    echo json_encode(['success' => true]);
} else {
    echo json_encode(['error' => 'Falha ao mover o arquivo']);
}
?>
