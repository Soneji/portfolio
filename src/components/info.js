import React from "react";
import { graphql, useStaticQuery } from "gatsby";
import { Box, Container, Card, CardContent, Grid, Typography } from "@material-ui/core";
import PersonIcon from "@material-ui/icons/Person";
import CodeIcon from "@material-ui/icons/Code";

const Info = classes => {
    const mds = useStaticQuery(graphql`
        {
            allMarkdownRemark {
                edges {
                    node {
                        html
                        parent {
                            ... on File {
                                name
                            }
                        }
                    }
                }
            }
        }
    `).allMarkdownRemark.edges;
    let data = {};
    mds.forEach(md => {
        data[md.node.parent.name] = md.node.html;
    });

    return (
        <Container className={classes.cardGridTop} maxWidth="lg">
            <Grid container spacing={4}>
                <Grid item xs={12} sm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent
                            className={classes.cardContent}
                            style={{ paddingLeft: 30, paddingRight: 30 }}
                        >
                            <div
                                style={{
                                    marginTop: "1em",
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <PersonIcon className={classes.icon} />
                                <Typography variant="h6" component="h6" className={classes.icon}>
                                    about me
                                </Typography>
                            </div>
                            <Typography>
                                <Box dangerouslySetInnerHTML={{ __html: data.about_me }}></Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12} sm={12} md={6}>
                    <Card className={classes.card}>
                        <CardContent
                            className={classes.cardContent}
                            style={{ paddingLeft: 30, paddingRight: 30 }}
                        >
                            <div
                                style={{
                                    marginTop: "1em",
                                    display: "flex",
                                    alignItems: "center",
                                    flexWrap: "wrap",
                                }}
                            >
                                <CodeIcon className={classes.icon} />
                                <Typography variant="h6" component="h6" className={classes.icon}>
                                    technologies
                                </Typography>
                            </div>
                            <Typography>
                                <Box dangerouslySetInnerHTML={{ __html: data.technologies }}></Box>
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Info;
