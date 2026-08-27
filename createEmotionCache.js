import createCache from "@emotion/cache";

// Shared emotion cache factory for MUI v6 SSR on the Next.js Pages Router.
// `prepend: true` keeps MUI styles first so app styles can override them.
export default function createEmotionCache() {
    return createCache({ key: "mui", prepend: true });
}
