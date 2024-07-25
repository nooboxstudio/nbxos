<?php
$data = json_decode(file_get_contents('php://input'), true);
$filePath = $data['path'];
$content = $data['content'];

if (!file_exists(dirname($filePath))) {
    mkdir(dirname($filePath), 0777, true);
}

file_put_contents($filePath, $content);
echo 'Arquivo salvo com sucesso';
?>
