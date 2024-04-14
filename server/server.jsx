import path from "path";
import fs from "fs";

import React from "react";
import ReactDOMServer from "react-dom/server";
import express from "express";

import App from "../src/App";

const PORT = process.env.PORT || 3000;
const app = express();
console.log(path.resolve(__dirname, "../", "dist"));
app.use(
  express.static(path.resolve(__dirname, "../", "dist"), { maxAge: "30d" })
);


app.get("/", (req, res) => {
  //fs.readFile(path.resolve(__dirname, "../../", "static/index.html"), "utf8", (err, data) => {
    // if (err) {
    //   console.error(err);
    //   return res.status(500).send("An error occurred");
    // }

    const data = `<!DOCTYPE html>
    <html>
    
    <head>
      <meta charset="utf-8" />
      <title>SSR App</title>
    </head>
    
    <body>
      <div id="root"></div>
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
