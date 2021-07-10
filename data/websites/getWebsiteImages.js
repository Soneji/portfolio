import captureWebsite from "capture-website";
import * as fs from "fs";
import * as https from "https";

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
websites.forEach(async website => {
    if (website.image) {
        const file = fs.createWriteStream(`${dir}/${website.name}.jpg`);
        const request = https.get(website.image, function (response) {
            response.pipe(file);
        });
    } else {
        await captureWebsite.file(website.url, `${dir}/${website.name}.jpg`, {
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
            delay: 2,
        });
    }
    // console.log(website);
});
