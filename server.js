// server.js
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// Allow requests from your frontend
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

// -----------------------------
// POST /send-code
// -----------------------------
app.post("/send-code", async (req, res) => {
  const code = Math.floor(1000 + Math.random() * 9000);

  const ADMIN_EMAIL = process.env.ADMIN_EMAIL;
  const ADMIN_EMAIL_PASS = process.env.ADMIN_EMAIL_PASS;

  if (!ADMIN_EMAIL || !ADMIN_EMAIL_PASS) {
    return res.status(500).json({ error: "Email credentials not set in environment" });
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: ADMIN_EMAIL,
      pass: ADMIN_EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: ADMIN_EMAIL,
      to: ADMIN_EMAIL, // send code to yourself
      subject: "Login Code Requested",
      text: `Login code: ${code}`,
    });

    res.status(200).json({ code });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({ error: "Failed to send email" });
  }
});

// -----------------------------
// START SERVER
// -----------------------------
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
