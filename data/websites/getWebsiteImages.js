import captureWebsite from "capture-website";
import * as fs from "fs";
import * as https from "https";
import sharp from "sharp";

let rawdata = fs.readFileSync("websites.json");
let websites = JSON.parse(rawdata).websites;

const dir = "../../public/websiteImages";

// remove dir
await fs.promises
    .rm(dir, { recursive: true, force: true })
    .then(() => {
        // console.log("removed");
    })
    .catch(error => {
        console.error(error.message);
    });

// make dir
if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
}

// loop through websites
for (var i = 0; i < websites.length; i++) {
    const website = websites[i];
    if (website.image) {
        await new Promise(resolve =>
            https.get(website.image, response => {
                response
                    .pipe(fs.createWriteStream(`${dir}/${website.key}_big.jpg`))
                    .on("finish", resolve);
            })
        );
    } else {
        await captureWebsite.file(website.url, `${dir}/${website.key}_big.jpg`, {
            isJavaScriptEnabled: true,
            removeElements: [
                "#PopupSignupForm_0",
                "iframe",
                "cloudflare-app",
                ...(website.name.toLowerCase().includes("vanaspati") ? ["header"] : []),
            ],
            beforeScreenshot: async (page, browser) => {
                try {
                    await page.click("alert-dismiss");
                } catch {
                    // console.log("no alert");
                }
            },
            delay: 1,
        });
    }

    console.log(`${dir}/${website.key}_big.jpg`);
    const sharpImage = await sharp(`${dir}/${website.key}_big.jpg`);
    await sharpImage
        .resize({
            fit: sharp.fit.contain,
            width: 800,
        })
        .jpeg({ quality: 80, mozjpeg: true })
        .toFile(`${dir}/${website.key}.jpg`)
        .then(() => {
            // remove big file
            fs.unlinkSync(`${dir}/${website.key}_big.jpg`);
        });
}

console.log("done");
