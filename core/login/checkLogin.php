<?php
session_start();

if (isset($_SESSION['uuid'])) {
    echo json_encode(['loggedIn' => true, 'pcname' => $_SESSION['pcname']]);
} else {
    echo json_encode(['loggedIn' => false]);
}
?>
