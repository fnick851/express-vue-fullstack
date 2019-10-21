const express = require("express");
const router = express.Router();
const value = require("./routes/value");
const add = require("./routes/add");

router.use("/api", value);
router.use("/api", add);

module.exports = router;
