const serveSpa = require("./src/serveSPA")
const setUpAPIs = require("./src/api")

// setups
setUpAPIs()
serveSpa()

// accepts traffic
const port = process.env.PORT || 8080
const app = require("./src/app")
app.listen(port)
console.log("server started on port " + port)
