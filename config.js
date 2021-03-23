const config = {
    position: "software and electronic engineer",
    socialMedia: [
        // name must match a file in /src/assets/svgs
        { name: "github", url: "https://github.com/soneji" },
        { name: "mail", url: "mailto:dhaval@soneji.xyz" },
    ],

    // add to the filters below to remove any repositories based on field
    // (from github:repository) and value (the value your chosen field is)

    reposFilter: [
        { field: "name", value: "harrowhealthmatters.com" },
        // { field: "name", value: "ctf" },
    ],
    contribFilter: [
        { field: "owner.login", value: "education" },
        // { field: "name", value: "ctf" },
    ],
};

export default config;
