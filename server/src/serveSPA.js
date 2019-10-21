const express = require("express")
const path = require("path")
const app = require("./app")

function serveSpa() {
    // serve static assets normally
    app.use(express.static(path.resolve(__dirname, "../app-build")))

    // handle every other route with index.html, which will contain
    // a script tag to your application's JavaScript file(s).
    app.get("*", function(request, response) {
        response.sendFile(path.resolve(__dirname, "../app-build/index.html"))
    })
}

module.exports = serveSpa
