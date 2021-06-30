import React from "react";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import Image from "next/image";
import Roots from "./Roots";

const Header = classes => {
    return (
        <header>
            <div style={{ display: "grid" }}>
                <div className={classes.backgroundDiv}>
                    <div className={classes.heroContent}>
                        <Container maxWidth="sm">
                            <Grid className={classes.chevron} container justify="center">
                                <Grid item>
                                    <div style={{ display: "grid" }}>
                                        <Image
                                            className={classes.profilePic}
                                            alt={"Picture of me"}
                                            width={200}
                                            height={200}
                                            src={"https://github.com/soneji.png"}
                                            loading="eager"
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
                                Dhaval Soneji
                            </Typography>

                            <Typography
                                className={classes.lower}
                                variant="h6"
                                align="center"
                                color="textSecondary"
                                paragraph
                            >
                                Software and Electronic Engineer
                            </Typography>
                            {Roots(classes)}
                        </Container>
                    </div>
                </div>
            </div>
        </header>
    );
};
export default Header;
