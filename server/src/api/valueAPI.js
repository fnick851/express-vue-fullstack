const app = require("../app")

function valueAPI() {
    app.get("/api/value", (req, res) => {
        return res.send(`${Math.ceil(Math.random() * 10)} is value fetched from API.`)
    })
}

module.exports = valueAPI
