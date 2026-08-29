// Blog newsletter signup. Source of truth = a Turso (libSQL) `subscribers` table;
// a best-effort Migadu email notifies Dhaval of each NEW signup. (Replaces the old
// Brevo/Sendinblue integration, whose API key is dead.)
import { createClient } from "@libsql/client/web"; // HTTP-only, no native bindings on Vercel
const nodemailer = require("nodemailer");

const db = createClient({
    // The /web client speaks the HTTP pipeline API and wants an https:// URL; the
    // canonical TURSO_DATABASE_URL is libsql://<host>, same host over HTTPS.
    url: (process.env.TURSO_DATABASE_URL || "").replace(/^libsql:\/\//, "https://"),
    authToken: process.env.TURSO_AUTH_TOKEN,
});

const transport = nodemailer.createTransport({
    host: "smtp.migadu.com",
    port: 465,
    secure: true,
    auth: { user: process.env.MIGADU_USER, pass: process.env.MIGADU_PASS },
});

const esc = s =>
    String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Method not allowed" });
    }

    const { fname, lname, email } = req.body || {};
    if (!fname || !lname || !email) {
        return res.status(400).json({ error: "Missing first name, last name or email" });
    }

    if (!process.env.TURSO_DATABASE_URL || !process.env.TURSO_AUTH_TOKEN) {
        console.error("subscribe: TURSO_DATABASE_URL/TURSO_AUTH_TOKEN not set");
        return res.status(500).json({ error: "Newsletter is not configured" });
    }

    const cleanEmail = String(email).trim().toLowerCase();
    const first = String(fname).trim();
    const last = String(lname).trim();

    // 1) Persist the signup -- this is the source of truth, so a failure here is a real
    //    error the form must see. Idempotent on email (ON CONFLICT DO NOTHING).
    let isNew = false;
    try {
        const result = await db.execute({
            sql: `INSERT INTO subscribers (email, first_name, last_name, source)
                  VALUES (?, ?, ?, 'blog')
                  ON CONFLICT(email) DO NOTHING`,
            args: [cleanEmail, first, last],
        });
        isNew = result.rowsAffected > 0;
    } catch (err) {
        console.error("subscribe: turso insert failed", err?.message || err);
        return res.status(502).json({ error: "Could not save your signup right now" });
    }

    // 2) Notify Dhaval -- best-effort. The signup is already stored, so a mail hiccup
    //    must NOT fail the request or lose the subscriber. Only notify on a new signup.
    if (isNew && process.env.MIGADU_USER && process.env.MIGADU_PASS) {
        try {
            await transport.sendMail({
                from: '"dhavalsoneji.com" <robot@soneji.xyz>',
                to: "dhaval@soneji.xyz",
                replyTo: cleanEmail,
                subject: `New blog subscriber: ${first} ${last}`,
                html: `<b>New newsletter signup on dhavalsoneji.com</b>
        <p><b>Name:</b> ${esc(first)} ${esc(last)}</p>
        <p><b>Email:</b> ${esc(cleanEmail)}</p>`,
            });
        } catch (err) {
            console.error("subscribe: notify email failed (signup still saved)", err?.message || err);
        }
    }

    return res.status(200).json({ message: "OK", new: isNew });
}
