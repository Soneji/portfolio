#!/usr/bin/env node
/**
 * Generate a per-post Open Graph / cover image for every markdown blog post.
 *
 * For each data/blog/<slug>.md it renders the post's frontmatter (emoji, title,
 * preview, date) into a 1200x630 card matching the site's dark + cyan Roboto
 * aesthetic, and writes public/blog/<slug>/cover.jpg. These images are used both
 * as the blog card thumbnail and as the og:image/twitter:image social preview
 * (kept as JPEG < 300 KB so WhatsApp's crawler renders them).
 *
 * Re-run after adding or editing a post:  node scripts/gen-blog-og.mjs
 *
 * Rendering uses a headless Chromium via Playwright (falls back through a few
 * known module/executable locations); it is a local authoring tool, not part of
 * the Next.js build.
 */
import { createRequire } from "module";
import { fileURLToPath } from "url";
import fs from "fs";
import path from "path";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const BLOG_DIR = path.join(REPO, "data/blog");
const PUBLIC = path.join(REPO, "public");

const req = createRequire(path.join(REPO, "package.json"));
const matter = req("gray-matter");

// ---- resolve a Playwright chromium -----------------------------------------
function resolveChromium() {
    const env = process.env.PLAYWRIGHT_CHROMIUM || process.env.PUPPETEER_EXECUTABLE_PATH;
    if (env && fs.existsSync(env)) return env;
    const base = path.join(process.env.HOME || "", ".cache/ms-playwright");
    if (fs.existsSync(base)) {
        const hit = fs
            .readdirSync(base)
            .filter(d => d.startsWith("chromium-"))
            .sort()
            .reverse()
            .map(d => path.join(base, d, "chrome-linux64/chrome"))
            .concat(
                fs
                    .readdirSync(base)
                    .filter(d => d.startsWith("chromium-"))
                    .sort()
                    .reverse()
                    .map(d => path.join(base, d, "chrome-linux/chrome"))
            )
            .find(p => fs.existsSync(p));
        if (hit) return hit;
    }
    return undefined; // let Playwright find its own
}

function loadPlaywright() {
    const candidates = [
        REPO,
        path.join(process.env.HOME || "", ".aim/mcp-servers/3P/lib/node_modules/@playwright/mcp"),
    ];
    for (const base of candidates) {
        try {
            const r = createRequire(path.join(base, "package.json"));
            return r("playwright");
        } catch {
            /* try next */
        }
    }
    throw new Error("Could not resolve the 'playwright' module in any known location.");
}

