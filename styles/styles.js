import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    lower: {
        textTransform: "capitalize",
    },
    caps: {
        textTransform: "capitalize",
    },
    heroContent: {
        backgroundPosition: "center",
        width: "100vw",
        height: "60vh",
        minHeight: 450,
        maxHeight: 600,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    backgroundDiv: {
        gridArea: "1/1",
        position: "relative",
        display: "grid",
        backgroundImage: "url(/bg.jpg)",
        backgroundColor: "rgba(0, 0, 0, 0.2)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
    },
    footerBackgroundDiv: {
        gridArea: "1/1",
        position: "relative",
        display: "grid",
        backgroundImage: "url(/bg.jpg)",
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        backgroundBlendMode: "overlay",
        backgroundSize: "cover",
    },
    profilePic: {
        gridArea: "1/1",
        backgroundSize: "cover",
        width: "200px",
        height: "200px",
        borderRadius: "20px",
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGrid: {
        paddingTop: theme.spacing(6),
        paddingBottom: theme.spacing(6),
    },
    card: {
        height: "100%",
        display: "flex",
        flexDirection: "column",
    },
    cardMedia: {
        width: 400,
        height: 200,
    },
    cardMediaPlaceholder: {
        width: 400,
        height: 200,
        opacity: 0.9,
    },
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        paddingTop: 10,
        paddingBottom: 10,
    },
    myIcon: {
        width: "100%",
        height: "100%",
        fill: "#fff",
    },
    chevron: {
        padding: 30,
        textAlign: "center",
        margin: "auto   ",
    },
    linky: {
        color: "red",
    },
}));
