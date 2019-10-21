const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const apiRoutes = require("./api/index");

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(apiRoutes);
// serve static assets normally
app.use(express.static(path.resolve(__dirname, "../client-build")));
// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../client-build/index.html"));
});

module.exports = app;
