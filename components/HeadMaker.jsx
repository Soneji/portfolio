import React from "react";
import Head from "next/head";

export default function HeadMaker({ title, description, url, image }) {
    const deploy = process.env.URL || process.env.NEXT_PUBLIC_URL || `http://localhost:3000`;

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
            {image && <meta property="og:image" content={`${deploy}/${image}`} />}
            {!image && <meta property="og:image" content={`${deploy}/og_image.jpg`} />}

            {/* <!-- Twitter --> */}
            <meta property="twitter:card" content="summary_large_image" />
            <meta property="twitter:url" content={deploy + url} />
            <meta property="twitter:title" content={title} />
            <meta property="twitter:description" content={description} />
            {image && <meta property="twitter:image" content={`${deploy}/${image}`} />}
            {!image && <meta property="twitter:image" content={`${deploy}/og_image.jpg`} />}

            <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
            <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
            <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
            <link rel="manifest" href="/site.webmanifest" />
        </Head>
    );
}
