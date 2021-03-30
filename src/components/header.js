import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import scrollTo from "gatsby-plugin-smoothscroll";
import { StaticImage, GatsbyImage, getImage } from "gatsby-plugin-image";

import config from "../../config";

import { Button, Grid, Typography, Container } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const reqSvgs = require.context("!@svgr/webpack!../assets/svgs/", true, /\.svg$/);
const svgs = reqSvgs.keys().reduce((images, path) => {
    const key = path.substring(path.lastIndexOf("/") + 1, path.lastIndexOf("."));
    images[key] = reqSvgs(path).default;
    return images;
}, {});

const Header = classes => {
    const data = useStaticQuery(graphql`
        {
            github {
                viewer {
                    name
                    avatarUrl
                    avatarFile {
                        childImageSharp {
                            gatsbyImageData(
                                width: 200
                                placeholder: BLURRED
                                formats: [AUTO, WEBP, AVIF]
                            )
                        }
                    }
                }
            }
        }
    `).github.viewer;

    return (
        <header>
            <div style={{ display: "grid" }}>
                <StaticImage
                    style={{
                        gridArea: "1/1",
                        // width: `calc(100vw + 48px)`,
                        height: "calc(100vh + 48px)",
                    }}
                    layout="fullWidth"
                    alt=""
                    src="../assets/bg.jpg"
                    placeholder="blurred"
                    formats={["auto", "webp", "avif"]}
                />
                <div
                    style={{
                        gridArea: "1/1",
                        position: "relative",
                        display: "grid",
                    }}
                >
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Grid className={classes.chevron} container justify="center">
                                <Grid item>
                                    <div style={{ display: "grid" }}>
                                        <GatsbyImage
                                            style={{
                                                gridArea: "1/1",
                                                backgroundSize: "cover",
                                                width: "200px",
                                                height: "200px",
                                                borderRadius: "20px",
                                            }}
                                            imgStyle={{ borderRadius: "20px" }}
                                            layout="fullWidth"
                                            alt={"Picture of " + data.name}
                                            image={getImage(data.avatarFile)}
                                            formats={["auto", "webp", "avif"]}
                                        />
                                        <div
                                            style={{
                                                // By using the same grid area for both, they are stacked on top of each other
                                                gridArea: "1/1",
                                                position: "relative",
                                                // This centers the other elements inside the hero component
                                                placeItems: "center",
                                                display: "grid",
                                            }}
                                        ></div>
                                    </div>
                                </Grid>
                            </Grid>
                            <Typography
                                className={classes.lower}
                                component="h1"
                                variant="h4"
                                align="center"
                                color="textPrimary"
                                gutterBottom
                            >
                                {data.name}
                            </Typography>
                            {config.position && (
                                <Typography
                                    className={classes.lower}
                                    variant="h6"
                                    align="center"
                                    color="textSecondary"
                                    paragraph
                                >
                                    {config.position}
                                </Typography>
                            )}
                            {config.socialMedia.length > 0 && (
                                <div className={classes.heroButtons}>
                                    <Grid container spacing={2} justify="center">
                                        {config.socialMedia.map((value, index) => {
                                            let SVG = svgs[value.name];
                                            return (
                                                <Grid
                                                    style={{ height: "64px", width: "64px" }}
                                                    // item
                                                    key={index}
                                                >
                                                    <Button style={{ minWidth: 50 }}>
                                                        <a
                                                            href={value.url}
                                                            title={value.name}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                        >
                                                            <SVG className={classes.mySvg} />
                                                        </a>
                                                    </Button>
                                                </Grid>
                                            );
                                        })}
                                    </Grid>
                                </div>
                            )}

                            <Grid className={classes.chevron} container justify="center">
                                <Grid item>
                                    <Button onClick={() => scrollTo("#main")}>
                                        <KeyboardArrowDownIcon />
                                    </Button>
                                </Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
