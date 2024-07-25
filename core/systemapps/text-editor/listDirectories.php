<?php
session_start();
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
$user_id = $_SESSION['user_id'];

$directory = '../../../users/'.$user_id;
$dirs = array_filter(glob($directory . '/*'), 'is_dir');

echo json_encode(array_values($dirs));
?>
