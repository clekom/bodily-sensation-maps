<?php
include('../db/db_connect.php');

$contentType = isset($_SERVER["CONTENT_TYPE"]) ? trim($_SERVER["CONTENT_TYPE"]) : '';

if ($contentType === "application/json") {
    //Receive the Post data.
    $content = trim(file_get_contents("php://input"));
    $decoded = json_decode($content, true);

    $bodyData = $decoded['data'] ['bodyPartData'];
    $uuid = $decoded['data'] ['id'];

    $create_table = "CREATE TABLE IF NOT EXISTS bsm (id VARCHAR(255), bodypart VARCHAR(255), bodyvalue INT)";
    $table_statement = $pdo->exec($create_table);

    //Insert Values to Database
    foreach ($bodyData as $value) {
        $sql = "INSERT INTO bsm (id, bodypart, bodyvalue) VALUES ('{$uuid}','{$value['name']}','{$value['counter']}')";
        $stmt = $pdo->exec($sql);
    }

    //Send Response to resolve promise
    if (is_array($decoded)) {
        $response = $decoded;
        header('Content-Type: application/json');
        echo json_encode($response);

    } else {
        echo('fehler');
    }
}
?>