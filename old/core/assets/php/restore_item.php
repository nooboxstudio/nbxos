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
$trashInfoDir = '../../../../../users/'.$user_id.'/trash-inf/';
$trashDir = $baseDir . '/trash/';
$data = json_decode(file_get_contents('php://input'), true);
$infoFilePath = $trashInfoDir . 'trash_info.json';

header('Content-Type: application/json'); // Define o tipo de conteúdo como JSON

if (file_exists($infoFilePath)) {
    $infoData = json_decode(file_get_contents($infoFilePath), true);
    $info = isset($infoData[$data['filename']]) ? $infoData[$data['filename']] : null;

    if ($info) {
        $originalPath = realpath($info['original_path']);
        $trashPath = realpath($info['trash_path']);

        if ($originalPath && $trashPath && (is_file($trashPath) || is_dir($trashPath))) {
            // Verifica se já existe um arquivo ou diretório com o mesmo nome na pasta original
            $restorePath = $originalPath;
            $counter = 1;

            while (file_exists($restorePath)) {
                $restorePath = pathinfo($originalPath, PATHINFO_DIRNAME) . '/' . pathinfo($originalPath, PATHINFO_FILENAME) . "($counter)." . pathinfo($originalPath, PATHINFO_EXTENSION);
                $counter++;
            }

            // Move o item para a pasta original
            if (rename($trashPath, $restorePath)) {
                // Remove o arquivo de informações após a restauração
                unset($infoData[$data['filename']]);
                file_put_contents($infoFilePath, json_encode($infoData));

                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => 'Erro ao restaurar o item. Verifique permissões e caminhos.']);
            }
        } else {
            echo json_encode(['success' => false, 'error' => 'Item não encontrado no lixo ou caminho inválido']);
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Informações do item não encontradas']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Arquivo de informações não encontrado']);
}
?>
