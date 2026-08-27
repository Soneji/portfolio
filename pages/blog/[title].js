import React from "react";
import Header from "../../components/Header";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";

import { Container, Grid, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";
import BlogForm from "../../components/BlogForm";
import HeadMaker from "../../components/HeadMaker";
import InnerHTML from "dangerously-set-html-content";

import { NotionAPI } from "notion-client";
const NotionPageToHtml = require("notion-page-to-html-cover-page-fix");
const { convert } = require("html-to-text");

const errorMessage = `<p align='center'>There was an error :( 
<p align='center'>Please use the back button above to return to the blog</p>`;

export const getStaticProps = async ({ params }) => {
    const { title } = params;
    const url = `/blog/${title}`;

    let html = "<div></div>";
    let preview = "No Preview";
    let newTitle = title.replace(/-/gi, " ");

    let id;
    try {
        const api = new NotionAPI();
        const page = await api.getPage(process.env.NOTION_PAGE);
        const collectionId = Object.keys(page.collection)[0];
        const collectionViewId = Object.keys(page.collection_view)[0];
        const collectionData = await api.getCollectionData(collectionId, collectionViewId);
        const blocks = collectionData.recordMap.block;

        for (var key of Object.keys(blocks)) {
            const item = blocks[key].value;
            // if not page
            if (item?.type !== "page") {
                continue;
            }

            let apititle = item.properties?.title[0][0];
            if (apititle === newTitle) {
                id = item.id.replace(/-/gi, "");
            }
        }
    } catch (e) {
        console.error("blog article: Notion lookup failed:", e?.message || e);
    }

    const image = `api/og_image?id=${id}`;
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
        html = a.html.replace(/prism\.css/gi, "prism-okaidia.css");
        html = html.replace(/prismjs@1\.22\.0/gi, "prismjs@1.27.0");
        preview =
            convert(b.html)
                .replace(/[\n]{2,}/gi, "\n")
                .slice(0, 120) + "...";
        newTitle = a.title;
    } catch (e) {
        console.log(e);
        console.log("no html");
    }
    return { props: { html, newTitle, preview, url, image }, revalidate: 86400 };
};

export async function getStaticPaths() {
    try {
        const api = new NotionAPI();
        const page = await api.getPage(process.env.NOTION_PAGE);
        const collectionId = Object.keys(page.collection)[0];
        const collectionViewId = Object.keys(page.collection_view)[0];
        const collectionData = await api.getCollectionData(collectionId, collectionViewId);
        const blocks = collectionData.recordMap.block;

        let paths = [];
        for (var key of Object.keys(blocks)) {
            const item = blocks[key].value;
            // if not page
            if (item?.type !== "page") {
                continue;
            }

            let title = item.properties?.title[0][0];
            paths.push("/blog/" + title.replace(/\s/gi, "-"));
        }
        return { paths, fallback: true };
    } catch (e) {
        // Notion unreachable at build (e.g. 403): don't fail the build. Pre-render no
        // article pages; they render on-demand once Notion is reachable again.
        console.error("blog paths: Notion fetch failed, no static article pages:", e?.message || e);
        return { paths: [], fallback: "blocking" };
    }
}

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
                                <Button
                                    component={Link}
                                    href="/blog"
                                    variant="outlined"
                                    color="inherit"
                                    startIcon={<ArrowBackIosIcon />}
                                >
                                    Back
                                </Button>
                            </Grid>

                            <Grid item xs={12} sm={12} md={12}>
                                <InnerHTML html={html === "<div></div>" ? errorMessage : html} />
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
