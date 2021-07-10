import React from "react";

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
import BuildIcon from "@material-ui/icons/Build";
import GitHubIcon from "@material-ui/icons/GitHub";
import WebIcon from "@material-ui/icons/Web";
import Image from "next/image";

const reposFilter = [
    { field: "name", value: "harrowhealthmatters.com" },
    { field: "name", value: "uptime" },
    { field: "name", value: /github\.io/i },
    { field: "owner.login", value: "lenamd" },
    // { field: "name", value: "ctf" },
];

const Projects = (classes, repos) => {
    repos = repos.edges;
    // remove ones without custom open graph images
    // repos = repos.filter(repo => repo.node.usesCustomOpenGraphImage);

    // remove based on filter from above
    repos = repos.filter(repo => {
        // eslint-disable-next-line
        let cur = repo.node;
        let r = true;
        reposFilter.forEach(filter => {
            // eslint-disable-next-line
            if (
                eval(`cur.${filter.field}`) === filter.value ||
                eval(`cur.${filter.field}`).match(filter.value)
            ) {
                r = false;
                return;
            }
        });
        return r;
    });

    return (
        <Container className={classes.cardGrid} maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12}>
                    <div
                        style={{
                            marginTop: "1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <BuildIcon color="primary" className={classes.icon} />
                        <Typography variant="h6" component="h6" className={classes.icon}>
                            Some of my Projects
                        </Typography>
                    </div>
                </Grid>
                {repos.map(({ node: r }) => (
                    <Grid item key={r.name} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            {r.usesCustomOpenGraphImage && (
                                <Button
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                >
                                    <Image
                                        className={classes.cardMedia}
                                        title="Repository Picture"
                                        src={r.openGraphImageUrl}
                                        alt=""
                                        layout="intrinsic"
                                        width={373}
                                        height={200}
                                        loading="lazy"
                                    />
                                </Button>
                            )}
                            {!r.usesCustomOpenGraphImage && (
                                <Button
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                >
                                    <Image
                                        className={classes.cardMediaPlaceholder}
                                        title="Repository Picture"
                                        src={"/box.jpg"}
                                        alt=""
                                        layout="intrinsic"
                                        width={373}
                                        height={200}
                                        loading="lazy"
                                        // placeholder="blur"
                                    />
                                    <Typography
                                        gutterBottom
                                        variant="h6"
                                        component="h2"
                                        color="primary"
                                        style={{
                                            position: "absolute",
                                            top: "40%",
                                            left: "50%",
                                            transform: "translateX(-50%)",
                                            textTransform: "capitalize",
                                        }}
                                    >
                                        {r.name.split(/[-_]+/).join(" ")}
                                    </Typography>
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
                                        className={classes.caps}
                                    >
                                        {r.name.split(/[-_]+/).join(" ")}
                                    </Typography>
                                </ButtonBase>
                                <Typography
                                    component="div"
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
                            <CardActions style={{ display: "flex" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        window.open(r.url);
                                    }}
                                    startIcon={<GitHubIcon />}
                                    style={{ width: "100%", margin: "1em" }}
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
                                        style={{ width: "100%", margin: "1em" }}
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

export default Projects;
