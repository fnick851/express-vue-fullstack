const app = require("../app")

function valueAPI() {
    app.get("/api/value", (req, res) => {
        return res.send("Value from API is 10.")
    })
}

module.exports = valueAPI
