<?php
header('Content-Type: application/json');

// Recebe os dados enviados pela requisição POST
$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['source']) || !isset($data['destination']) || !isset($data['cut'])) {
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
$sourcePath = realpath($data['source']);
$destinationBasePath = $baseDir . '/' . $data['destination'];
$destinationPath = $destinationBasePath . '/' . basename($sourcePath);

if (!file_exists($sourcePath)) {
    echo json_encode(['success' => false, 'error' => 'Item no clipboard não encontrado.']);
    exit;
}

// Função para gerar um caminho único para evitar conflitos
function generateUniquePath($baseDir, $path) {
    $fileInfo = pathinfo($path);
    $baseName = $fileInfo['filename'];
    $extension = isset($fileInfo['extension']) ? '.' . $fileInfo['extension'] : '';
    $counter = 1;

    $fullPath = $baseDir . '/' . $path;

    while (file_exists($fullPath)) {
        $newBaseName = $baseName . '(' . $counter . ')' . $extension;
        $fullPath = $baseDir . '/' . $fileInfo['dirname'] . '/' . $newBaseName;
        $counter++;
    }

    return $fullPath;
}

// Garante que o diretório de destino exista
if (!is_dir($destinationBasePath)) {
    mkdir($destinationBasePath, 0777, true);
}

$destinationPath = generateUniquePath($destinationBasePath, basename($sourcePath));

try {
    if (is_file($sourcePath)) {
        copy($sourcePath, $destinationPath);
    } elseif (is_dir($sourcePath)) {
        recursiveCopy($sourcePath, $destinationPath);
    }
    if ($data['cut']) {
        // Exclua o item original se for um "corte"
        if (is_file($sourcePath)) {
            unlink($sourcePath);
        } elseif (is_dir($sourcePath)) {
            // Exclua o diretório original se for um "corte"
            rmdir($sourcePath);
        }
    }
    echo json_encode(['success' => true]);
} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => $e->getMessage()]);
}

// Função para copiar diretórios recursivamente
function recursiveCopy($src, $dst) {
    $dir = opendir($src);
    @mkdir($dst);
    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($src . '/' . $file)) {
                recursiveCopy($src . '/' . $file, $dst . '/' . $file);
            } else {
                copy($src . '/' . $file, $dst . '/' . $file);
            }
        }
    }
    closedir($dir);
}
?>
