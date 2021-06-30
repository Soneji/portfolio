import React from "react";
import { Button, Grid, Typography, Container } from "@material-ui/core";
import Link from "next/link";
import { withRouter } from "next/router";

const Roots = ({ router }, classes) => {
    const routes = [
        { text: "home", route: "/" },
        { text: "blog", route: "/blog" },
        { text: "projects", route: "/projects" },
        { text: "contributions", route: "/contributions" },
    ];

    return (
        <div>
            {routes.length > 0 && (
                <div>
                    <Grid container spacing={2} justify="center">
                        {routes.map((Value, index) => {
                            return (
                                <Grid
                                    style={{ width: "auto" }}
                                    // item
                                    key={index}
                                >
                                    <Button style={{ minWidth: 50 }}>
                                        <Link className={classes.linky} href={Value.route}>
                                            <a
                                                href={Value.route}
                                                style={{
                                                    textDecoration:
                                                        router.pathname === Value.route
                                                            ? "underline"
                                                            : "none",
                                                    textTransform: "lowercase",
                                                }}
                                                title={Value.text}
                                            >
                                                {Value.text}
                                            </a>
                                        </Link>
                                    </Button>
                                </Grid>
                            );
                        })}
                    </Grid>
                </div>
            )}
        </div>
    );
};
export default withRouter(Roots);
