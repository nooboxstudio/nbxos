<?php
$data = json_decode(file_get_contents('php://input'), true);

if (isset($data['file']) && isset($data['content'])) {
    $filePath = urldecode($data['file']);
    $content = $data['content'];
    
    if (file_put_contents($filePath, $content)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Erro ao salvar o arquivo.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Dados inválidos fornecidos.']);
}
