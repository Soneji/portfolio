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
    }

    return (
        <Container style={{ textAlign: "center", paddingBottom: "1em" }}>
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
            <form
                data-netlify-recaptcha="true"
                name="mailinglist"
                data-netlify="true"
                onSubmit={handleSubmit}
            >
                <input type="hidden" name="form-name" value="mailinglist" />
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
                        onInput={e => setEmail(e.target.value)}
                    ></TextField>
                    <Button
                        style={{
                            margin: 2,
                        }}
                        variant="contained"
                        color="primary"
                        type="submit"
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
};

export default BlogForm;
