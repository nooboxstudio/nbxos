<?php
if (isset($_GET['file'])) {
    $filePath = urldecode($_GET['file']);
    
    if (file_exists($filePath)) {
        $content = file_get_contents($filePath);
        echo json_encode(['success' => true, 'content' => $content]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Arquivo não encontrado.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => 'Parâmetro de arquivo ausente.']);
}
