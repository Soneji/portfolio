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
            "notion.site",
        ],
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
        });

        return config;
    },
};
