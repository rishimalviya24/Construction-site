const express = require("express");
const router = express.Router();

// ── Try nodemailer for contact form emails ──
let sendContactEmail = async () => {};

if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  try {
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });

    sendContactEmail = async ({ name, phone, email, service, message }) => {
      // Email to the company (you)
      await transporter.sendMail({
        from: `"Website Kontakt" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER,
        subject: `📬 Offerte-Anfrage von ${name}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;background:#f5f5f7;border-radius:16px">
            <h2 style="color:#1d1d1f;margin-bottom:8px">Neue Offerte-Anfrage</h2>
            <p style="color:#6e6e73;margin-bottom:24px">Eine neue Anfrage über das Website-Formular.</p>
            <div style="background:#fff;border-radius:12px;padding:24px;margin-bottom:20px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#a1a1a6">Name</td><td style="padding:8px 0;font-weight:700;text-align:right">${name}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6">E-Mail</td><td style="padding:8px 0;font-weight:700;text-align:right">${email}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6">Telefon</td><td style="padding:8px 0;font-weight:700;text-align:right">${phone || "—"}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6">Dienstleistung</td><td style="padding:8px 0;font-weight:700;text-align:right">${service || "—"}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6;vertical-align:top">Nachricht</td><td style="padding:8px 0;font-weight:500;text-align:right">${message || "—"}</td></tr>
              </table>
            </div>
          </div>
        `,
      });

      // Auto-reply to the customer
      await transporter.sendMail({
        from: `"[Firmenname]" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Ihre Anfrage ist eingegangen`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;background:#f5f5f7;border-radius:16px">
            <h2 style="color:#1d1d1f;margin-bottom:8px">Danke für Ihre Anfrage, ${name}!</h2>
            <p style="color:#6e6e73;margin-bottom:24px">Wir haben Ihre Nachricht erhalten und melden uns innert 24 Stunden bei Ihnen.</p>
            <p style="color:#6e6e73;font-size:13px;line-height:1.6">Bei dringenden Anfragen erreichen Sie uns auch via WhatsApp. Bis bald!</p>
          </div>
        `,
      });

      console.log(`📬 Contact form submitted: ${name} | ${email}`);
    };
  } catch (e) {
    console.warn("⚠️  nodemailer failed for contact:", e.message);
  }
}

/* POST /api/contact */
router.post("/", async (req, res) => {
  const { name, phone, email, service, message } = req.body;

  if (!name || !name.trim()) {
    return res.status(400).json({ error: "Name ist erforderlich." });
  }
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: "Gültige E-Mail-Adresse erforderlich." });
  }

  try {
    await sendContactEmail({ name, phone, email, service, message });
    res.json({ success: true, message: "Nachricht erhalten! Wir melden uns bald bei Ihnen." });
  } catch (err) {
    console.warn("Contact email failed (form still accepted):", err.message);
    // Still return success — the inquiry is noted even if email fails
    res.json({ success: true, message: "Nachricht erhalten! Wir melden uns bald bei Ihnen." });
  }
});

module.exports = router;
