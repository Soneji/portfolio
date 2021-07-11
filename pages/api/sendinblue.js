const fetch = require("isomorphic-fetch");

export default async function handler(req, res) {
    if (req.method === "POST") {
        // Process a POST request
        console.log(req.body);

        const { fname, lname, email } = req.body;
        if (!fname || !lname || !email) {
            res.status(405).json({ error: "Missing Full Name or Email" });
            res.end();
        } else {
            // Send data
            const url = "https://api.sendinblue.com/v3/contacts";
            const options = {
                method: "POST",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    "api-key": process.env.SENDINBLUE_API_KEY,
                },
                body: JSON.stringify({
                    email: email,
                    attributes: { FIRSTNAME: fname, LASTNAME: lname },
                    listIds: [5],
                    updateEnabled: true,
                }),
            };

            console.log(JSON.stringify(options));
            console.log(process.env.SENDINBLUE_API_KEY);

            try {
                await fetch(url, options);
                res.status(200).json({ message: "OK" });
            } catch (err) {
                res.status(405).json({ error: err });
            }
        }
    } else {
        res.status(405).json({ message: "Error: POST man" });
    }
}
