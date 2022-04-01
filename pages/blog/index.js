import React from "react";
import Header from "../../components/Header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../../mui-theme";
import Footer from "../../components/Footer";
import Blog from "../../components/Blog";
import BlogForm from "../../components/BlogForm";
import HeadMaker from "../../components/HeadMaker";

import { NotionAPI } from "notion-client";

export const getStaticProps = async () => {
    const api = new NotionAPI();
    const page = await api.getPage(process.env.NOTION_PAGE);
    const collectionId = Object.keys(page.collection)[0];
    const collectionViewId = Object.keys(page.collection_view)[0];
    const collectionData = await api.getCollectionData(collectionId, collectionViewId);
    const blocks = collectionData.recordMap.block;

    let data = [];
    for (var key of Object.keys(blocks)) {
        const item = blocks[key].value;

        // if not page, ignore
        if (item?.type !== "page") {
            continue;
        }

        let title = item.properties?.title[0][0];
        let image = item.format?.page_cover || "/box.jpg";

        if (image.includes("amazonaws.com") && image.includes("secure.notion-static.com")) {
            image =
                "https://www.notion.so/image/" +
                encodeURIComponent(image) +
                "?table=block&cache=v2&id=" +
                item.id;
        }
        let created = item.created_time || 0;
        let edited = item.last_edited_time || 0;
        let shortform = item.properties["EU?>"][0][0].replace(/\n/g, "<br>") || "";

        if (!image.includes("http") && image !== "/box.jpg") {
            image = "https://notion.so" + image;
        }

        data.push({
            title: title,
            image: image,
            url: `/blog/${title.replace(/\s/gi, "-")}`,
            // html: html,
            created: created,
            edited: edited,
            shortform: shortform,
        });
    }

    return { props: { data }, revalidate: 300 };
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
