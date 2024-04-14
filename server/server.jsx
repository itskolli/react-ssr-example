import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();
console.log(path.resolve(__dirname, "../", "dist"));

fs.readdir('/var/task', (err, files) => {
  if(err) {
    console.log("err", err);
    return;
  }
  files.forEach(file => {
    // get the details of the file 
    let fileDetails = fs.lstatSync(path.resolve(directory, file));
    // check if the file is directory 
    if (fileDetails.isDirectory()) {
      console.log('Directory: ' + file);
    } else {
      console.log('File: ' + file);
    }
  });
});

app.use(
  express.static("./.amplify-hosting/static", { maxAge: "30d" })
);


app.get("/", (req, res) => {
  //fs.readFile(path.resolve(__dirname, "../../", "static/index.html"), "utf8", (err, data) => {
    // if (err) {
    //   console.error(err);
    //   return res.status(500).send("An error occurred");
    // }

    const pathInfo = path.resolve(__dirname);

    const data = `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <title>SSR App</title>
    </head>
    
    <body>
      <div id="root"></div>
      <p>${pathInfo}</p>
      <script src="bundle.js"></script>
    </body>
    
    </html>`;

    return res.send(
      data.replace(
        '<div id="root"></div>',
        `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
      )
    );
  //});
});


app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
