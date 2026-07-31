<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['message' => 'Method not allowed.']);
    exit;
}

$config = [];
$configPath = __DIR__ . '/contact-config.php';
if (is_file($configPath)) {
    $loadedConfig = require $configPath;
    if (is_array($loadedConfig)) {
        $config = $loadedConfig;
    }
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

$recipient = configValue($config, 'recipient', 'CONTACT_RECIPIENT', 'finance@emkaconsult.bg');
$sender = configValue($config, 'sender', 'CONTACT_SENDER', 'finance@emkaconsult.bg');
$fromName = configValue($config, 'from_name', 'CONTACT_FROM_NAME', 'MK Consult');
$smtpHost = configValue($config, 'smtp_host', 'SMTP_HOST', '');
$smtpPort = (int) configValue($config, 'smtp_port', 'SMTP_PORT', '25');
$smtpUsername = configValue($config, 'smtp_username', 'SMTP_USERNAME', $sender);
$smtpPassword = configValue($config, 'smtp_password', 'SMTP_PASSWORD', '');
$smtpSecure = strtolower(configValue($config, 'smtp_secure', 'SMTP_SECURE', 'none'));

$safeName = sanitizeHeaderValue($name);
$safeEmail = sanitizeHeaderValue($email);
$subject = 'New MK Consult contact request';

$body = implode("\r\n", [
    'Name: ' . $name,
    'Email: ' . $email,
    'Phone: ' . ($phone !== '' ? $phone : '-'),
    '',
    'Message:',
    $message,
]);

try {
    if ($smtpHost !== '' && $smtpPassword !== '') {
        sendSmtpMail(
            $smtpHost,
            $smtpPort,
            $smtpSecure,
            $smtpUsername,
            $smtpPassword,
            $sender,
            $recipient,
            $subject,
            $body,
            $fromName,
            $safeName,
            $safeEmail
        );
    } else {
        sendPhpMail($sender, $recipient, $subject, $body, $fromName, $safeName, $safeEmail);
    }
} catch (Throwable $exception) {
    http_response_code(502);
    echo json_encode(['message' => 'Message could not be sent.']);
    exit;
}

echo json_encode(['message' => 'Message sent.']);

function configValue(array $config, string $key, string $envKey, string $default): string
{
    if (array_key_exists($key, $config) && trim((string) $config[$key]) !== '') {
        return trim((string) $config[$key]);
    }

    $envValue = getenv($envKey);
    if ($envValue !== false && trim($envValue) !== '') {
        return trim($envValue);
    }

    return $default;
}

function sanitizeHeaderValue(string $value): string
{
    return trim(preg_replace('/[\r\n]+/', ' ', $value) ?? '');
}

function sendPhpMail(
    string $sender,
    string $recipient,
    string $subject,
    string $body,
    string $fromName,
    string $replyName,
    string $replyEmail
): void {
    $headers = [
        'From: ' . encodeDisplayName($fromName) . ' <' . $sender . '>',
        'Reply-To: ' . encodeDisplayName($replyName) . ' <' . $replyEmail . '>',
        'Content-Type: text/plain; charset=UTF-8',
        'X-Mailer: PHP/' . phpversion(),
    ];

    if (!mail($recipient, $subject, $body, implode("\r\n", $headers))) {
        throw new RuntimeException('mail() failed.');
    }
}

function sendSmtpMail(
    string $host,
    int $port,
    string $secure,
    string $username,
    string $password,
    string $sender,
    string $recipient,
    string $subject,
    string $body,
    string $fromName,
    string $replyName,
    string $replyEmail
): void {
    $remote = $secure === 'ssl' ? 'ssl://' . $host : $host;
    $socket = fsockopen($remote, $port, $errno, $errstr, 20);
    if (!$socket) {
        throw new RuntimeException('SMTP connection failed.');
    }

    stream_set_timeout($socket, 20);

    try {
        smtpRead($socket, [220]);
        smtpCommand($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);

        if ($secure === 'tls') {
            smtpCommand($socket, 'STARTTLS', [220]);
            if (!stream_socket_enable_crypto($socket, true, STREAM_CRYPTO_METHOD_TLS_CLIENT)) {
                throw new RuntimeException('SMTP TLS failed.');
            }
            smtpCommand($socket, 'EHLO ' . ($_SERVER['SERVER_NAME'] ?? 'localhost'), [250]);
        }

        smtpCommand($socket, 'AUTH LOGIN', [334]);
        smtpCommand($socket, base64_encode($username), [334]);
        smtpCommand($socket, base64_encode($password), [235]);
        smtpCommand($socket, 'MAIL FROM:<' . $sender . '>', [250]);
        smtpCommand($socket, 'RCPT TO:<' . $recipient . '>', [250, 251]);
        smtpCommand($socket, 'DATA', [354]);

        fwrite($socket, buildEmailMessage($sender, $recipient, $subject, $body, $fromName, $replyName, $replyEmail) . "\r\n.\r\n");
        smtpRead($socket, [250]);
        smtpCommand($socket, 'QUIT', [221]);
    } finally {
        fclose($socket);
    }
}

function smtpCommand($socket, string $command, array $expectedCodes): string
{
    fwrite($socket, $command . "\r\n");
    return smtpRead($socket, $expectedCodes);
}

function smtpRead($socket, array $expectedCodes): string
{
    $response = '';
    while (($line = fgets($socket, 515)) !== false) {
        $response .= $line;
        if (strlen($line) >= 4 && $line[3] === ' ') {
            break;
        }
    }

    $code = (int) substr($response, 0, 3);
    if (!in_array($code, $expectedCodes, true)) {
        throw new RuntimeException('Unexpected SMTP response: ' . trim($response));
    }

    return $response;
}

function buildEmailMessage(
    string $sender,
    string $recipient,
    string $subject,
    string $body,
    string $fromName,
    string $replyName,
    string $replyEmail
): string {
    $headers = [
        'From: ' . encodeDisplayName($fromName) . ' <' . $sender . '>',
        'To: <' . $recipient . '>',
        'Reply-To: ' . encodeDisplayName($replyName) . ' <' . $replyEmail . '>',
        'Subject: ' . encodeHeader($subject),
        'MIME-Version: 1.0',
        'Content-Type: text/plain; charset=UTF-8',
        'Content-Transfer-Encoding: 8bit',
    ];

    return implode("\r\n", $headers) . "\r\n\r\n" . dotStuff($body);
}

function encodeDisplayName(string $value): string
{
    return encodeHeader(sanitizeHeaderValue($value));
}

function encodeHeader(string $value): string
{
    return '=?UTF-8?B?' . base64_encode($value) . '?=';
}

function dotStuff(string $body): string
{
    $lines = preg_split('/\r\n|\r|\n/', $body) ?: [];
    $lines = array_map(static function (string $line): string {
        return str_starts_with($line, '.') ? '.' . $line : $line;
    }, $lines);

    return implode("\r\n", $lines);
}
