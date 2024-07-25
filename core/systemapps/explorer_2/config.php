<?php
session_start();
if (session_status() == PHP_SESSION_NONE) {
  session_start();
}
$user_id = $_SESSION['user_id'];

$config = array (
  'token_secret' => '16KDHN9hnRlfK7bQBkINih3cUS5cXMF3NfywTjVvQNC5F7FHOrl1YZ3jUOpmg86O',
  'projects_path' => 'D:/laragon/www/nbxos/users/'.$user_id,
  'projects_url' => 'http://nbxos.test/users/'.$user_id,
  'dot_folders' => false,
  'file_exts' => '.jpg, .jpeg, .png, .gif, .svg, .html, .css, .js, .json, .md, .txt, .xml, .php, .ico',
  'allow_empty_ext' => true,
  'new_file_ext' => '.txt',
  'upload_limit' => '20MB',
  'recycling' => true,
  'tabbed' => false,
  'password' => false,
);
?>