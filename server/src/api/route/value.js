const express = require("express")
const router = express.Router()
const authd = require("../../middleware/check-auth")

router.get("/value", (req, res) => {
    res.send(`${Math.ceil(Math.random() * 10)} is value fetched from API.`)
})

router.get("/protected", authd, (req, res) => {
    res.send("protected data")
})

module.exports = router
