import React from "react";

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

import WebIcon from "@material-ui/icons/Web";
import LanguageIcon from "@material-ui/icons/Language";
import Image from "next/image";
import data from "../data/websites/websites.json";

import WebsitesForm from "./WebsitesForm";

const websites = data.websites;
websites.forEach(website => {
    website.localImage = `/websiteImages/${website.key}.jpg`;
});

const Projects = classes => {
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
                        <LanguageIcon color="primary" className={classes.icon} />
                        <Typography variant="h6" component="h6" className={classes.icon}>
                            {"Some of the Websites I've Built"}
                        </Typography>
                    </div>
                </Grid>
                {websites.map(website => (
                    <Grid item key={website.key} xs={12} sm={6} md={4}>
                        <Card className={classes.card}>
                            <Button
                                onClick={() => {
                                    window.open(website.url);
                                }}
                            >
                                <Image
                                    className={classes.cardMedia}
                                    title="Repository Picture"
                                    src={website.localImage}
                                    alt=""
                                    layout="intrinsic"
                                    width={373}
                                    height={200}
                                    loading="lazy"
                                />
                            </Button>

                            <CardContent className={classes.cardContent}>
                                <ButtonBase
                                    onClick={() => {
                                        window.open(website.url);
                                    }}
                                >
                                    <Typography variant="h6" component="h2" color="primary">
                                        {website.name.split(/[-_]+/).join(" ")}
                                    </Typography>
                                </ButtonBase>
                            </CardContent>
                            <CardActions style={{ display: "flex" }}>
                                <Button
                                    variant="contained"
                                    size="small"
                                    color="primary"
                                    onClick={() => {
                                        window.open(website.url);
                                    }}
                                    startIcon={<WebIcon />}
                                    style={{ width: "100%", margin: "1em" }}
                                >
                                    View Live Site
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {WebsitesForm(classes)}
        </Container>
    );
};

export default Projects;
