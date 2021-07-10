import React from "react";
import { useStyles } from "../styles/styles";
import BlogForm from "../components/BlogForm";

// This file is to make netlify recognise my forms
// https://www.netlify.com/blog/2017/07/20/how-to-integrate-netlifys-form-handling-in-a-react-app/

export default function Home() {
    const classes = useStyles();

    return <div>{BlogForm(classes)}</div>;
}
