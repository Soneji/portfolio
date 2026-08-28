import React from "react";
import Header from "../components/Header";

import CssBaseline from "@mui/material/CssBaseline";
import { useStyles } from "../styles/styles";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../mui-theme";
import Footer from "../components/Footer";
import Contributions from "../components/Contributions";
import HeadMaker from "../components/HeadMaker";

export async function getStaticProps() {
    try {
        const { graphql } = require("@octokit/graphql");
        const graphqlWithAuth = graphql.defaults({
            headers: {
                authorization: `token ${process.env.GITHUB_TOKEN}`,
            },
        });

        // GitHub's `contributionsCollection` only ever covers a SINGLE year: with no
        // from/to it silently returns just the last ~365 days, and a from/to range
        // wider than one year is rejected outright. That is why older PRs dropped off
        // the page as they aged past 12 months. Fix: ask which years the viewer has
        // any contributions in, then query each of those years and merge the results
        // so the whole history is covered, not just the trailing year.
        const {
            viewer: {
                contributionsCollection: { contributionYears },
            },
        } = await graphqlWithAuth(`
            {
                viewer {
                    contributionsCollection {
                        contributionYears
                    }
                }
            }
        `);

        let nodes = [];
        if (contributionYears && contributionYears.length) {
            // Build one aliased query that fetches each year's merged-PR window in a
            // single round-trip (yYYYY: contributionsCollection(from, to) { ... }).
            const prFields = `
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
                }`;
            const perYear = contributionYears
                .map(
                    year =>
                        `y${year}: contributionsCollection(from: "${year}-01-01T00:00:00Z", to: "${year}-12-31T23:59:59Z") {
                            pullRequestContributions(first: 100) { ${prFields} }
                        }`
                )
                .join("\n");

            const data = await graphqlWithAuth(`{ viewer { ${perYear} } }`);

            contributionYears.forEach(year => {
                const yearNodes = data.viewer?.[`y${year}`]?.pullRequestContributions?.nodes;
                if (yearNodes) nodes.push(...yearNodes);
            });
        }

        let contributions = nodes.filter(contrib => contrib.pullRequest.merged);

        // extract repos from PR
        let repositories = [];
        contributions.forEach(repo => repositories.push({ node: repo.pullRequest.repository }));

        // remove duplicate repos (the same repo is returned once per year contributed)
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
