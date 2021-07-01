require("dotenv").config();
import { NotionAPI } from "notion-client";
const NotionPageToHtml = require("notion-page-to-html");
const { convert } = require("html-to-text");
const fetch = require("isomorphic-fetch");

const buildUrl = process.env.DEPLOY_URL || `http://localhost:8888`;

const downloadImage = async imageURL => {
    return await fetch(imageURL).then(res => res.buffer());
};
const imageResponse = async imageURL => {
    const image = await downloadImage(imageURL);
    return {
        statusCode: 200,
        headers: {
            "Content-type": "image/jpeg",
            "Content-Length": image.length,
        },
        body: image.toString("base64"),
        isBase64Encoded: true,
    };
};

export async function handler(event, context) {
    // get image URL parameter from request (eg /api/instagramify?i=...)
    const { id } = event.queryStringParameters;

    const api = new NotionAPI();

    const page = await api.getPage(process.env.NOTION_PAGE);
    const collectionId = Object.keys(page.collection)[0];
    const collectionViewId = Object.keys(page.collection_view)[0];

    const collectionData = await api.getCollectionData(collectionId, collectionViewId);
    const recordMap = collectionData.recordMap;
    const blocks = collectionData.result.blockIds;

    for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i];

        console.log(id);
        console.log(item.replace(/-/gi, ""));

        if (item.replace(/-/gi, "") === id) {
            let image =
                recordMap.block[blocks[i]].value.format?.page_cover || `${buildUrl}/box.jpg`;
            if (image.startsWith("/")) {
                image = `https://notion.so${image}`;
            }
            console.log(image);
            return imageResponse(image);
        }
    }

    return {
        statusCode: 400,
        body: "error",
    };
}
