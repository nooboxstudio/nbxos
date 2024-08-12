<?php
if (isset($_POST['file']) && isset($_POST['content']) && isset($_POST['folder'])) {
    $file = $_POST['file'];
    $content = $_POST['content'];
    $folder = $_POST['folder'];

    $baseDir = '../../../users/1/userfiles/'; // Ajuste conforme necessário
    $folderPath = $baseDir . $folder;

    if (!is_dir($folderPath)) {
        echo 'Pasta não encontrada.';
        exit;
    }

    $filePath = $folderPath . '/' . $file;

    file_put_contents($filePath, $content);
    echo 'Arquivo salvo com sucesso.';
}
?>
