import Contact from "../models/Contact.js";
import fetch from "node-fetch";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export const submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, website, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "Required fields missing." });
    }

    const contact = new Contact({ name, email, phone, website, message });
    await contact.save();

    // Send to Telegram
    const telegramMessage = `
📬 *New Contact Form Submission*
👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone || 'N/A'}
🌐 *Website:* ${website || 'N/A'}
📝 *Message:* ${message}
    `;

    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: telegramMessage,
        parse_mode: "Markdown",
      }),
    });

    res.status(201).json({ message: "Contact form submitted and sent to Telegram!" });
  } catch (error) {
    console.error("Submit error:", error);
    res.status(500).json({ error: "Server error. Try again later." });
  }
};
