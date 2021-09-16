module.exports = {
    reactStrictMode: true,
    images: {
        domains: [
            "github.com",
            "githubusercontent.com",
            "repository-images.githubusercontent.com",
            "images.unsplash.com",
            "unsplash.com",
            "notion.so",
            "www.notion.so",
            "notion.site",
        ],
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
        });
        config.externals.push({
            sharp: "commonjs sharp",
        });
        return config;
    },
    target: "serverless",
};
