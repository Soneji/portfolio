import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";

import Typography from "@material-ui/core/Typography";

const Footer = classes => {
    const data = useStaticQuery(graphql`
        {
            github {
                viewer {
                    name
                }
            }
        }
    `).github.viewer;

    function Copyright() {
        return (
            <Typography variant="body2" color="textSecondary" align="center">
                {"Copyright © "}
                {/* <Link color="inherit" href="https://material-ui.com/"> */}
                {data.name}
                <span> </span>
                {new Date().getFullYear()}
                {/* </Link>{" "} */}
                {/* {"."} */}
            </Typography>
        );
    }

    return (
        <div style={{ display: "grid" }}>
            <StaticImage
                style={{
                    gridArea: "1/1",
                    // width: `calc(100vw + 48px)`,
                    paddingTop: 25,
                    paddingBottom: 25,
                    height: 75,
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
                    // display: "grid",
                    // margin: -24,
                }}
            >
                <footer className={classes.footer}>
                    <Copyright />
                </footer>
            </div>
        </div>
    );
};
export default Footer;
