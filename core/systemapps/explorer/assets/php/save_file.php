<?php
if (isset($_POST['file']) && isset($_POST['content'])) {
    $filePath = urldecode($_POST['file']);
    $content = $_POST['content'];

    // Tenta salvar o conteúdo no arquivo
    if (file_put_contents($filePath, $content) !== false) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode([
            'success' => false,
            'error' => 'Erro ao salvar o arquivo.'
        ]);
    }
} else {
    echo json_encode([
        'success' => false,
        'error' => 'Parâmetros inválidos.'
    ]);
}
?>
