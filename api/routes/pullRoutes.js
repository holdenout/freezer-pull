const express = require("express");
const router = express.Router();
const Pull = require("../controllers/pullsController.js");

// create
router.post("/new", Pull.executePull);

module.exports = router;
