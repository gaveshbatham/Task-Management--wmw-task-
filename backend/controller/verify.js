import Users from "../model/user";
import jwt from "jsonwebtoken";

async function verify(req, res) {
  const { token } = req.params;

  if(!token){
    return
  }
  
  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Update user verification status
    await Users.findOneAndUpdate({ email: decoded.email }, { verified: true });

    // Send success HTML response
    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Email Verified</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  margin: 50px;
              }
              .container {
                  max-width: 500px;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  background: #f4f4f4;
                  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #28a745;
              }
              p {
                  font-size: 18px;
                  color: #333;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>✅ Email Verified Successfully!</h1>
              <p>Your email has been successfully verified. You can now log in to your account.</p>
              <a href="http://localhost:3000/login" style="text-decoration: none; background: #007BFF; color: white; padding: 10px 20px; border-radius: 5px;">Go to Login</a>
          </div>
      </body>
      </html>
    `);

  } catch (err) {
    // Send error HTML response
    res.status(400).send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Verification Failed</title>
          <style>
              body {
                  font-family: Arial, sans-serif;
                  text-align: center;
                  margin: 50px;
              }
              .container {
                  max-width: 500px;
                  margin: auto;
                  padding: 20px;
                  border: 1px solid #ddd;
                  border-radius: 10px;
                  background: #ffe5e5;
                  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
              }
              h1 {
                  color: #dc3545;
              }
              p {
                  font-size: 18px;
                  color: #333;
              }
          </style>
      </head>
      <body>
          <div class="container">
              <h1>❌ Verification Failed!</h1>
              <p>Invalid or expired verification link. Please try again.</p>
              <a href="http://localhost:3000/resend-verification" style="text-decoration: none; background: #FF5733; color: white; padding: 10px 20px; border-radius: 5px;">Resend Verification</a>
          </div>
      </body>
      </html>
    `);
  }
}

export { verify };
