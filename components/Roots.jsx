import React from "react";
import { Button, Grid } from "@mui/material";
import Link from "next/link";
import { withRouter } from "next/router";

// NOTE: React 19 removed the legacy second argument to function components, so the
// old `({ router }, classes)` signature left `classes` undefined (it was an empty
// legacy-context object under React 17, so `classes.linky` silently no-op'd). The
// link styling never actually applied, so it is dropped rather than newly introduced.
// Also migrated the Next 12 `<Link passHref><Button component="a">` pattern to the
// Next 13+ idiom (`Button` rendered as the Next `Link`) to avoid nested <a> tags.
const Roots = ({ router }) => {
    const routes = [
        { text: "home", route: "/" },
        { text: "blog", route: "/blog" },
        { text: "websites", route: "/websites" },
        { text: "projects", route: "/projects" },
        { text: "contributions", route: "/contributions" },
    ];

    return (
        <div>
            {routes.length > 0 && (
                <div>
                    <Grid container spacing={2} justifyContent="center">
                        {routes.map((Value, index) => (
                            <Grid style={{ width: "auto" }} key={index}>
                                <Button
                                    component={Link}
                                    href={Value.route}
                                    style={{
                                        minWidth: 50,
                                        textDecoration:
                                            router?.pathname === Value.route
                                                ? "underline"
                                                : "none",
                                        textTransform: "capitalize",
                                    }}
                                >
                                    {Value.text}
                                </Button>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            )}
        </div>
    );
};
export default withRouter(Roots);
