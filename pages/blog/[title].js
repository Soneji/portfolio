import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { marked } from "marked";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import HeadMaker from "../../components/HeadMaker";
import BlogForm from "../../components/BlogForm";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../mui-theme";
import { useStyles } from "../../styles/styles";
import { Container, Grid, Button } from "@mui/material";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Link from "next/link";

const BLOG_DIR = path.join(process.cwd(), "data/blog");

export const getStaticProps = async ({ params }) => {
    const { title } = params;
    const file = path.join(BLOG_DIR, `${title}.md`);
    if (!fs.existsSync(file)) {
        return { notFound: true };
    }
    const { data: fm, content } = matter(fs.readFileSync(file, "utf8"));
    const html = marked.parse(content);
    return {
        props: {
            html,
            newTitle: fm.title || title.replace(/-/gi, " "),
            preview: fm.preview || "",
            url: `/blog/${title}`,
            image: fm.cover || "/box.jpg",
        },
    };
};

export async function getStaticPaths() {
    const files = fs.existsSync(BLOG_DIR)
        ? fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"))
        : [];
    const paths = files.map(f => `/blog/${f.replace(/\.md$/, "")}`);
    return { paths, fallback: false };
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
                                <article
                                    className="blog-article"
                                    dangerouslySetInnerHTML={{ __html: html }}
                                />
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
