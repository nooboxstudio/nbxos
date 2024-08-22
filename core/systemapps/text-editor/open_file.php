<?php
if (isset($_GET['file'])) {
    $file = $_GET['file'];
    $baseDir = '../../../users/1/userfiles/'; // Ajuste conforme necessário

    $filePath = $baseDir . $file;

    if (file_exists($filePath)) {
        echo file_get_contents($filePath);
    } else {
        echo 'Arquivo não encontrado.';
    }
}
?>
