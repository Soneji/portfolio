import React from "react";
import Header from "../components/Header";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Contributions from "../components/Contributions";
import HeadMaker from "../components/HeadMaker";

export async function getStaticProps({ params }) {
    try {
    const { graphql } = require("@octokit/graphql");
    const graphqlWithAuth = graphql.defaults({
        headers: {
            authorization: `token ${process.env.GITHUB_TOKEN}`,
        },
    });
    const {
        viewer: {
            contributionsCollection: {
                pullRequestContributions: { nodes },
            },
        },
    } = await graphqlWithAuth(`
        {
            viewer {
                contributionsCollection {
                    pullRequestContributions(last: 100) {
                        nodes {
                            pullRequest {
                                merged
                                repository {
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
                                    isPrivate
                                }
                            }
                        }
                    }
                }
            }
        }
    `);
    let contributions = nodes.filter(contrib => contrib.pullRequest.merged);

    // extract repos from PR
    let repositories = [];
    contributions.forEach(repo => repositories.push({ node: repo.pullRequest.repository }));

    // remove duplicate repos
    var seenNames = {};
    repositories = repositories.filter(function (currentObject) {
        if (currentObject.node.name in seenNames) {
            return false;
        } else {
            seenNames[currentObject.node.name] = true;
            return true;
        }
    });

    return { props: { repositories }, revalidate: 86400 };
    } catch (e) {
        // GitHub API unreachable/unauthorised at build: serve an empty list rather
        // than failing the whole build; it repopulates on the next revalidate.
        console.error("contributions: GitHub fetch failed, serving empty list:", e?.message || e);
        return { props: { repositories: [] }, revalidate: 86400 };
    }
}

export default function ContributionsPage({ repositories }) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <HeadMaker
                title={"Contributions - Dhaval Soneji"}
                description={"Top Open Source Projects I've Contributed To"}
                url={"/contributions"}
            />

            <ThemeProvider theme={theme}>
                <CssBaseline />

                {Header(classes)}
                <main id="main">{Contributions(classes, repositories)}</main>
                {Footer(classes)}
            </ThemeProvider>
        </React.Fragment>
    );
}
