import React from "react";
import Header from "../components/Header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Projects from "../components/Projects";
import HeadMaker from "../components/HeadMaker";

export async function getServerSideProps({ params }) {
    const { graphql } = require("@octokit/graphql");
    const graphqlWithAuth = graphql.defaults({
        headers: {
            authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    });
    const {
        viewer: { repositories },
    } = await graphqlWithAuth(`
        {
            viewer {
                repositories(
                    isFork: false
                    orderBy: { field: STARGAZERS, direction: DESC }
                    last: 100
                    privacy: PUBLIC
                ) {
                    edges {
                        node {
                            name
                            owner {
                                login
                            }
                            stargazerCount
                            forkCount
                            descriptionHTML
                            nameWithOwner
                            url
                            primaryLanguage {
                                name
                            }
                            isArchived
                            homepageUrl
                            usesCustomOpenGraphImage
                            openGraphImageUrl
                        }
                    }
                }
            }
        }
    `);
    return { props: { repositories } };
}

export default function ProjectsPage({ repositories }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={"My Projects - Dhaval Soneji"}
                description={"Some of my Public Projects"}
                url={"/projects"}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">{Projects(classes, repositories)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
