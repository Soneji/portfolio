import { makeStyles } from "@material-ui/core/styles";

export const useStyles = makeStyles(theme => ({
    icon: {
        marginRight: theme.spacing(2),
    },
    lower: {
        textTransform: "lowercase",
    },
    heroContent: {
        backgroundPosition: "center",
        width: "100vw",
        // margin: -24,
        // padding: 24,
        height: "calc(100vh + 48px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
    },
    heroButtons: {
        marginTop: theme.spacing(4),
    },
    cardGridMiddle: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(2),
    },
    cardGridTop: {
        paddingTop: theme.spacing(8),
        paddingBottom: theme.spacing(2),
    },
    cardGridBottom: {
        paddingTop: theme.spacing(2),
        paddingBottom: theme.spacing(8),
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
    cardContent: {
        flexGrow: 1,
    },
    footer: {
        paddingTop: 25,
    },
    mySvg: {
        width: "100%",
        height: "100%",
        fill: "#fff",
    },
    chevron: {
        padding: 30,
        textAlign: "center",
        margin: "auto   ",
    },
}));
