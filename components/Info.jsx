import React from "react";
import { Box, Container, Grid, Typography, Divider } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";

import about from "../data/about.md";
import technologies from "../data/technologies.json";

const Info = classes => {
    return (
        <Container className={classes.cardGrid} maxWidth="md">
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12} md={12}>
                    <div
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <PersonIcon color="primary" className={classes.icon} />
                        <Typography

                            variant="h6"
                            component="h6"
                            className={classes.icon}
                        >
                            about me
                        </Typography>
                    </div>
                    <Typography style={{ textAlign: "center" }} component="div">
                        <Box dangerouslySetInnerHTML={{ __html: about }}></Box>
                    </Typography>
                </Grid>
                <Grid style={{ margin: "auto" }} item xs={8} sm={8} md={8}>
                    <Divider style={{ margin: "auto" }} />
                </Grid>

                <Grid item xs={12} sm={12} md={12}>
                    <div
                        style={{
                            // marginTop: "1em",
                            marginBottom: "1em",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            flexWrap: "wrap",
                        }}
                    >
                        <CodeIcon color="primary" className={classes.icon} />
                        <Typography

                            variant="h6"
                            component="h6"
                            className={classes.icon}
                        >
                            my tech stack
                        </Typography>
                    </div>
                    <Grid
                        style={{ textAlign: "center", listStyleType: "none", fontSize: 16 }}
                        container
                        spacing={0}
                    >
                        {technologies.skills.map((value, index) => {
                            return (
                                <Grid key={index} item xs={12} sm={6} md={4} lg={3}>
                                    <li>{value}</li>
                                </Grid>
                            );
                        })}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Info;
