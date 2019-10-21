const app = require("../app")

function addAPI() {
    app.post("/api/add", (req, res) => {
        const sum = req.body["numbers"].reduce((a, b) => a + b)
        res.status(200).json({
            result: sum
        })
    })
}

module.exports = addAPI
