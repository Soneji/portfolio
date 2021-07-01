module.exports = {
    reactStrictMode: true,
    images: {
        // if you change this remember to change .env and env on netlify.com!
        domains: [
            "github.com",
            "githubusercontent.com",
            "repository-images.githubusercontent.com",
            "images.unsplash.com",
            "unsplash.com",
            "notion.so",
            "notion.site",
        ],
        // if you change this remember to change .env and env on netlify.com!
    },
    webpack: config => {
        config.module.rules.push({
            test: /\.md$/,
            use: [{ loader: "html-loader" }, { loader: "markdown-loader" }],
        });

        return config;
    },
    target: "serverless",
};
