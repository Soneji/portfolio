require("dotenv").config();
// process.traceDeprecation = true;

module.exports = {
    siteMetadata: {
        title: "Dhaval Soneji",
    },
    plugins: [
        "gatsby-plugin-sass",
        "gatsby-plugin-graphql-config",
        "gatsby-theme-material-ui",
        {
            resolve: `gatsby-source-graphql`,
            options: {
                typeName: `GitHub`,
                fieldName: `github`,
                url: `https://api.github.com/graphql`,
                headers: {
                    Authorization: `bearer ${process.env.GITHUB_TOKEN}`,
                },
            },
        },
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdown`,
                path: `${__dirname}/src/markdown`,
            },
        },
        "gatsby-transformer-remark",
        "gatsby-plugin-smoothscroll",
        "gatsby-plugin-image",
        "gatsby-plugin-sharp",
        "gatsby-transformer-sharp",
    ],
};
