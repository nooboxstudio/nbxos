<?php
session_start();
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
$user_id = $_SESSION['user_id'];
$directory = '../../../users/'.$user_id;
$rii = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($directory));

$files = [];
foreach ($rii as $file) {
    if (!$file->isDir()) {
        $files[] = $file->getPathname();
    }
}

echo json_encode($files);
?>
