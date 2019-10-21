const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const httpMonitor = require("morgan");
const apiRoutes = require("./api/index");

const app = express();
process.env.NODE_ENV === "development" ? app.use(httpMonitor("dev")) : null;
app.use(
  bodyParser.urlencoded({
    extended: true
  })
);
app.use(bodyParser.json());
app.use(apiRoutes);
// serves SPA
app.use(express.static(path.resolve(__dirname, "../client-build")));
app.get("*", function(request, response) {
  response.sendFile(path.resolve(__dirname, "../client-build/index.html"));
});
// global error handling
app.use((req, res, next) => {
  const err = new Error("Not Found");
  err.status(404);
  next(err);
});
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

module.exports = app;
