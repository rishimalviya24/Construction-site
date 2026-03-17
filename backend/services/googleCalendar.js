const { google } = require("googleapis");

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_CLIENT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY
      ? process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n")
      : undefined,
  },
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({ version: "v3", auth });
const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

/**
 * Returns all booked events on a given date (YYYY-MM-DD).
 */
async function getBookedSlots(date) {
  const start = new Date(date);
  start.setHours(0, 0, 0, 0);
  const end = new Date(date);
  end.setHours(23, 59, 59, 999);

  const res = await calendar.events.list({
    calendarId: CALENDAR_ID,
    timeMin: start.toISOString(),
    timeMax: end.toISOString(),
    singleEvents: true,
    orderBy: "startTime",
  });

  return (res.data.items || []).map((e) => ({
    start: e.start.dateTime || e.start.date,
    end:   e.end.dateTime   || e.end.date,
  }));
}

/**
 * Creates a new booking event in Google Calendar.
 */
async function createBooking({ service, date, time, duration, name, email, phone, message }) {
  const [h, m] = time.split(":").map(Number);

  const startDT = new Date(date);
  startDT.setHours(h, m, 0, 0);

  const endDT = new Date(startDT);
  endDT.setMinutes(endDT.getMinutes() + (duration || 60));

  const event = {
    summary: `${service} — ${name}`,
    description: [
      `Dienstleistung: ${service}`,
      `Kunde: ${name}`,
      `E-Mail: ${email}`,
      `Telefon: ${phone || "—"}`,
      `Nachricht: ${message || "—"}`,
    ].join("\n"),
    start: { dateTime: startDT.toISOString(), timeZone: "Europe/Zurich" },
    end:   { dateTime: endDT.toISOString(),   timeZone: "Europe/Zurich" },
    attendees: [{ email }],
    reminders: {
      useDefault: false,
      overrides: [
        { method: "email", minutes: 24 * 60 },
        { method: "popup", minutes: 60 },
      ],
    },
  };

  const res = await calendar.events.insert({
    calendarId: CALENDAR_ID,
    resource: event,
    sendUpdates: "all", // sends Google Calendar invite to client email
  });

  return res.data;
}

module.exports = { getBookedSlots, createBooking };
