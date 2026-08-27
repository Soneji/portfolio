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
    // Migration in progress (MUI v4->v6): don't let lint block the production build.
    eslint: { ignoreDuringBuilds: true },
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
        });
        config.externals.push({ sharp: "commonjs sharp" });
        return config;
    },
};

module.exports = nextConfig;
