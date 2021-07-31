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
import AppsIcon from "@material-ui/icons/Apps";
import GitHubIcon from "@material-ui/icons/GitHub";
import WebIcon from "@material-ui/icons/Web";

const contribFilter = [
    { field: "owner.login", value: "education" },
    { field: "owner.login", value: "Soneji" },
    { field: "owner.login", value: "Warwick-Engineering-Society" },
    // { field: "isPrivate", value: true },
    // { field: "name", value: "ctf" },
];

const Contributions = (classes, repos) => {
    // remove ones without custom open graph images
    // repos = repos.filter(repo => repo.node.usesCustomOpenGraphImage);

    // remove based on filter from above
    repos = repos.filter(repo => {
        // eslint-disable-next-line
        let cur = repo.node;
        let r = true;
        contribFilter.forEach(filter => {
            // eslint-disable-next-line
            if (
                eval(`cur.${filter.field}`) === filter.value ||
                eval(`cur.${filter.field}`).match(filter.value) ||
                cur.isPrivate ||
                cur.stargazerCount < 1
            ) {
                r = false;
                return;
            }
        });
        return r;
    });

    // sort repos by stargazers
    repos.sort(function (a, b) {
        return b.node.stargazerCount - a.node.stargazerCount;
    });

    repos = repos.splice(0, 9);

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
                        <GitHubIcon color="primary" className={classes.icon} />
                        <Typography variant="h6" component="h6" className={classes.icon}>
                            {"Top Open-Source Projects I've Contributed To"}
                        </Typography>
                    </div>
                </Grid>

                {repos.map(({ node: r }) => (
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
                                        {r.owner.login}&apos;s {r.name.split(/[-_]+/).join(" ")}
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

export default Contributions;
