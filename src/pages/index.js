import React from "react";

import Header from "../components/header";
import Repos from "../components/repos";
import Contributions from "../components/contributions";
import Footer from "../components/footer";
import Info from "../components/info";
import Shynet from "../components/shynet";

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

                {/* <!-- Primary Meta Tags --> */}
                <meta name="title" content={title} />
                <meta name="description" content={description} />

                {/* <!-- Open Graph / Facebook --> */}
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://dhavalsoneji.com/" />
                <meta property="og:title" content={title} />
                <meta property="og:description" content={description} />
                <meta property="og:image" content="https://dhavalsoneji.com/og_image.jpg" />

                {/* <!-- Twitter --> */}
                <meta property="twitter:card" content="summary_large_image" />
                <meta property="twitter:url" content="https://dhavalsoneji.com/" />
                <meta property="twitter:title" content={title} />
                <meta property="twitter:description" content={description} />
                <meta property="twitter:image" content="https://dhavalsoneji.com/og_image.jpg" />

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
