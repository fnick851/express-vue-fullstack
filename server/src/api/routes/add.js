const express = require("express");
const router = express.Router();

router.post("/add", (req, res) => {
  const sum = req.body["numbers"].reduce((a, b) => a + b);
  res.status(200).json({
    result: sum
  });
});

module.exports = router;
