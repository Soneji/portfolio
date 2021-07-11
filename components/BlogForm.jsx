import { React, useState } from "react";
import { Button, Card, CardContent, Typography, TextField } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";

const BlogForm = classes => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Email:", email);

        const encode = data => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        fetch("/api/sendinblue", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                name: name,
                email: email,
            }),
        })
            .then(res => {
                if (res.status !== 200) {
                    res.json().then(function (msg) {
                        alert(msg.error);
                    });
                } else {
                    document.querySelector("#onsuccess").style.display = "block";
                }
            })
            .catch(error => alert(error));
    }

    return (
        <div style={{ marginBottom: "4em" }}>
            <div
                style={{
                    margin: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <MailIcon color="primary" className={classes.icon} />
                <Typography variant="h6" component="h6" className={classes.icon}>
                    {"Sign up"}
                </Typography>
            </div>
            <Card
                style={{
                    margin: "2em",
                    width: "fit-content",
                    maxWidth: "90vw",
                    margin: "auto",
                }}
                className={classes.card}
            >
                <CardContent className={classes.cardContent}>
                    <Typography align="center" variant="subtitle2" style={{ maxWidth: 400 }}>
                        {"Recieve emails when I write new blog posts"}
                    </Typography>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 300,
                                    maxWidth: "80vw",
                                }}
                                name="name"
                                label="Name"
                                variant="outlined"
                                onChange={e => setName(e.target.value)}
                            />
                        </div>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 300,
                                    maxWidth: "80vw",
                                }}
                                name="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                            />
                        </div>
                        <p align="center">
                            <Button type="submit" variant="contained" color="primary">
                                Send
                            </Button>
                        </p>
                        <p style={{ margin: "auto", maxWidth: 300, fontSize: 10 }} align="center">
                            Disclaimer: All data sent to us will be kept confidential. Your data
                            will never be shared with third parties.
                        </p>
                        <p align="center" id="onsuccess" style={{ display: "none" }}>
                            Form Submission Received
                        </p>
                        <noscript>
                            <p align="center">Please enable JavaScript to use this form</p>
                        </noscript>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default BlogForm;
