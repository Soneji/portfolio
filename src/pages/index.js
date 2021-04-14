import React from "react";

import Header from "../components/header";
import Repos from "../components/repos";
import Contributions from "../components/contributions";
import Footer from "../components/footer";
import Info from "../components/info";
import Shynet from "../components/shynet";
import Cloudflare from "../components/cloudflare_analytics";

import CssBaseline from "@material-ui/core/CssBaseline";

import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core/styles";

import "../styles/index.scss";
import { useStyles } from "../components/styles";
import { Helmet } from "react-helmet";
import useSiteMetadata from "../hooks/use-siteMetadata";

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
    const { title, description } = useSiteMetadata();

    return (
        <React.Fragment>
            <Helmet>
                <html lang="en" />
                <title>{title}</title>
                <meta name="description" content={description} />
                <Cloudflare />
            </Helmet>

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">
                    {Info(classes)}
                    {Repos(classes)}
                    {Contributions(classes)}
                </main>
                {Footer(classes)}
                <Shynet />
            </ThemeProvider>
        </React.Fragment>
    );
}
