/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "github.com" },
            { protocol: "https", hostname: "**.githubusercontent.com" },
            { protocol: "https", hostname: "repository-images.githubusercontent.com" },
            { protocol: "https", hostname: "images.unsplash.com" },
            { protocol: "https", hostname: "unsplash.com" },
            { protocol: "https", hostname: "notion.so" },
            { protocol: "https", hostname: "www.notion.so" },
            { protocol: "https", hostname: "**.notion.so" },
            { protocol: "https", hostname: "notion.site" },
            { protocol: "https", hostname: "**.notion.site" },
            { protocol: "https", hostname: "**.amazonaws.com" },
        ],
    },
    // sharp is only pulled in by the standalone `npm run websitegen` script; keep it
    // external so it is never bundled into the app.
    serverExternalPackages: ["sharp"],
};

module.exports = nextConfig;
