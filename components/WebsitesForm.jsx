import { React, useState } from "react";
import { Button, Card, CardContent, Typography, TextField } from "@material-ui/core";
import BuildIcon from "@material-ui/icons/Build";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const WebsitesForm = classes => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");

    const [open, setOpen] = useState(false);
    const [openFail, setOpenFail] = useState(false);

    const handleClick = which => {
        if (which === "success") {
            setOpen(true);
        } else if (which === "fail") {
            setOpenFail(true);
        }
    };

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpen(false);
    };
    const handleCloseFail = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }

        setOpenFail(false);
    };

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Email:", email);

        const encode = data => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        fetch("/api/websiteform", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                fname: fname,
                lname: lname,
                email: email,
                message: message,
            }),
        })
            .then(res => {
                if (res.status !== 200) {
                    handleClick("fail");
                } else {
                    handleClick("success");
                }
            })
            .catch(error => {
                console.log(error);
                handleClick("fail");
            });
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
                <BuildIcon color="primary" className={classes.icon} />
                <Typography variant="h6" component="h6" className={classes.icon}>
                    {"Do you need a website?"}
                </Typography>
            </div>
            <Card
                style={{
                    margin: "2em",
                    // width: "-moz-fit-content", // the build tool removes this for some reason
                    width: "fit-content",
                    maxWidth: "90vw",
                    margin: "auto",
                }}
                className={classes.card}
            >
                <CardContent
                    style={{
                        margin: "auto",
                    }}
                    className={classes.cardContent}
                >
                    <Typography
                        align="center"
                        variant="subtitle2"
                        style={{ maxWidth: 400, margin: "auto" }}
                    >
                        {
                            "Fill in this form telling me a little about yourself and your website needs and I'll be in touch to see what I can do for you"
                        }
                    </Typography>
                    <form method="POST" onSubmit={handleSubmit}>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 400,
                                    maxWidth: "80vw",
                                }}
                                name="fname"
                                label="First Name"
                                variant="outlined"
                                onChange={e => setFname(e.target.value)}
                                required
                            />
                        </div>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 400,
                                    maxWidth: "80vw",
                                }}
                                name="lname"
                                label="Last Name"
                                variant="outlined"
                                onChange={e => setLname(e.target.value)}
                                required
                            />
                        </div>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 400,
                                    maxWidth: "80vw",
                                }}
                                name="email"
                                label="Email"
                                variant="outlined"
                                type="email"
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div
                            style={{
                                margin: "1em",
                            }}
                        >
                            <TextField
                                style={{
                                    width: 400,
                                    maxWidth: "80vw",
                                }}
                                name="message"
                                label="Message"
                                variant="outlined"
                                multiline
                                rows={4}
                                onChange={e => setMessage(e.target.value)}
                                required
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
                        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                            <Alert onClose={handleClose} severity="success">
                                Form Submission Received
                            </Alert>
                        </Snackbar>
                        <Snackbar open={openFail} autoHideDuration={6000} onClose={handleCloseFail}>
                            <Alert onClose={handleCloseFail} severity="error">
                                There was an error, please report it to the email at the bottom of
                                the page
                            </Alert>
                        </Snackbar>
                        <noscript>
                            <p align="center">Please enable JavaScript to use this form</p>
                        </noscript>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default WebsitesForm;
