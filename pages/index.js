import React from "react";
import Image from "next/image";
import Header from "../components/header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Info from "../components/Info";
import HeadMaker from "../components/HeadMaker";

export default function Home() {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title="Dhaval Soneji"
                description={"Dhaval Soneji - Software and Electronic Engineer"}
                url={"/"}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">{Info(classes)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
