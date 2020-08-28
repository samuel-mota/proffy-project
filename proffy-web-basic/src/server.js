// same as require('express')();
const express = require("express");
const server = express();

const {
  pageLanding,
  pageStudy,
  pageGiveClasses,
  saveClasses
} = require("./pages");

const nj = require("nunjucks");
nj.configure("src/views", {
  express: server,
  noCache: true,
});

// inicio configuracao do servidor
server
  // data from req.body
  .use(express.urlencoded({ extended: true }))
  // define standard folder for static files (css, scripts, images)
  .use(express.static("public"))
  //routes
  .get("/", pageLanding)
  .get("/study", pageStudy)
  .get("/give-classes", pageGiveClasses)
  .post("/save-classes", saveClasses)
  .listen(5500); // start server