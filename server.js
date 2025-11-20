

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

app.post("/send-code", async (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const msg = {
    to: "yusuffwaris8@gmail.com",           // recipient
    from: "your_verified_sendgrid_email@example.com",  // must match verified sender
    subject: "Login Code Requested",
    text: `Login code: ${code}`,
  };

  try {
    await sgMail.send(msg);
    res.json({ code });
  } catch (err) {
    console.error("SendGrid Error:", err);
    res.status(500).json({ error: "Failed to send email", details: err.message });
  }
});

