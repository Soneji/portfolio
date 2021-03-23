import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import config from "../../config";

import {
    Card,
    CardActions,
    CardContent,
    Typography,
    Container,
    Grid,
    Button,
    ButtonBase,
} from "@material-ui/core";

import CodeIcon from "@material-ui/icons/Code";
import StarBorderRoundedIcon from "@material-ui/icons/StarBorderRounded";
import AppsIcon from "@material-ui/icons/Apps";
import GitHubIcon from "@material-ui/icons/GitHub";
import WebIcon from "@material-ui/icons/Web";

const Contributions = classes => {
    let contributions = useStaticQuery(graphql`
        {
            github {
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
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `).github.viewer.contributionsCollection.pullRequestContributions.nodes;

    // remove non merged PRs
    contributions = contributions.filter(contrib => contrib.pullRequest.merged);

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

    // remove based on filter from `config.js`
    repositories = repositories.filter(repo => {
        // eslint-disable-next-line
        let cur = repo.node;
        let r = true;
        config.contribFilter.forEach(filter => {
            // eslint-disable-next-line
            if (eval(`cur.${filter.field}`) === filter.value) {
                r = false;
                return;
            }
        });
        return r;
    });

    // sort repos by stargazers
    repositories.sort(function (a, b) {
        return b.node.stargazerCount - a.node.stargazerCount;
    });

    // get first 6 repos
    repositories = repositories.splice(0, 6);

    return (
        <Container className={classes.cardGridBottom} maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div
                        style={{
                            marginTop: "1em",
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <AppsIcon className={classes.icon} />
                        <Typography variant="h6" component="h6" className={classes.icon}>
                            top open source projects i've contributed to
                        </Typography>
                    </div>
                </Grid>
                {/* {repositories.map(({ node: r }) => {
                    console.log(r);
                })} */}
                {repositories.map(({ node: r }) => (
                    <Grid item key={r.name} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <CardContent className={classes.cardContent}>
                                <ButtonBase
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                >
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                        color="primary"
                                    >
                                        {r.owner.login}'s {r.name.split(/[-_]+/).join(" ")}
                                    </Typography>
                                </ButtonBase>

                                <Typography
                                    style={{
                                        height: "25px",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 1,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                    dangerouslySetInnerHTML={{
                                        __html:
                                            r.descriptionHTML === "<div></div>"
                                                ? "-"
                                                : r.descriptionHTML,
                                    }}
                                ></Typography>
                                <div
                                    style={{
                                        marginTop: "1em",
                                        display: "flex",
                                        alignItems: "center",
                                        flexWrap: "wrap",
                                    }}
                                >
                                    <CodeIcon className={classes.icon} />
                                    <span className={classes.icon}>
                                        {r.primaryLanguage?.name || "N/A"}
                                    </span>
                                    <StarBorderRoundedIcon className={classes.icon} />
                                    <span className={classes.icon}>{r.stargazerCount}</span>
                                </div>
                            </CardContent>
                            <CardActions>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                    startIcon={<GitHubIcon />}
                                    style={{ width: "100%" }}
                                >
                                    View on GitHub
                                </Button>
                                {r.hoomepageUrl !== null && r.homepageUrl !== "" && (
                                    <Button
                                        variant="contained"
                                        size="small"
                                        color="primary"
                                        onClick={() => {
                                            window.open(r.homepageUrl);
                                        }}
                                        startIcon={<WebIcon />}
                                        style={{ width: "100%" }}
                                    >
                                        View Live Demo!
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Contributions;
