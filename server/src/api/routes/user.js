const express = require("express")
const router = express.Router()
const login = require("../../controller/user")

router.post("/signup", (req, res) => {
    return res.send("Not implemented yet.")
})

router.post("/login", login)

module.exports = router
