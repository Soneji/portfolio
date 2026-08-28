---
title: "Uploading files using FormData and Axios in NodeJS"
slug: "Uploading-files-using-FormData-and-Axios-in-NodeJS"
date: "2021-10-22"
emoji: "📝"
cover: "/blog/Uploading-files-using-FormData-and-Axios-in-NodeJS/cover.jpg"
preview: "Hey everyone!! I indeed managed to migrate my life to notion! I'll probably write a little about my notion setup soon. F"
---

![](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/40b79211-1ae6-427f-8b3f-85216732792a/Untitled.png)

📤

# Uploading files using FormData and Axios in NodeJS

Hey everyone!!

I indeed managed to migrate my life to notion! I'll probably write a little about my notion setup soon. For now a quick article about sending FormData and files using axios and NodeJS.

Oftentimes this will be useful when working with an API that allows you to upload files, or if you want to emulate form submissions. You can tell because they will require you to POST your data with the `multipart/form-data` content-type header.

We can use axios to achieve this. It’s a really useful node library that lets us make http requests, without having to think that much about the unimportant details.

Let’s grab the modules we need from npm with

```
npm i axios form-data
```

Then we'll import the modules we need

```
const axios = require('axios');
const FormData = require('form-data');
```

Next we need to setup the FormData. It's important to always include a filename if you are uploading a file. The `file` variable can either be a buffer, which I recommend for binary data, or a string (using something like `fs.readFileSync`) which I recommend for text data.

```
const form = new FormData();
form.append("sessionid", sessionid);
form.append("caption", caption);
form.append("file", file, filename);
```

Then our Axios call will be as follows.

```
await axios("https://api.example.com/form/upload", {
  method: "POST",
  headers: form.getHeaders(),
  data: form,
});
```

It's important to include the headers that the FormData object makes for us. That way the headers like `'content-type': 'multipart/form-data; boundary=---01110101011110101000101'` are added for us. If you need to add your own headers, you could use the ES6 spread syntax `{ ...form.getHeaders(), key: value }`

Don't forget to wrap the whole thing in a `try/catch` block!
