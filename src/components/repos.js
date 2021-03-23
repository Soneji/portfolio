import React from "react";
import { graphql, useStaticQuery } from "gatsby";

import config from "../../config";

import {
    Box,
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

import { GatsbyImage, getImage } from "gatsby-plugin-image";

const Repos = classes => {
    let repositories = useStaticQuery(graphql`
        {
            github {
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
                                openGraphImageFile {
                                    childImageSharp {
                                        gatsbyImageData(
                                            width: 400
                                            placeholder: BLURRED
                                            formats: [AUTO, WEBP, AVIF]
                                        )
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    `).github.viewer.repositories.edges;

    // remove ones without custom open graph images
    repositories = repositories.filter(repo => repo.node.usesCustomOpenGraphImage);

    // remove based on filter from `config.js`
    repositories = repositories.filter(repo => {
        // eslint-disable-next-line
        let cur = repo.node;
        let r = true;
        config.reposFilter.forEach(filter => {
            // eslint-disable-next-line
            if (eval(`cur.${filter.field}`) === filter.value) {
                r = false;
                return;
            }
        });
        return r;
    });

    return (
        <Container className={classes.cardGridMiddle} maxWidth="lg">
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
                            some of my projects
                        </Typography>
                    </div>
                </Grid>
                {repositories.map(({ node: r }) => (
                    <Grid item key={r.name} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            {r.usesCustomOpenGraphImage && (
                                <Button
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                >
                                    <GatsbyImage
                                        className={classes.cardMedia}
                                        title="Repository Picture"
                                        image={getImage(r.openGraphImageFile)}
                                    />
                                </Button>
                            )}
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
                                        {r.name.split(/[-_]+/).join(" ")}
                                    </Typography>
                                </ButtonBase>
                                <Typography
                                    style={{
                                        height: "70px",
                                        textOverflow: "ellipsis",
                                        display: "-webkit-box",
                                        WebkitLineClamp: 3,
                                        WebkitBoxOrient: "vertical",
                                        overflow: "hidden",
                                    }}
                                >
                                    <Box
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                r.descriptionHTML === "<div></div>"
                                                    ? "-"
                                                    : r.descriptionHTML,
                                        }}
                                    ></Box>
                                </Typography>
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

export default Repos;
