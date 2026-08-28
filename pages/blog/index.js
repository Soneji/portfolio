import React from "react";
import fs from "fs";
import path from "path";
import matter from "gray-matter";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";
import Header from "../../components/Header";
import Blog from "../../components/Blog";
import BlogForm from "../../components/BlogForm";
import HeadMaker from "../../components/HeadMaker";

export const getStaticProps = async () => {
    const dir = path.join(process.cwd(), "data/blog");
    const files = fs.existsSync(dir) ? fs.readdirSync(dir).filter(f => f.endsWith(".md")) : [];

    const data = files
        .map(f => {
            const { data: fm } = matter(fs.readFileSync(path.join(dir, f), "utf8"));
            const slug = fm.slug || f.replace(/\.md$/, "");
            return {
                title: fm.title || slug.replace(/-/gi, " "),
                emoji: fm.emoji || "📝",
                image: fm.cover || "/box.jpg",
                url: `/blog/${slug}`,
                created: fm.date || null,
                edited: fm.date || null,
                shortform: fm.preview || "",
            };
        })
        .sort((a, b) => new Date(b.created) - new Date(a.created));

    return { props: { data } };
};

export default function BlogPage({ data }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={"Blog - Dhaval Soneji"}
                description={"My Latest Blog Posts!"}
                url={"/blog"}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">
                    {Blog(classes, data)}
                    {BlogForm(classes)}
                </main>

                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
