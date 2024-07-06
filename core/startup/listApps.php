<?php
$appsDir = '../../apps/';
$apps = [];

// Verifica e lê os manifest.json de cada pasta de aplicativo
foreach (glob($appsDir . '*', GLOB_ONLYDIR) as $appDir) {
    $manifestFile = $appDir . '/manifest.json';
    if (file_exists($manifestFile)) {
        $manifest = json_decode(file_get_contents($manifestFile), true);
        if ($manifest) {
            $apps[] = $manifest;
        }
    }
}

// Retorna a lista de aplicativos em formato JSON
header('Content-Type: application/json');
echo json_encode($apps);
?>
