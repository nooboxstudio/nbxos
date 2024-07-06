<?php

// Caminho para o arquivo user.json
$userJsonPath = '../../user.json'; // Ajuste o caminho conforme a estrutura do seu projeto

// Recebe os dados das janelas abertas do JavaScript
$data = json_decode(file_get_contents('php://input'), true);

// Verifica se o user.json existe, senão cria um novo array vazio
if (file_exists($userJsonPath)) {
    $userData = json_decode(file_get_contents($userJsonPath), true);
} else {
    $userData = [];
}

// Atualiza o array de janelas abertas no user.json
$userData['open_windows'] = $data;

// Salva os dados de volta no user.json
file_put_contents($userJsonPath, json_encode($userData));

// Responde com sucesso
echo json_encode(['success' => true]);
