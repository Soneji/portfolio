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
            "www.notion.so",
            "notion.site",
        ],
        // if you change this remember to change .env and env on netlify.com!
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
