<?php
include 'db.php';

$sql = "SELECT message, stars FROM feedbacks ORDER BY created_at DESC LIMIT 20";
$result = $conn->query($sql);

$feedbacks = [];
while ($row = $result->fetch_assoc()) {
    $feedbacks[] = $row;
}
echo json_encode($feedbacks);
$conn->close();
?>
