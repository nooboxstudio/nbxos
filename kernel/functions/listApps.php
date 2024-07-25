<?php
function listUserApps() {
    // Verificar se a sessão está iniciada e o user_id está definido
    if (session_status() == PHP_SESSION_NONE) {
        session_start(); // Iniciar a sessão se ainda não estiver iniciada
    }

    if (isset($_SESSION['user_id'])) {
        $user_id = $_SESSION['user_id']; // Obter o $user_id do usuário logado
    } else {
        return 'Usuário não está logado.'; // Tratar o caso em que o usuário não está logado
    }

    global $db; // Acessar o objeto de conexão com o banco de dados globalmente

    // Query para selecionar os aplicativos do usuário
    $select_apps_query = "
    SELECT * FROM tb_userapps
    WHERE user_id = :user_id
    ";
    
    $stmt = $db->prepare($select_apps_query);
    $stmt->bindParam(':user_id', $user_id, SQLITE3_INTEGER); // Use SQLITE3_INTEGER para o tipo de bind
    $result = $stmt->execute();

    // Verificar se a execução da query foi bem-sucedida
    if ($result) {
        // Início da lista de aplicativos
        $html = '<ul>';
        while ($app = $result->fetchArray(SQLITE3_ASSOC)) {
            $html .= '
            <li>
                <img src="users/' . $user_id . '/apps/' . $app['app_path'] .'/'. $app['app_icon'] . '" alt="' . $app['app_name'] . '" width="16">
                <a href="users/' . $user_id . '/apps/' . $app['app_path'] . '" onclick="openAppWindowFromLink(this); return false;">' . $app['app_name'] . '</a>
            </li>
            ';
            
        }
        $html .= '
        <li>
                <img src="core/systemapps/text-editor/assets/img/icon.png" width="16">
                <a href="core/systemapps/text-editor" onclick="openAppWindowFromLink(this); return false;">Editor de Texto</a>
            </li>
        </ul>';

        return $html; // Retorna a lista de aplicativos como uma string HTML
    } else {
        return 'Erro ao buscar aplicativos do usuário.'; // Tratar o erro de execução da query, se necessário
    }
}
