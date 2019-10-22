const express = require("express")
const router = express.Router()
const user = require("./routes/user")
const value = require("./routes/value")
const add = require("./routes/add")

router.use(user)
router.use("/api", value)
router.use("/api", add)

module.exports = router
