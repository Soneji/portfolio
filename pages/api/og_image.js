import { NotionAPI } from "notion-client";
const fetch = require("isomorphic-fetch");

const buildUrl = process.env.URL || `http://localhost:3000`;

const downloadImage = async url => {
    return await fetch(url).then(res => res.buffer());
};

export default async function handler(req, res) {
    // get image URL parameter from request (eg /api/instagramify?i=...)
    const { id } = req.query;

    const api = new NotionAPI();

    const page = await api.getPage(process.env.NOTION_PAGE);
    const collectionId = Object.keys(page.collection)[0];
    const collectionViewId = Object.keys(page.collection_view)[0];

    const collectionData = await api.getCollectionData(collectionId, collectionViewId);
    const recordMap = collectionData.recordMap;
    const blocks = collectionData.result.blockIds;

    for (let i = 0; i < blocks.length; i++) {
        const item = blocks[i];

        if (item.replace(/-/gi, "") === id) {
            let url = recordMap.block[blocks[i]].value.format?.page_cover || `${buildUrl}/box.jpg`;
            if (url.startsWith("/")) {
                url = `https://notion.so${url}`;
            }

            const image = await downloadImage(url);
            res.setHeader("Content-Type", "image/jpg");
            res.send(image);
            return;
        }
    }
    res.status(500).send("There was an error");
}
