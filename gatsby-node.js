const { createRemoteFileNode } = require("gatsby-source-filesystem");

exports.createResolvers = ({ actions, cache, createNodeId, createResolvers, store, reporter }) => {
    const { createNode } = actions;

    createResolvers({
        GitHub_User: {
            avatarFile: {
                type: "File",
                resolve(source) {
                    return createRemoteFileNode({
                        url: source.avatarUrl,
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    });
                },
            },
        },
        GitHub_Repository: {
            openGraphImageFile: {
                type: "File",
                resolve(source) {
                    return createRemoteFileNode({
                        url: source.openGraphImageUrl,
                        store,
                        cache,
                        createNode,
                        createNodeId,
                        reporter,
                    });
                },
            },
        },
    });
};
