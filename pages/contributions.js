import React from "react";
import Header from "../components/header";

import CssBaseline from "@material-ui/core/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Contributions from "../components/Contributions";
import HeadMaker from "../components/HeadMaker";

export async function getServerSideProps({ params }) {
    const { graphql } = require("@octokit/graphql");
    const graphqlWithAuth = graphql.defaults({
        headers: {
            authorization: `token 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`,
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

    return { props: { repositories } };
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
