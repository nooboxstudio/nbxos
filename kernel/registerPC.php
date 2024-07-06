<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (!isset($data['user']) || !isset($data['pass']) || !isset($data['pcname']) || !isset($data['uuid'])) {
        http_response_code(400);
        echo json_encode(["message" => "Missing parameters"]);
        exit();
    }

    $user = $data['user'];
    $pass = $data['pass'];
    $pcname = $data['pcname'];
    $uuid = $data['uuid'];

    // Caminho para o arquivo pcs.json
    $filePath = __DIR__ . '/pcs.json';
    if (file_exists($filePath)) {
        $pcs = json_decode(file_get_contents($filePath), true);
    } else {
        $pcs = [];
    }

    // Verifica se o pcname já existe
    foreach ($pcs as $pc) {
        if ($pc['pcname'] === $pcname) {
            http_response_code(400);
            echo json_encode(["message" => "PC name already exists"]);
            exit();
        }
    }

    // Caminho para a pasta pcs um nível acima da pasta kernel
    $pcsDirectory = __DIR__ . '/../pcs';
    if (!is_dir($pcsDirectory)) {
        mkdir($pcsDirectory, 0777, true);
    }

    // Cria a pasta com o UUID como nome dentro da pasta pcs
    $uuidDirectory = $pcsDirectory . DIRECTORY_SEPARATOR . $uuid;
    if (!is_dir($uuidDirectory)) {
        mkdir($uuidDirectory, 0777, true);
    }

    // Adiciona o novo PC ao array
    $pcs[] = [
        'pcname' => $pcname,
        'username' => $user,
        'password' => $pass,
        'uuid' => $uuid
    ];

    // Salva o array atualizado no arquivo pcs.json
    file_put_contents($filePath, json_encode($pcs, JSON_PRETTY_PRINT));

    echo json_encode(["message" => "PC registered successfully", "uuid" => $uuid]);
}
?>
