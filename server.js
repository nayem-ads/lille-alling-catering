require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const nodemailer = require('nodemailer');
const helmet = require('helmet');
const cors = require('cors');
const path = require('path');
const compression = require('compression');

const app = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(compression());
app.use(helmet({ contentSecurityPolicy: false })); // CSP off — inline scripts in HTML
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static assets with aggressive cache control headers for speed
app.use(express.static(path.join(__dirname, 'public'), {
  maxAge: '1d',
  setHeaders: (res, filePath) => {
    if (filePath.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache, no-store, must-revalidate');
    } else if (
      filePath.endsWith('.js') ||
      filePath.endsWith('.css') ||
      filePath.match(/\.(webp|png|jpg|jpeg|gif|ico|svg|mp4)$/) ||
      filePath.match(/\.(woff|woff2|eot|ttf|otf)$/)
    ) {
      res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');
    }
  }
}));

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
    address TEXT,
    event_date TEXT,
    guests TEXT,
    event_type TEXT,
    menus TEXT,
    fulfil TEXT,
    notes TEXT,
    message TEXT,
    source TEXT DEFAULT 'quote_form',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    session_id TEXT,
    partial BOOLEAN DEFAULT FALSE
  )
`).then(async () => {
  console.log('✅ DB table ready');
  try {
    await pool.query(`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS address TEXT;`);
    await pool.query(`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS session_id TEXT;`);
    await pool.query(`ALTER TABLE inquiries ADD COLUMN IF NOT EXISTS partial BOOLEAN DEFAULT FALSE;`);
    console.log('✅ DB columns "session_id" and "partial" verified/added');
  } catch (alterErr) {
    console.error('⚠️ DB alter table warning:', alterErr.message);
  }
})
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

// In-memory object to keep track of partial lead timers
const activeTimeouts = {};

// Helper function to format and send lead notification email
async function sendInquiryEmail(lead, isAbandonedPartial) {
  const recipientEmail = process.env.RECIPIENT_EMAIL || 'post@lilleelling.no, nayem.adsmanager@gmail.com';
  const menusList = lead.menus || '';
  
  const subject = isAbandonedPartial
    ? `⚠️ [ABANDONED LEAD] — Phone: ${lead.phone || '—'} · ${lead.name || 'Anonymous'}`
    : `🦆 New catering inquiry — ${lead.event_type || 'General'} · ${lead.name || 'Anonymous'}`;

  const headerTitle = isAbandonedPartial
    ? `⚠️ Captured Partial Lead (Abandoned)`
    : `🦆 New Catering Inquiry`;
  const headerSubtitle = isAbandonedPartial
    ? `Customer filled info but did not submit`
    : `Received via lilleelling.no`;

  await transporter.sendMail({
    from: `"Lille Ælling Website" <${process.env.SENDER_EMAIL || process.env.SMTP_USER}>`,
    to: recipientEmail,
    subject: subject,
    html: `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto;background:#F4EAD7;border-radius:12px;overflow:hidden">
        <div style="background:#271F18;padding:24px 28px">
          <h2 style="color:#F4EAD7;margin:0;font-size:1.3rem">${headerTitle}</h2>
          <p style="color:#BC6B38;margin:4px 0 0;font-size:.9rem">${headerSubtitle}</p>
        </div>
        <div style="padding:28px">
          <table style="width:100%;border-collapse:collapse">
            ${row('Name', lead.name)}
            ${row('Phone', lead.phone ? `<a href="tel:${lead.phone}">${lead.phone}</a>` : '—')}
            ${row('Email', lead.email ? `<a href="mailto:${lead.email}">${lead.email}</a>` : '—')}
            ${row('Address', lead.address)}
            ${row('Event type', lead.event_type)}
            ${row('Event date', lead.event_date)}
            ${row('Guests', lead.guests)}
            ${row('Menus interested in', menusList)}
            ${row('Delivery/Pickup', lead.fulfil)}
            ${row('Allergies / notes', lead.notes)}
            ${row('Message', lead.message)}
            ${row('Source', lead.source)}
          </table>
          <div style="margin-top:24px;padding-top:18px;border-top:1px solid rgba(39,31,24,.15)">
            <a href="tel:${lead.phone}" style="display:inline-block;background:#BC6B38;color:#fff;padding:12px 22px;border-radius:100px;text-decoration:none;font-weight:bold">
              Call ${lead.name || 'customer'}
            </a>
          </div>
        </div>
      </div>
    `,
  });
}

// ── Routes ────────────────────────────────────────────────────────────────────

// Main quote form submission and smart auto-capture lead abandonment
app.post('/api/quote', async (req, res) => {
  const { name, phone, email, address, date, guests, eventType, menus, fulfil, notes, message, source, sessionId, partial } = req.body;

  // Basic validation
  if (!phone) {
    return res.status(400).json({ ok: false, error: 'Phone required' });
  }

  try {
    let existing = null;
    if (sessionId) {
      const resDb = await pool.query('SELECT id, partial FROM inquiries WHERE session_id = $1 LIMIT 1', [sessionId]);
      if (resDb.rows.length > 0) {
        existing = resDb.rows[0];
      }
    }

    const menusList = Array.isArray(menus) ? menus.join(', ') : (menus || '');

    if (existing) {
      await pool.query(
        `UPDATE inquiries SET name=$1, phone=$2, email=$3, address=$4, event_date=$5, guests=$6, event_type=$7, menus=$8, fulfil=$9, notes=$10, message=$11, source=$12, partial=$13 WHERE id = $14`,
        [name, phone, email, address, date, guests, eventType,
         menusList, fulfil, notes, message, source || 'quote_form', partial || false, existing.id]
      );
    } else {
      await pool.query(
        `INSERT INTO inquiries (name, phone, email, address, event_date, guests, event_type, menus, fulfil, notes, message, source, session_id, partial)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14)`,
        [name, phone, email, address, date, guests, eventType,
         menusList, fulfil, notes, message, source || 'quote_form', sessionId || null, partial || false]
      );
    }

    // Capture timing management
    if (sessionId && activeTimeouts[sessionId]) {
      clearTimeout(activeTimeouts[sessionId]);
      delete activeTimeouts[sessionId];
    }

    if (partial) {
      // Setup timeout for 45 seconds to check abandonment
      activeTimeouts[sessionId] = setTimeout(async () => {
        try {
          const latestRes = await pool.query('SELECT * FROM inquiries WHERE session_id = $1 LIMIT 1', [sessionId]);
          if (latestRes.rows.length > 0) {
            const lead = latestRes.rows[0];
            // Send email only if it is still marked as partial
            if (lead.partial) {
              await sendInquiryEmail(lead, true);
            }
          }
        } catch (emailErr) {
          console.error('Auto-capture email timeout error:', emailErr.message);
        } finally {
          delete activeTimeouts[sessionId];
        }
      }, 45000);
    } else {
      // Final submission: retrieve the full db row or just use the payload
      const latestRes = await pool.query('SELECT * FROM inquiries WHERE session_id = $1 LIMIT 1', [sessionId]);
      const leadData = latestRes.rows.length > 0 ? latestRes.rows[0] : {
        name, phone, email, address, event_date: date, guests, event_type: eventType,
        menus: menusList, fulfil, notes, message, source: source || 'quote_form'
      };
      await sendInquiryEmail(leadData, false);
    }

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

    const recipientEmail = process.env.RECIPIENT_EMAIL || 'post@lilleelling.no, nayem.adsmanager@gmail.com';
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
