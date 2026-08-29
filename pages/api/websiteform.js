const nodemailer = require("nodemailer");

// createTransport does NOT open a connection (only sendMail/verify does), so this is
// safe at module scope. The previous code called transport.verify() at the top level,
// which fired an SMTP handshake on every serverless cold start for no benefit.
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

    const { fname, lname, email, message } = req.body || {};
    if (!fname || !lname || !email || !message) {
        return res.status(400).json({ error: "Missing name, email or message" });
    }

    if (!process.env.MIGADU_USER || !process.env.MIGADU_PASS) {
        console.error("websiteform: MIGADU_USER/MIGADU_PASS not set");
        return res.status(500).json({ error: "Contact form is not configured" });
    }

    try {
        // Await sendMail directly so a delivery failure rejects and surfaces as a
        // non-200. The old send() wrapper swallowed the error (resolve(false)) and the
        // handler returned 200 regardless, so failed submissions looked successful.
        const info = await transport.sendMail({
            from: '"dhavalsoneji.com" <robot@soneji.xyz>',
            to: "dhaval@soneji.xyz",
            replyTo: email,
            subject: "New submission on your 'Do you need a website?' form",
            html: `<b>Hey there!</b> There is a new submission on your 'Do you need a website?' form
        <p><b>First Name:</b> ${esc(fname)}</p>
        <p><b>Last Name:</b> ${esc(lname)}</p>
        <p><b>Email:</b> ${esc(email)}</p>
        <p><b>Message:</b> ${esc(message)}</p>
        <br><br>
        <p>Thanks!</p>`,
        });
        console.log("websiteform: email sent", info?.messageId);
        return res.status(200).json({ message: "OK" });
    } catch (err) {
        console.error("websiteform: sendMail failed", err?.message || err);
        return res.status(502).json({ error: "Could not send your message right now" });
    }
}
