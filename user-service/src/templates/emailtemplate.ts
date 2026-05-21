export const OtpTemplate = (username:string, otp:any) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>OTP Verification</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #4f46e5, #6d28d9);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.6;
      text-align: center;
    }
    .otp {
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 5px;
      margin: 20px 0;
      color: #4f46e5;
    }
    .footer {
      background: #f9fafb;
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1>Verify Your Account 🔐</h1>
    </div>

    <div class="content">
      <h2>Hello ${username},</h2>

      <p>
        Use the OTP below to complete your login:
      </p>

      <div class="otp">${otp}</div>

      <p>
        This OTP is valid for <strong>5 minutes</strong>.
      </p>

      <p>
        If you didn’t request this, you can safely ignore this email.
      </p>

      <p style="margin-top:20px;">
        Regards,<br/>
        <strong>Your Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Your Company. All rights reserved.</p>
      <p>Need help? Contact: info@codeai.com</p>
    </div>

  </div>
</body>
</html>
`;
};

export const AccountVerfiedTemplate = (username:string) => {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Account Verified</title>
  <style>
    body {
      margin: 0;
      padding: 0;
      background-color: #f4f6f8;
      font-family: Arial, sans-serif;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.08);
    }
    .header {
      background: linear-gradient(135deg, #4f46e5, #6d28d9);
      color: #ffffff;
      padding: 30px;
      text-align: center;
    }
    .content {
      padding: 30px;
      color: #333;
      line-height: 1.6;
      text-align: center;
    }
    .otp {
      font-size: 36px;
      font-weight: bold;
      letter-spacing: 5px;
      margin: 20px 0;
      color: #4f46e5;
    }
    .footer {
      background: #f9fafb;
      text-align: center;
      padding: 20px;
      font-size: 12px;
      color: #777;
    }
  </style>
</head>

<body>
  <div class="container">

    <div class="header">
      <h1>Account Verified 🔐</h1>
    </div>

    <div class="content">
      <h2>Hello ${username},</h2>

      <p>
        Your account has been verified successfully.
      </p>

      <p>
        You can now log in to your account.
      </p>

      <p style="margin-top:20px;">
        Regards,<br/>
        <strong>Your Team</strong>
      </p>
    </div>

    <div class="footer">
      <p>© 2026 Your Company. All rights reserved.</p>
      <p>Need help? Contact: info@codeai.com</p>
    </div>

  </div>
</body>
</html>
`;
};


