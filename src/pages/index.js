// import * as React from "react";
import Header from "../components/header";
import Repos from "../components/repos";
import Contributions from "../components/contributions";
import Footer from "../components/footer";
import Info from "../components/info";
import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import "../styles/index.scss";
import { useStyles } from "../components/styles";

const theme = createMuiTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#34928a",
        },
        secondary: {
            main: "#34928a",
        },
    },
});

export default function IndexPage() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">
                    {Info(classes)}
                    {Repos(classes)}
                    {Contributions(classes)}
                </main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
