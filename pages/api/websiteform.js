const nodemailer = require("nodemailer");

var transport = nodemailer.createTransport({
    host: "smtp.migadu.com",
    port: 465,
    auth: {
        user: process.env.MIGADU_USER,
        pass: process.env.MIGADU_PASS,
    },
});

transport.verify(function (error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

const send = async (fname, lname, email, message) => {
    const mailOptions = {
        from: '"dhavalsoneji.com" <robot@soneji.xyz>',
        to: "dhaval@soneji.xyz",
        subject: "New submission on your 'Do you need a website?' form",
        // text: "New submission on 'Do you need a website?' form",
        html: `<b>Hey there! </b>There is a new submission on your 'Do you need a website?' form
        <p><b>First Name:</b> ${fname}</p>
        <p><b>Last Name:</b> ${lname}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b> ${message}</p>
        <br><br>
        <p>Thanks!</p>`,
    };
    return new Promise((resolve, _reject) => {
        transport.sendMail(mailOptions, function (error, info) {
            if (error) {
                console.log("error is " + error);
                resolve(false);
            } else {
                console.log("Email sent: " + info.response);
                resolve(true);
            }
        });
    });
};

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Process a POST request
        console.log(req.body);

        const { fname, lname, email, message } = req.body;
        if (!fname || !lname || !email || !message) {
            res.status(405).json({ error: "Missing Full Name, Email, or Message" });
            res.end();
        } else {
            try {
                await send(fname, lname, email, message);
                res.status(200).json({ message: "OK" });
            } catch (err) {
                console.log(err);
                res.status(405).json({ error: err });
            }
        }
    } else {
        res.status(405).json({ message: "Error: POST man" });
    }
}
