<?php
$host = "localhost";   // your DB host
$user = "root";        // your DB username
$pass = "";            // your DB password
$dbname = "feedback_system"; // your DB name

$conn = new mysqli($host, $user, $pass, $dbname);
if ($conn->connect_error) {
    die("DB Connection failed: " . $conn->connect_error);
}
?>
