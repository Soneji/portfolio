import React from "react";
import Typography from "@mui/material/Typography";
import Contact from "./Contact";

const Footer = classes => {
    function Copyright() {
        return (
            <Typography
                style={{ textAlign: "center" }}
                gutterBottom
                variant="body2"
                color="textSecondary"
            >
                Copyright © Dhaval Soneji
                <span> </span>
                {new Date().getFullYear()}
            </Typography>
        );
    }

    return (
        <div style={{ display: "grid" }}>
            <div className={classes.footerBackgroundDiv}>
                <footer className={classes.footer}>
                    <Contact />
                    <Copyright />
                </footer>
            </div>
        </div>
    );
};
export default Footer;
