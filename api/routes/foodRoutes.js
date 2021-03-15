const express = require("express");
const router = express.Router();
const food = require("../controllers/foodController.js");

// get all
router.get("/all", food.getAll);

// get one by SKU
router.get("/:foodSku", food.getBySku);

module.exports = router;
