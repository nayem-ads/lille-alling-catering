require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(helmet({ contentSecurityPolicy: false })); // CSP off — inline scripts in HTML
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

// ── PostgreSQL ────────────────────────────────────────────────────────────────
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// Create table on startup if it doesn't exist
pool.query(`
  CREATE TABLE IF NOT EXISTS inquiries (
    id SERIAL PRIMARY KEY,
    name TEXT,
    phone TEXT,
    email TEXT,
    event_date TEXT,
    guests TEXT,
    event_type TEXT,
    menus TEXT,
    fulfil TEXT,
    notes TEXT,
    message TEXT,
    source TEXT DEFAULT 'quote_form',
    created_at TIMESTAMPTZ DEFAULT NOW()
  )
`).then(() => console.log('✅ DB table ready'))
  .catch(err => console.error('❌ DB init error:', err.message));

// ── Email transporter ─────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// ── Routes ────────────────────────────────────────────────────────────────────

// Main quote form submission
app.post('/api/quote', async (req, res) => {
  const { name, phone, email, date, guests, eventType, menus, fulfil, notes, message, source } = req.body;

  // Basic validation
  if (!phone && !email) {
    return res.status(400).json({ ok: false, error: 'Phone or email required' });
  }

  try {
    // Save to DB
    await pool.query(
      `INSERT INTO inquiries (name, phone, email, event_date, guests, event_type, menus, fulfil, notes, message, source)
       VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)`,
      [name, phone, email, date, guests, eventType,
       Array.isArray(menus) ? menus.join(', ') : menus,
       fulfil, notes, message, source || 'quote_form']
    );

    // Send notification email
    const recipientEmail = process.env.RECIPIENT_EMAIL || 'post@lilleelling.no';
    const menusList = Array.isArray(menus) ? menus.join(', ') : menus;

    await transporter.sendMail({
      from: `"Lille Ælling Website" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `🦆 New catering inquiry — ${eventType || 'General'} · ${name || 'Anonymous'}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#F4EAD7;border-radius:12px;overflow:hidden">
          <div style="background:#271F18;padding:24px 28px">
            <h2 style="color:#F4EAD7;margin:0;font-size:1.3rem">🦆 New Catering Inquiry</h2>
            <p style="color:#BC6B38;margin:4px 0 0;font-size:.9rem">Received via lilleelling.no</p>
          </div>
          <div style="padding:28px">
            <table style="width:100%;border-collapse:collapse">
              ${row('Name', name)}
              ${row('Phone', phone ? `<a href="tel:${phone}">${phone}</a>` : '—')}
              ${row('Email', email ? `<a href="mailto:${email}">${email}</a>` : '—')}
              ${row('Event type', eventType)}
              ${row('Event date', date)}
              ${row('Guests', guests)}
              ${row('Menus interested in', menusList)}
              ${row('Delivery/Pickup', fulfil)}
              ${row('Allergies / notes', notes)}
              ${row('Message', message)}
              ${row('Source', source || 'quote_form')}
            </table>
            <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(39,31,24,.15)">
              <a href="tel:${phone}" style="display:inline-block;background:#BC6B38;color:#fff;padding:12px 22px;border-radius:100px;text-decoration:none;font-weight:bold">
                Call ${name || 'customer'}
              </a>
            </div>
          </div>
        </div>
      `,
    });

    res.json({ ok: true });
  } catch (err) {
    console.error('Quote submit error:', err.message);
    // Still respond OK to user — don't show backend errors
    res.json({ ok: true, warning: 'saved' });
  }
});

// Survey quick capture
app.post('/api/survey', async (req, res) => {
  const { name, phone, email, occasion, guests, date } = req.body;
  try {
    await pool.query(
      `INSERT INTO inquiries (name, phone, email, event_date, guests, event_type, source)
       VALUES ($1,$2,$3,$4,$5,$6,'survey')`,
      [name, phone, email, date, guests, occasion]
    );

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'post@lilleelling.no';
    await transporter.sendMail({
      from: `"Lille Ælling Website" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
      to: recipientEmail,
      subject: `🦆 Quick lead — ${occasion || 'Event'} · ${name || phone}`,
      html: `
        <div style="font-family:sans-serif;max-width:500px;background:#F4EAD7;border-radius:12px;overflow:hidden">
          <div style="background:#BC6B38;padding:20px 24px">
            <h2 style="color:#fff;margin:0">Quick survey lead</h2>
          </div>
          <div style="padding:24px">
            <table style="width:100%;border-collapse:collapse">
              ${row('Name', name)}
              ${row('Phone', phone ? `<a href="tel:${phone}">${phone}</a>` : '—')}
              ${row('Email', email ? `<a href="mailto:${email}">${email}</a>` : '—')}
              ${row('Occasion', occasion)}
              ${row('Guests', guests)}
              ${row('Date', date)}
            </table>
          </div>
        </div>
      `,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('Survey error:', err.message);
    res.json({ ok: true });
  }
});

// Thank you page
app.get('/thank-you', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'thank-you.html'));
});

// Health check for Railway
app.get('/health', (req, res) => res.json({ status: 'ok', ts: new Date().toISOString() }));

// Catch-all → index
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => console.log(`🦆 Lille Ælling running on port ${PORT}`));

// ── Helper ─────────────────────────────────────────────────────────────────────
function row(label, value) {
  if (!value) return '';
  return `<tr style="border-bottom:1px solid rgba(39,31,24,.1)">
    <td style="padding:10px 0;font-weight:bold;width:160px;color:#6A5C4E;font-size:.88rem">${label}</td>
    <td style="padding:10px 0;color:#271F18">${value}</td>
  </tr>`;
}
