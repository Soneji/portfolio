import React from "react";

import { Box, Card, CardContent, Typography, Container, Grid, ButtonBase } from "@material-ui/core";

import BookIcon from "@material-ui/icons/Book";
import TodayIcon from "@material-ui/icons/Today";

import Link from "next/link";

import "react-notion-x/src/styles.css";
import { WhichImage } from "./WhichImage";

function formatDate(date) {
    var d = new Date(date),
        month = "" + (d.getMonth() + 1),
        day = "" + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [day, month, year].join("/");
}

const Blog = (classes, data) => {
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
                        <BookIcon color="primary" className={classes.icon} />
                        <Typography variant="h6" component="h6" className={classes.icon}>
                            My Blog
                        </Typography>
                    </div>
                </Grid>
                {data.map(post => (
                    <Grid item key={post.title} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <Link href={post.url}>
                                <a style={{ height: 200 }}>
                                    <ButtonBase style={{ height: "100%", width: "100%" }}>
                                        <WhichImage image={post.image} classes={classes} />
                                    </ButtonBase>
                                </a>
                            </Link>
                            <CardContent className={(classes.cardContent, classes.noTopPadding)}>
                                <Link href={post.url}>
                                    <a
                                        style={{
                                            textDecoration: "none",
                                        }}
                                    >
                                        <Box
                                            style={{
                                                marginTop: "1em",
                                                marginBottom: "1em",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                flexWrap: "wrap",
                                            }}
                                        >
                                            <Typography
                                                gutterBottom
                                                variant="h6"
                                                component="h2"
                                                color="primary"
                                            >
                                                {post.title}
                                            </Typography>
                                            <div
                                                style={{
                                                    marginTop: "1em",
                                                    marginBottom: "1em",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "flex-end",
                                                    flexWrap: "wrap",
                                                }}
                                            >
                                                <Typography>{formatDate(post.created)}</Typography>
                                                <TodayIcon style={{ marginLeft: 10 }} />
                                            </div>
                                            {/* <EditIcon />
                                    <Typography>{formatDate(post.edited)}</Typography> */}
                                        </Box>
                                    </a>
                                </Link>

                                <Typography component="div">
                                    <Box
                                        dangerouslySetInnerHTML={{
                                            __html:
                                                post.shortform === "<div></div>"
                                                    ? "-"
                                                    : post.shortform,
                                        }}
                                    ></Box>
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Blog;
