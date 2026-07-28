<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$rawBody = file_get_contents('php://input');
$data = json_decode($rawBody ?: '', true);

if (!is_array($data)) {
    http_response_code(400);
    echo json_encode(['message' => 'Invalid request body.']);
    exit;
}

$name = trim((string) ($data['name'] ?? ''));
$email = trim((string) ($data['email'] ?? ''));
$phone = trim((string) ($data['phone'] ?? ''));
$message = trim((string) ($data['message'] ?? ''));

if ($name === '' || $email === '' || $message === '') {
    http_response_code(400);
    echo json_encode(['message' => 'Name, email and message are required.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['message' => 'A valid email is required.']);
    exit;
}

$recipient = 'finance@emkaconsult.bg';
$sender = 'finance@emkaconsult.bg';
$subject = 'New MK Consult contact request';
$safeName = preg_replace('/[\r\n]+/', ' ', $name);
$safeEmail = preg_replace('/[\r\n]+/', '', $email);

$body = implode("\n", [
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : '-'),
    '',
    'Message:',
    $message,
]);

$headers = [
    'From: MK Consult <' . $sender . '>',
    'Reply-To: ' . $safeName . ' <' . $safeEmail . '>',
    'Content-Type: text/plain; charset=UTF-8',
    'X-Mailer: PHP/' . phpversion(),
];

$sent = mail($recipient, $subject, $body, implode("\r\n", $headers));

if (!$sent) {
    http_response_code(502);
    echo json_encode(['message' => 'Message could not be sent.']);
    exit;
}

echo json_encode(['message' => 'Message sent.']);
