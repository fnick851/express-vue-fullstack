const express = require("express")
const router = express.Router()

router.get("/value", (req, res) => {
    res.send(`${Math.ceil(Math.random() * 10)} is value fetched from API.`)
})

module.exports = router
