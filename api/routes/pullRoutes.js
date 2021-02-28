const express = require("express");
const router = express.Router();
const db = require("../models/db.js");
const Pull = require("../models/pullsModel.js");

// create
router.post("/new", Pull.create);

module.exports = router;
