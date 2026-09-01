import React from "react";
import fs from "fs";
import path from "path";
import { marked } from "marked";
import Header from "../components/Header";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Info from "../components/Info";
import HeadMaker from "../components/HeadMaker";

export const getStaticProps = async () => {
    const aboutPath = path.join(process.cwd(), "data/about.md");
    const about = fs.existsSync(aboutPath)
        ? marked.parse(fs.readFileSync(aboutPath, "utf8"))
        : "";
    return { props: { about } };
};

export default function Home({ about }) {
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
                <main id="main">{Info(classes, about)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
