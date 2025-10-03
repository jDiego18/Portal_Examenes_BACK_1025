const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Backend inicializado correctamente 🚀");
});

module.exports = router;