<?php
session_start();

$data = json_decode(file_get_contents('php://input'), true);
$pcname = $data['pcname'];
$pass = $data['pass'];

// Caminho para o arquivo pcs.json
$filePath = __DIR__ . '/../../kernel/pcs.json';

if (file_exists($filePath)) {
    $pcs = json_decode(file_get_contents($filePath), true);

    foreach ($pcs as $pc) {
        if ($pc['pcname'] === $pcname && $pc['password'] === $pass) {
            $_SESSION['uuid'] = $pc['uuid'];
            $_SESSION['pcname'] = $pcname;
            echo json_encode(['success' => true]);
            exit();
        }
    }
}

http_response_code(401);
echo json_encode(['success' => false, 'message' => 'Invalid PC name or password']);
?>
