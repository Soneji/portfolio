import React from "react";

import { Button, Card, CardContent, Typography, TextField } from "@material-ui/core";

import BuildIcon from "@material-ui/icons/Build";

export default function WebsitesForm(props) {
    return (
        <div style={{ marginTop: "4em" }}>
            <div
                style={{
                    margin: "2em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                }}
            >
                <BuildIcon color="primary" className={props.classes.icon} />
                <Typography variant="h6" component="h6" className={props.classes.icon}>
                    {"Do you need a website?"}
                </Typography>
            </div>
            <Card
                style={{
                    margin: "2em",
                    width: "fit-content",
                    maxWidth: "90vw",
                    margin: "auto",
                }}
                className={props.classes.card}
            >
                <CardContent className={props.classes.cardContent}>
                    <Typography align="center" variant="subtitle2" style={{ maxWidth: 450 }}>
                        {
                            "Fill in this form telling me a little about yourself and your website needs and I'll be in touch to see what I can do for you"
                        }
                    </Typography>
                    <form
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        name="websites-contact"
                        method="POST"
                        data-netlify="true"
                        netlify-honeypot="bot-field"
                    >
                        <input type="hidden" name="form-name" value="websites-contact" />
                        <p hidden>
                            <label>
                                Don’t fill this out: <input name="bot-field" />
                            </label>
                        </p>
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
                                name="name"
                                label="Name"
                                variant="outlined"
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
                            />
                        </div>
                        <p>
                            <Button type="submit" variant="contained" color="primary">
                                Send
                            </Button>
                        </p>
                        <p style={{ margin: "auto", maxWidth: 300, fontSize: 10 }} align="center">
                            Disclaimer: All data sent to us will be kept confidential. Your data
                            will never be shared with third parties.
                        </p>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
}
