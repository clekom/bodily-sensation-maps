<?php
include_once('db_config.php');
define('DB_HOST', $host);
define('DB_USER', $user);
define('DB_PASS', $pw);
define('DB_NAME', $dbname);

$pdo = new PDO("mysql:host={$host};dbname={$dbname}", $user, $pw);

