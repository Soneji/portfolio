import * as React from "react";
import Head from "next/head";
import { CacheProvider } from "@emotion/react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import createEmotionCache from "../createEmotionCache";
import theme from "../mui-theme";
import "../styles/globals.scss";

import Router from "next/router";
import NProgress from "nprogress"; // nprogress module
import "../styles/nprogress.scss"; // styles of nprogress

NProgress.configure({ trickleSpeed: 20 });
Router.events.on("routeChangeStart", () => NProgress.start());
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

// Client-side emotion cache, shared for the whole session.
const clientSideEmotionCache = createEmotionCache();

export default function MyApp(props) {
    const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

    return (
        <CacheProvider value={emotionCache}>
            <Head>
                <title>My page</title>
                <meta
                    name="viewport"
                    content="minimum-scale=1, initial-scale=1, width=device-width"
                />
            </Head>
            <ThemeProvider theme={theme}>
                {/* CssBaseline kickstarts an elegant, consistent baseline to build upon. */}
                <CssBaseline />
                <Component {...pageProps} />
            </ThemeProvider>
        </CacheProvider>
    );
}
