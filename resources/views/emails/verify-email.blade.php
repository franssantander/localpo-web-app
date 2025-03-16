<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Verification</title>
</head>

<body>
    <h1>Hello, {{ $name }}</h1>
    <p>Thank you for registering. Use the verification code below to verify your email:</p>
    <h2>{{ $verification_code }}</h2>
    <p>If you did not register an account, please ignore this email.</p>
</body>

</html>