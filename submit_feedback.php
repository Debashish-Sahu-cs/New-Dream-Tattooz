<?php
include 'db.php';

$data = json_decode(file_get_contents("php://input"), true);
$message = trim($data['message'] ?? "");
$stars   = intval($data['stars'] ?? 5);

if (!empty($message)) {
    $stmt = $conn->prepare("INSERT INTO feedbacks (message, stars) VALUES (?, ?)");
    $stmt->bind_param("si", $message, $stars);
    $stmt->execute();
    $stmt->close();
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Empty feedback"]);
}

$conn->close();
?>
