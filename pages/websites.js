import React from "react";
import Header from "../components/Header";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Websites from "../components/Websites";
import HeadMaker from "../components/HeadMaker";

export default function WebsitesPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={"Websites I've Built - Dhaval Soneji"}
                description={"A showcase of the websites I've built"}
                url={"/websites"}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">{Websites(classes)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
