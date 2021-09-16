import React from "react";
import Image from "next/image";

export function WhichImage(props) {
    const image = props.image;
    const classes = props.classes;
    if (!image.includes("https://www.notion.so/image/")) {
        return (
            <Image
                className={classes.cardMedia}
                title="Blog Image"
                src={image}
                alt=""
                layout="intrinsic"
                width={373}
                height={200}
                loading="lazy"
            />
        );
    }
    return (
        <img
            className={classes.cardMedia}
            title="Blog Image"
            src={image + "&width=400"}
            alt=""
            style={{
                width: "100%",
            }}
            loading="lazy"
        />
    );
}
