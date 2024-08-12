<?php
session_start();
// Verifica se a sessão não está ativa antes de iniciar
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}
$user_id = $_SESSION['user_id'];


// Verificar se o usuário está logado
if (!isset($_SESSION['email'])) {
    // Se não estiver logado, redirecionar para a página de login
    header("Location: login");
    exit();
}



$baseDir = '../../../users/'.$user_id.'/userfiles/';
$folder = isset($_GET['folder']) ? $_GET['folder'] : '';



$fullPath = $baseDir . $folder;

if (is_dir($fullPath)) {
    $files = array_diff(scandir($fullPath), array('..', '.'));
    $response = array();


    foreach ($files as $file) {
        $filePath = $fullPath . '/' . $file;
        $type = is_dir($filePath) ? 'folder' : 'file';
        $response[] = ['name' => $file, 'type' => $type];
    }

    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    header('Content-Type: application/json');
    echo json_encode(['error' => 'Pasta não encontrada']);
}
?>
