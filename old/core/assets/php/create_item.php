<?php
header('Content-Type: application/json');

// Recebe os dados enviados pela requisição POST
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados foram recebidos corretamente
if (!isset($data['type']) || !isset($data['path'])) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

// Inicia a sessão e verifica o usuário
session_start();
if (session_status() == PHP_SESSION_NONE) {
    session_start();
}

$user_id = $_SESSION['user_id'];

if (!isset($_SESSION['email'])) {
    header("Location: login");
    exit();
}

// Define o diretório base onde os itens serão criados
$baseDir = __DIR__ . '../../../../../../users/' . $user_id . '/userfiles/';
$type = $data['type'];
$path = $data['path'];

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

// Verifica o tipo de item a ser criado e executa a ação correspondente
try {
    if ($type == 'folder') {
        // Cria o diretório, usando um nome único se necessário
        $uniquePath = generateUniquePath($baseDir, $path);
        if (!mkdir($uniquePath, 0777, true)) {
            $error = error_get_last();
            echo json_encode(['success' => false, 'error' => 'Erro ao criar pasta: ' . $error['message']]);
            exit;
        }
    } elseif ($type == 'file') {
        // Cria o arquivo, usando um nome único se necessário
        $uniquePath = generateUniquePath($baseDir, $path);
        if (file_put_contents($uniquePath, '') === false) {
            $error = error_get_last();
            echo json_encode(['success' => false, 'error' => 'Erro ao criar arquivo: ' . $error['message']]);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Tipo de item inválido']);
        exit;
    }

    // Responde com sucesso e o caminho do item criado
    echo json_encode(['success' => true, 'path' => str_replace($baseDir, '', $uniquePath)]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Exceção: ' . $e->getMessage()]);
}
?>
