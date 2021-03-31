const express = require("express");
const router = express.Router();
const food = require("../controllers/foodController.js");
const authJwt = require("../middleware/authJwt.js");

// get all
router.get("/all", authJwt.verifyToken, food.getAll);

// get one by SKU
router.get("/:foodSku", authJwt.verifyToken, food.getBySku);

module.exports = router;
