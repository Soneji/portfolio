import React from "react";
import Header from "../../components/header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";

import {
    Box,
    Container,
    Card,
    CardContent,
    Grid,
    Typography,
    Divider,
    Button,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import HeadMaker from "../../components/HeadMaker";

const NotionPageToHtml = require("notion-page-to-html");

export const getServerSideProps = async context => {
    const { id } = context.query;
    const newId = id.split("-(!")[1].split("!)")[0];

    let html = "<div></div>";
    let title = "No Title";
    let preview = "No Preview";
    try {
        const a = await NotionPageToHtml.convert(
            `https://notion.so/${process.env.NOTION_USERNAME}/${newId}`,
            {
                // bodyContentOnly: true,
                excludeCSS: true,
                excludeMetadata: true,
            }
        );
        html = a.html;
        preview = convert(a.html).replaceAll(/[\n]+/gi, "<br>").slice(0, 120) + "...";
        title = a.title;
        image = a.image;
    } catch (e) {
        console.log(e);
        console.log("no html");
    }
    return { props: { html, title, preview, id } };
};

const Post = ({ html, title, preview }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={title + " - Dhaval's Blog"}
                description={preview}
                url={`/blog/${id}`}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">
                    <Container maxWidth="md">
                        <Grid container spacing={3}>
                            <Grid
                                style={{
                                    marginTop: "1em",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexWrap: "wrap",
                                }}
                                item
                                xs={12}
                                sm={12}
                                md={12}
                            >
                                <Link href="/blog" passHref>
                                    <Button
                                        variant="outlined"
                                        color="default"
                                        className={classes.button}
                                        startIcon={<ArrowBackIosIcon />}
                                    >
                                        Back
                                    </Button>
                                </Link>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: html === "<div></div>" ? "-" : html,
                                    }}
                                ></div>
                            </Grid>
                        </Grid>
                    </Container>
                </main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Post;
