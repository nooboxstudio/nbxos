<?php
if (isset($_GET['file'])) {
    $filePath = $_GET['file'];
    if (file_exists($filePath)) {
        echo file_get_contents($filePath);
    }
}
?>
