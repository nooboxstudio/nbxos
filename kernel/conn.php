<?php
// Caminho para o banco de dados SQLite
$db_path = 'nbxos.db';

// Conectar ao banco de dados SQLite
$db = new SQLite3($db_path);

// Criação da tabela tb_users
$create_users_table_query = "
CREATE TABLE IF NOT EXISTS tb_users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    email TEXT NOT NULL,
    password TEXT NOT NULL
)";
$db->exec($create_users_table_query);

// Criação da tabela tb_userapps
$create_user_apps_table_query = "
CREATE TABLE IF NOT EXISTS tb_userapps (
    app_id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    app_name TEXT,
    app_path TEXT,
    app_icon TEXT,
    FOREIGN KEY (user_id) REFERENCES tb_users(user_id)
)";
$db->exec($create_user_apps_table_query);
?>
