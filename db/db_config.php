<?php
switch ($_SERVER['SERVER_NAME']) {
    case 'localhost':
        $dbname = "lokaler_datenbankname";
        $host = "localhost";
        $user = "lokaler_username";
        $pw = "lokales password";
        break;

    case 'server host name or ip':
        $dbname = "database name on server";
        $host = "host name or ip adress";
        $user = "user name for remote database";
        $pw = "password for remote user";
        break;
}
?>