require("dotenv").config()

const http = require("http")
const app = require("./src/app")

// accepts traffic
const server = http.createServer(app)
const port = process.env.PORT || 8080
server.listen(port)
console.log("server started on port " + port)
