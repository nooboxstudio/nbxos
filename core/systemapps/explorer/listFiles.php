<?php
session_start();

$user_id = $_SESSION['user_id'];
$directory = '../../../users/' . $user_id;

// Converte o caminho absoluto para o relativo à base da aplicação
$baseDirectory = realpath('../../../users/' . $user_id);
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory));
$files = [];

foreach ($rii as $file) {
    if (!$file->isDir()) {
        // Obtém o caminho relativo
        $relativePath = str_replace('\\', '/', substr($file->getPathname(), strlen($baseDirectory) + 1));
        $files[] = $relativePath;
    }
}

echo json_encode($files);
?>
