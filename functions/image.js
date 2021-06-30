const jimp = require("jimp");

exports.handler = async event => {
    const { url, w = 1000, q = 75 } = event.queryStringParameters;
    const width = parseInt(w);
    const quality = parseInt(q);

    const imageUrl = url.startsWith("/")
        ? `${process.env.URL || "http://localhost:8888"}${url}`
        : url;
    const image = await jimp.read(imageUrl);

    image.resize(width, jimp.AUTO).quality(quality);

    const imageBuffer = await image.getBufferAsync(image.getMIME());

    return {
        statusCode: 200,
        headers: {
            "Content-Type": image.getMIME(),
        },
        body: imageBuffer.toString("base64"),
        isBase64Encoded: true,
    };
};