// ---- helpers ----------------------------------------------------------------
const esc = s =>
    String(s ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");

function fmtDate(d) {
    if (!d) return "";
    const dt = new Date(d);
    if (isNaN(dt)) return String(d);
    const m = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    return `${dt.getUTCDate()} ${m[dt.getUTCMonth()]} ${dt.getUTCFullYear()}`;
}

// The previews recovered from archive.org were hard-cut at a character limit and
// often end mid-word (e.g. "...for removing ow"). For the card, drop that trailing
// partial word and finish with an ellipsis. Frontmatter is left untouched.
function tidyPreview(s) {
    let t = String(s ?? "").trim();
    if (!t) return "";
    if (!/[.!?]$/.test(t)) {
        t = t.replace(/\s+\S*$/, "").replace(/[\s,;:]+$/, "");
        if (!/[.!?…]$/.test(t)) t += "…";
    }
    return t;
}

function dataUri(file, mime) {
    return `data:${mime};base64,${fs.readFileSync(file).toString("base64")}`;
}

async function fetchAvatar() {
    try {
        const res = await fetch("https://github.com/soneji.png");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = Buffer.from(await res.arrayBuffer());
        return `data:image/png;base64,${buf.toString("base64")}`;
    } catch (e) {
        console.warn("avatar fetch failed, using monogram fallback:", e.message);
        return null;
    }
}

function html({ emoji, title, preview, date, bg, avatar }) {
    const avatarHtml = avatar
        ? `<img class="avatar" src="${avatar}" alt="" />`
        : `<div class="avatar-fallback">DS</div>`;
    return `<!doctype html><html><head><meta charset="utf-8">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap" rel="stylesheet">
<style>
 *{margin:0;padding:0;box-sizing:border-box}
 html,body{width:1200px;height:630px}
 .card{position:relative;width:1200px;height:630px;overflow:hidden;color:#fff;
   font-family:'Roboto','Noto Sans',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
 .bg{position:absolute;inset:0;background-image:url('${bg}');background-size:cover;background-position:center}
 .overlay{position:absolute;inset:0;background:
   radial-gradient(1200px 620px at 88% -12%, rgba(38,198,218,0.32), rgba(38,198,218,0) 60%),
   linear-gradient(118deg, rgba(4,13,17,0.95) 0%, rgba(6,20,26,0.88) 46%, rgba(4,12,16,0.82) 100%)}
 .accent{position:absolute;top:0;left:0;right:0;height:8px;background:linear-gradient(90deg,#26c6da,#00acc1)}
 .content{position:absolute;inset:0;padding:68px 80px;display:flex;flex-direction:column;justify-content:space-between}
 .top{display:flex;align-items:center;justify-content:space-between}
 .kicker{font-size:22px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:#4dd0e1}
 .date{font-size:22px;font-weight:500;letter-spacing:1px;color:rgba(255,255,255,0.62)}
 .emoji{font-size:88px;line-height:1;margin-bottom:20px;
   font-family:'Noto Color Emoji','Roboto',sans-serif}
 .title{font-size:58px;font-weight:700;line-height:1.12;letter-spacing:-0.5px;
   display:-webkit-box;-webkit-line-clamp:3;-webkit-box-orient:vertical;overflow:hidden}
 .preview{margin-top:22px;font-size:25px;font-weight:400;line-height:1.45;color:rgba(255,255,255,0.66);
   max-width:960px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
 .bottom{display:flex;align-items:center;justify-content:space-between}
 .who{display:flex;align-items:center;gap:20px}
 .avatar{width:66px;height:66px;border-radius:50%;border:3px solid #26c6da;object-fit:cover;
   box-shadow:0 0 0 3px rgba(38,198,218,0.22)}
 .avatar-fallback{width:66px;height:66px;border-radius:50%;border:3px solid #26c6da;display:flex;
   align-items:center;justify-content:center;font-size:26px;font-weight:700;background:#0a2a30;color:#4dd0e1}
 .name{font-size:26px;font-weight:700}
 .role{font-size:19px;font-weight:400;color:rgba(255,255,255,0.6);margin-top:2px}
 .domain{font-size:23px;font-weight:700;letter-spacing:0.5px;color:#4dd0e1}
</style></head><body>
 <div class="card">
  <div class="bg"></div><div class="overlay"></div><div class="accent"></div>
  <div class="content">
   <div class="top"><div class="kicker">Dhaval Soneji &middot; Blog</div><div class="date">${esc(date)}</div></div>
   <div>
     <div class="emoji">${esc(emoji)}</div>
     <div class="title">${esc(title)}</div>
     <div class="preview">${esc(preview)}</div>
   </div>
   <div class="bottom">
     <div class="who">${avatarHtml}
       <div><div class="name">Dhaval Soneji</div><div class="role">Software &amp; Electronic Engineer</div></div>
     </div>
     <div class="domain">dhavalsoneji.com/blog</div>
   </div>
  </div>
 </div>
</body></html>`;
}

// ---- main -------------------------------------------------------------------
(async () => {
    const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
    if (!files.length) {
        console.error("no posts in", BLOG_DIR);
        process.exit(1);
    }

    const bg = dataUri(path.join(PUBLIC, "bg.jpg"), "image/jpeg");
    const avatar = await fetchAvatar();

    const { chromium } = loadPlaywright();
    const executablePath = resolveChromium();
    console.log("chromium:", executablePath || "(playwright default)");
    const browser = await chromium.launch({
        executablePath,
        args: ["--no-sandbox", "--font-render-hinting=none"],
    });

    for (const f of files) {
        const { data: fm } = matter(fs.readFileSync(path.join(BLOG_DIR, f), "utf8"));
        const slug = fm.slug || f.replace(/\.md$/, "");
        const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
        await page.setContent(
            html({
                emoji: fm.emoji || "📝",
                title: fm.title || slug.replace(/-/g, " "),
                preview: tidyPreview(fm.preview),
                date: fmtDate(fm.date),
                bg,
                avatar,
            }),
            { waitUntil: "networkidle" }
        );
        // give webfonts a beat to settle (falls back to Noto Sans offline)
        await page.evaluate(() => (document.fonts ? document.fonts.ready : null)).catch(() => {});
        await page.waitForTimeout(250);

        const outDir = path.join(PUBLIC, "blog", slug);
        fs.mkdirSync(outDir, { recursive: true });
        const out = path.join(outDir, "cover.jpg");
        await page.screenshot({ path: out, type: "jpeg", quality: 86 });
        await page.close();
        const kb = (fs.statSync(out).size / 1024).toFixed(0);
        console.log(`  ${slug}/cover.jpg  ${kb} KB`);
    }

    await browser.close();
    console.log("done.");
})().catch(e => {
    console.error(e);
    process.exit(1);
});
