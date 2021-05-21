require("dotenv").config();
// process.traceDeprecation = true;

module.exports = {
    siteMetadata: {
        title: "Dhaval Soneji",
        description: "My Personal Portfolio Website. I am an Electronic Engineering Student with a passion for software engineering, cyber security, open source, developer operations.",
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
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Dhaval Soneji`,
                short_name: `Dhaval.S`,
                start_url: `/`,
                background_color: `#34928a`,
                theme_color: `#34928a`,
                display: `standalone`,
                icon: `src/assets/code-512.png`,
            },
        },
        "gatsby-plugin-react-helmet",
        "gatsby-plugin-netlify",
    ],
};
