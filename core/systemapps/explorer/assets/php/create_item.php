<?php
header('Content-Type: application/json');

// Recebe os dados enviados pela requisição POST
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se os dados foram recebidos corretamente
if (!isset($data['type']) || !isset($data['path'])) {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos']);
    exit;
}

// Define o ID do usuário (isso deve vir de uma sessão ou algo semelhante)
// $user_id deve ser definido com base na sessão do usuário
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

// Garante que o caminho está correto e relativo ao diretório base
$fullPath = $baseDir . '/' . $path;

// Função para gerar um caminho único para evitar conflitos
function generateUniquePath($baseDir, $path) {
    $fullPath = $baseDir . '/' . $path;

    // Se o caminho já existir, gera um novo nome com um sufixo numérico
    $counter = 1;
    while (file_exists($fullPath)) {
        $fullPath = $baseDir . '/' . $path. "($counter)";
        $counter++;
    }

    return $fullPath;
}

// Verifica o tipo de item a ser criado e executa a ação correspondente
try {
    if ($type == 'folder') {
        // Cria o diretório se não existir
        $fullPath = generateUniquePath($baseDir, $path);
        if (!mkdir($fullPath, 0777, true)) {
            $error = error_get_last();
            echo json_encode(['success' => false, 'error' => 'Erro ao criar pasta: ' . $error['message']]);
            exit;
        }
    } elseif ($type == 'file') {
        // Cria o arquivo se não existir
        $fullPath = generateUniquePath($baseDir, $path);
        if (file_put_contents($fullPath, '') === false) {
            $error = error_get_last();
            echo json_encode(['success' => false, 'error' => 'Erro ao criar arquivo: ' . $error['message']]);
            exit;
        }
    } else {
        echo json_encode(['success' => false, 'error' => 'Tipo de item inválido']);
        exit;
    }

    // Responde com sucesso e o caminho do item criado
    echo json_encode(['success' => true, 'path' => $path]);

} catch (Exception $e) {
    echo json_encode(['success' => false, 'error' => 'Exceção: ' . $e->getMessage()]);
}
