import React from "react";
import ReactDOMServer from "react-dom/server";

import Data from "./stores/Data.js";

const dataStore = new Data();

import App from "./components/App/App";

function template({ css, js }) {
  console.log("Rendering", "css", css); // ['styles.[hash].css']
  console.log("Rendering", "js", js); //  ['app.[hash].js']
  const appHtml = ReactDOMServer.renderToString(<App dataStore={dataStore} />);
  const publicPath = "";
  return `
  <!doctype html>
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
      <meta name="theme-color" content="#000000">
      <!--
          manifest.json provides metadata used when your web app is added to the
          homescreen on Android. See https://developers.google.com/web/fundamentals/engage-and-retain/web-app-manifest/
        -->
      <link rel="manifest" href="${publicPath}/manifest.json">
      <link rel="shortcut icon" href="${publicPath}/favicon.ico">
      <link href="https://fonts.googleapis.com/css?family=PT+Sans" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Varela+Round" rel="stylesheet">
      <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css?family=Hammersmith+One" rel="stylesheet">
      <link href="https://fonts.googleapis.com/icon?family=Material+Icons"
      ${css
        .map(fileName => `<link rel="stylesheet" href="${fileName}" />`)
        .join("\n")}
      <title>Palette Town</title>
    </head>
    <body>
      <div id="root">${appHtml}</div>
      ${js.map(fileName => `<script src="${fileName}"></script>`).join("\n")}
    </body>
  </html>
  `;
}

export default data => {
  const entryPointToRender = data.webpackStats.compilation.entrypoints.index;
  const entryPointToRenderVendor =
    data.webpackStats.compilation.entrypoints.vendor;
  const jsFilesToRender = []
    .concat(
      ...[
        ...entryPointToRenderVendor.chunks.map(({ files }) => files),
        ...entryPointToRender.chunks.map(({ files }) => files)
      ]
    )
    .filter(file => file.match(/\.js$/));
  const cssFilesToRender = []
    .concat(...entryPointToRender.chunks.map(({ files }) => files))
    .filter(file => file.match(/\.css$/));

  return template({ css: cssFilesToRender, js: jsFilesToRender, ...data });
};
