import React from "react";
import Header from "../../components/Header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";

import {
    Container,
    Grid,
    Button,
} from "@material-ui/core";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import Link from "next/link";
import BlogForm from "../../components/BlogForm";
import HeadMaker from "../../components/HeadMaker";

const NotionPageToHtml = require("notion-page-to-html-cover-page-fix");
const { convert } = require("html-to-text");

const errorMessage = `<p align='center'>There was an error :( 
<p align='center'>Please use the back button above to return to the blog</p>`;

export const getServerSideProps = async context => {
    const { title, id } = context.query;
    const url = `${context.resolvedUrl}`;

    const image = `api/og_image?id=${id}`;

    let html = "<div></div>";
    let preview = "No Preview";
    let newTitle = "No Title";

    try {
        const a = await NotionPageToHtml.convert(
            `https://notion.so/${process.env.NOTION_USERNAME}/${id}`,
            {
                // bodyContentOnly: true,
                excludeCSS: true,
                excludeMetadata: true,
            }
        );
        const b = await NotionPageToHtml.convert(
            `https://notion.so/${process.env.NOTION_USERNAME}/${id}`,
            {
                bodyContentOnly: true,
            }
        );
        html = a.html;
        preview =
            convert(b.html)
                .replace(/[\n]{2,}/gi, "\n")
                .slice(0, 120) + "...";
        newTitle = a.title;

    } catch (e) {
        console.log(e);
        console.log("no html");
    }
    return { props: { html, newTitle, preview, url, image } };
};

const Post = ({ html, newTitle, preview, url, image }) => {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={newTitle + " - Dhaval's Blog"}
                description={preview}
                url={url}
                image={image}
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
                                        __html: html === "<div></div>" ? errorMessage : html,
                                    }}
                                ></div>
                            </Grid>
                        </Grid>
                    </Container>
                    {BlogForm(classes)}
                </main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
};

export default Post;
