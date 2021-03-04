const express = require("express");
const router = express.Router();
const db = require("../models/db.js");
const Food = require("../models/foodModel.js")

// get all
router.get("/all", Food.getAll);

// get one by SKU
router.get("/:foodSku", Food.getBySku);

module.exports = router;
