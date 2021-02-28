const express = require("express");
const router = express.Router();
const db = require("../models/db.js");
const Food = require("../models/foodModel.js")

// get all
router.get("/all", Food.getAll);

// get one by id
router.get("/:foodId", Food.getById);

module.exports = router;
