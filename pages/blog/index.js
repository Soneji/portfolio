import React from "react";
import Header from "../../components/Header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";
import Blog from "../../components/Blog";
import HeadMaker from "../../components/HeadMaker";

import { NotionAPI } from "notion-client";
const NotionPageToHtml = require("notion-page-to-html");
const { convert } = require("html-to-text");

export const getServerSideProps = async () => {
    const api = new NotionAPI();

    const page = await api.getPage(process.env.NOTION_PAGE);

    const collectionId = Object.keys(page.collection)[0];
    const collectionViewId = Object.keys(page.collection_view)[0];

    const collectionData = await api.getCollectionData(collectionId, collectionViewId);
    const recordMap = collectionData.recordMap;
    const blocks = collectionData.result.blockIds;

    let data = [];
    for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i];
        let html = "<div></div>";
        try {
            const a = await NotionPageToHtml.convert(
                `https://notion.so/${process.env.NOTION_USERNAME}/${item.replace(/-/gi, "")}`,
                {
                    bodyContentOnly: true,
                }
            );
            html = convert(a.html).replace(/[\n]+/gi, "<br>").slice(0, 120) + "...";
            // console.log(html);
        } catch {
            console.log("no html");
        }
        let title = recordMap.block[blocks[i]].value.properties?.title[0][0] || "No Title";
        let image = recordMap.block[blocks[i]].value.format?.page_cover || "/box.jpg";
        let created = recordMap.block[blocks[i]].value.created_time || 0;
        let edited = recordMap.block[blocks[i]].value.last_edited_time || 0;

        if (!image.includes("http") && image !== "/box.jpg") {
            image = "https://notion.so" + image;
        }

        data.push({
            title: title,
            image: image,
            url: `/blog/${title}-(!${item.replace(/-/gi, "")}!)`,
            html: html,
            created: created,
            edited: edited,
        });
    }

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
                <main id="main">{Blog(classes, data)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
