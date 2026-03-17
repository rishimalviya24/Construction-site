const express = require("express");
const router  = express.Router();

// ── Try to load Google Calendar — if creds missing, degrade gracefully ──
let calendarAvailable   = false;
let getBookedSlots      = async () => [];
let createCalendarEvent = async () => ({ id: "demo-" + Date.now() });

if (
  process.env.GOOGLE_CLIENT_EMAIL &&
  process.env.GOOGLE_PRIVATE_KEY &&
  process.env.GOOGLE_CALENDAR_ID
) {
  try {
    const gc = require("../services/googleCalendar");
    getBookedSlots      = gc.getBookedSlots;
    createCalendarEvent = gc.createBooking;
    calendarAvailable   = true;
    console.log("✅ Google Calendar connected");
  } catch (e) {
    console.warn("⚠️  Google Calendar failed to load:", e.message);
  }
} else {
  console.warn("⚠️  Google Calendar env vars missing — running in demo mode");
}

// ── Try nodemailer for confirmation emails ──
let sendConfirmationEmail = async () => {};
if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
  try {
    const nodemailer  = require("nodemailer");
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
    });
    sendConfirmationEmail = async ({ name, email, service, date, time }) => {
      await transporter.sendMail({
        from: `"Buchung [Firmenname]" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: `Buchung bestätigt: ${service} am ${date}`,
        html: `
          <div style="font-family:sans-serif;max-width:520px;margin:auto;padding:32px;background:#f5f5f7;border-radius:16px">
            <h2 style="color:#1d1d1f;margin-bottom:8px">Ihre Buchung ist bestätigt!</h2>
            <p style="color:#6e6e73;margin-bottom:24px">Hallo ${name}, vielen Dank für Ihre Buchung.</p>
            <div style="background:#fff;border-radius:12px;padding:24px;margin-bottom:20px">
              <table style="width:100%;border-collapse:collapse;font-size:14px">
                <tr><td style="padding:8px 0;color:#a1a1a6">Dienstleistung</td><td style="padding:8px 0;font-weight:700;text-align:right">${service}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6">Datum</td><td style="padding:8px 0;font-weight:700;text-align:right">${date}</td></tr>
                <tr style="border-top:1px solid #f0f0f0"><td style="padding:8px 0;color:#a1a1a6">Uhrzeit</td><td style="padding:8px 0;font-weight:700;text-align:right">${time} Uhr</td></tr>
              </table>
            </div>
            <p style="color:#6e6e73;font-size:13px;line-height:1.6">Wir werden uns vor dem Termin nochmals bei Ihnen melden. Bei Fragen kontaktieren Sie uns per WhatsApp. Bis bald!</p>
          </div>
        `,
      });
      console.log("📧 Confirmation email sent to", email);
    };
    console.log("✅ Email configured");
  } catch (e) {
    console.warn("⚠️  nodemailer failed:", e.message);
  }
} else {
  console.warn("⚠️  EMAIL_USER/EMAIL_PASS missing — emails disabled");
}

function generateAllSlots() {
  const slots = [];
  for (let h = 8; h < 18; h++) {
    for (let m = 0; m < 60; m += 30) {
      slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    }
  }
  return slots;
}

/* GET /api/booking/availability */
router.get("/availability", async (req, res) => {
  const { date, duration = 60 } = req.query;

  if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return res.status(400).json({ error: "date required (YYYY-MM-DD)" });
  }

  const allTimes = generateAllSlots();
  const now      = new Date();
  let booked     = [];

  if (calendarAvailable) {
    try {
      booked = await getBookedSlots(date);
    } catch (e) {
      console.warn("Calendar fetch failed:", e.message);
    }
  }

  const slots = allTimes.map((time) => {
    const [sh, sm]  = time.split(":").map(Number);
    const slotStart = new Date(date);
    slotStart.setHours(sh, sm, 0, 0);
    const slotEnd   = new Date(slotStart);
    slotEnd.setMinutes(slotEnd.getMinutes() + Number(duration));

    if (slotStart <= now) return { time, available: false };

    const isBooked = booked.some(({ start, end }) =>
      slotStart < new Date(end) && slotEnd > new Date(start)
    );

    return { time, available: !isBooked };
  });

  res.json({ date, slots, mode: calendarAvailable ? "live" : "demo" });
});

/* POST /api/booking/create */
router.post("/create", async (req, res) => {
  try {
    const { service, serviceDuration, date, time, name, email, phone, message } = req.body;

    if (!service || !date || !time || !name || !email) {
      return res.status(400).json({ error: "Pflichtfelder fehlen" });
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ error: "Ungültige E-Mail-Adresse" });
    }

    let eventId = "booking-" + Date.now();

    if (calendarAvailable) {
      try {
        const ev = await createCalendarEvent({
          service, date, time,
          duration: serviceDuration || 60,
          name, email,
          phone:   phone   || "",
          message: message || "",
        });
        eventId = ev.id;
        console.log("📅 Calendar event created:", eventId);
      } catch (e) {
        console.warn("Calendar create failed (booking still confirmed):", e.message);
      }
    }

    try {
      await sendConfirmationEmail({ name, email, service, date, time });
    } catch (e) {
      console.warn("Email failed (booking still confirmed):", e.message);
    }

    console.log(`✅ Booking confirmed: ${name} | ${service} | ${date} ${time} | ${email}`);

    res.json({
      success:  true,
      eventId,
      message:  "Buchung bestätigt!",
      mode:     calendarAvailable ? "live" : "demo",
    });
  } catch (err) {
    console.error("create error:", err.message);
    res.status(500).json({ error: "Fehler: " + err.message });
  }
});

module.exports = router;
