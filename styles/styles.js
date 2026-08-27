// MUI v4's makeStyles (JSS) is gone in v6 and is incompatible with React 18/19.
// The styles now live in a CSS module; useStyles() keeps the exact interface the
// pages use (`const classes = useStyles(); className={classes.heroContent}`),
// so no call sites needed to change.
import styles from "./portfolio.module.scss";

export const useStyles = () => styles;
