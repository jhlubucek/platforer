<?php
if (isset($_GET['time']) && isset($_GET['name'])) {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "test";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    // Check connection
    if ($conn->connect_error) {
        echo "DB-err";
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "INSERT INTO score (name, time)
            VALUES ('".$_GET['name']."', ".$_GET['time'].")";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }

    $conn->close();

} else {
    echo "nook";
}
?>