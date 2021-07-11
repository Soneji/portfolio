import { createTheme } from "@material-ui/core/styles";
import cyan from "@material-ui/core/colors/cyan";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: cyan[400],
        },
        secondary: cyan,
    },
});

export default theme;
