const express = require("express")
const router = express.Router()
const user = require("./route/user")
const value = require("./route/value")
const add = require("./route/add")

router.use(user)
router.use("/api", value)
router.use("/api", add)

module.exports = router
