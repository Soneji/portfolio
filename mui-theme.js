import { createTheme } from "@mui/material/styles";
import { cyan } from "@mui/material/colors";

// MUI v6: `palette.type` -> `palette.mode`; `secondary` must expose `main`
// (v5+ augmentColor rejects a bare hue map), so pin it explicitly.
const theme = createTheme({
    palette: {
        mode: "dark",
        primary: {
            main: cyan[400],
        },
        secondary: {
            main: cyan[600],
            light: cyan[300],
            dark: cyan[800],
        },
    },
});

export default theme;
