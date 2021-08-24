import { React, useState } from "react";
import { Button, Card, CardContent, Typography, TextField } from "@material-ui/core";
import MailIcon from "@material-ui/icons/Mail";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const BlogForm = classes => {
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [email, setEmail] = useState("");

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

        fetch("/api/sendinblue", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                fname: fname,
                lname: lname,
                email: email,
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
                <MailIcon color="primary" className={classes.icon} />
                <Typography variant="h6" component="h6" className={classes.icon}>
                    {"Sign up"}
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
                                    width: 300,
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
                                    width: 300,
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

export default BlogForm;
