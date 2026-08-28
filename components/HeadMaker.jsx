import React from "react";
import Head from "next/head";

export default function HeadMaker({ title, description, url, image }) {
    const deploy = process.env.URL || process.env.NEXT_PUBLIC_URL || `http://localhost:3000`;

    // Normalise the image URL: `image` may or may not carry a leading slash, and
    // `${deploy}/${image}` would otherwise emit a double slash that some crawlers and
    // static hosts fail to resolve. Fall back to the site-wide OG image when unset.
    const ogImage = image
        ? `${deploy}/${image.replace(/^\/+/, "")}`
        : `${deploy}/og_image.jpg`;

    return (
        <Head>
            {/* <!-- Primary Meta Tags --> */}
            <title>{title}</title>
            <meta name="title" content={title} />
            <meta name="description" content={description} />

            {/* <!-- Open Graph / Facebook --> */}
            <meta property="og:type" content="website" />
            <meta property="og:url" content={deploy + url} />
            <meta property="og:title" content={title} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={ogImage} />

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={deploy + url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            <meta property="twitter:image" content={ogImage} />

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
    );
}
