import { React, useState } from "react";
import TextField from "@material-ui/core/TextField";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import MailIcon from "@material-ui/icons/Mail";

const BlogForm = classes => {
    const [email, setEmail] = useState("");

    function handleSubmit(event) {
        event.preventDefault();
        console.log("Email:", email);

        const encode = data => {
            return Object.keys(data)
                .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
                .join("&");
        };

        fetch("/netlify_forms", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: encode({
                "form-name": "mailinglist",
                email: email,
            }),
        })
            .then(() => (document.querySelector("#onsuccess").style.display = "block"))
            .catch(error => alert(error));
    }

    return (
        <Container style={{ textAlign: "center", paddingBottom: "1em", marginTop: "2em" }}>
            <div
                style={{
                    // marginTop: "1em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <MailIcon color="primary" className={classes.icon} />
                <Typography className={classes.icon} variant="h6" component="h6">
                    Sign up
                </Typography>
            </div>
            <Typography>Recieve emails when I write new blog posts</Typography>
            <form name="mailinglist" data-netlify="true" method="POST" onSubmit={handleSubmit}>
                <div
                    style={{
                        // marginTop: "1em",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <TextField
                        style={{ minWidth: 300, margin: 2 }}
                        label="Email"
                        variant="outlined"
                        type="email"
                        name="email"
                        onChange={e => setEmail(e.target.value)}
                    ></TextField>
                    <Button
                        style={{
                            margin: 2,
                        }}
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Subscribe!
                    </Button>
                </div>
                <p id="onsuccess" style={{ display: "none" }}>
                    Form Submission Received
                </p>
                <noscript>Please enable JavaScript to use this form</noscript>
            </form>
        </Container>
    );
};

export default BlogForm;
