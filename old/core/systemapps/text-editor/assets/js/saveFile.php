<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $filePath = $_POST['filePath'];
    $content = $_POST['content'];

    // Sanitiza os dados
    $filePath = filter_var($filePath, FILTER_SANITIZE_STRING);
    $content = filter_var($content, FILTER_UNSAFE_RAW);

    // Salva o conteúdo no arquivo
    if (file_put_contents($filePath, $content) !== false) {
        echo "Arquivo salvo com sucesso.";
    } else {
        echo "Erro ao salvar o arquivo.";
    }
}
