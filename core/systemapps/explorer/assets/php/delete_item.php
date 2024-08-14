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

if (!is_dir($trashDir)) {
    mkdir($trashDir, 0777, true);
}

if (!is_dir($trashInfoDir)) {
    mkdir($trashInfoDir, 0777, true);
}

$data = json_decode(file_get_contents('php://input'), true);
$path = $baseDir . '/' . $data['path'];
$infoFilePath = $trashInfoDir . 'trash_info.json';

// Função para gerar um novo nome caso já exista
function generateUniquePath($path) {
    $fileInfo = pathinfo($path);
    $baseName = $fileInfo['basename'];
    $extension = isset($fileInfo['extension']) ? '.' . $fileInfo['extension'] : '';
    $baseNameWithoutExt = isset($fileInfo['extension']) ? substr($baseName, 0, -(strlen($extension))) : $baseName;
    $counter = 1;

    while (file_exists($path)) {
        $newBaseName = $baseNameWithoutExt . '(' . $counter . ')' . $extension;
        $path = $fileInfo['dirname'] . '/' . $newBaseName;
        $counter++;
    }

    return $path;
}

if (is_file($path) || is_dir($path)) {
    $newPath = $trashDir . basename($path);
    $uniqueNewPath = generateUniquePath($newPath);

    if (is_file($path)) {
        if (rename($path, $uniqueNewPath)) {
            // Armazenar informações do item movido
            $info = [
                'original_path' => $path,
                'trash_path' => $uniqueNewPath
            ];
            $infoData = file_exists($infoFilePath) ? json_decode(file_get_contents($infoFilePath), true) : [];
            $infoData[basename($uniqueNewPath)] = $info;
            file_put_contents($infoFilePath, json_encode($infoData));

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Erro ao mover o arquivo para o lixo']);
        }
    } elseif (is_dir($path)) {
        if (rename($path, $uniqueNewPath)) {
            // Armazenar informações do item movido
            $info = [
                'original_path' => $path,
                'trash_path' => $uniqueNewPath
            ];
            $infoData = file_exists($infoFilePath) ? json_decode(file_get_contents($infoFilePath), true) : [];
            $infoData[basename($uniqueNewPath)] = $info;
            file_put_contents($infoFilePath, json_encode($infoData));

            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Erro ao mover a pasta para o lixo']);
        }
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Item não encontrado']);
}
?>
