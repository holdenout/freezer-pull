const express = require("express");
const router = express.Router();
const Pull = require("../controllers/pullsController.js");
const authJwt = require("../middleware/authJwt.js");

// create
router.post("/new", authJwt.verifyToken, Pull.executePull);

router.get("/foodPullInfo", authJwt.verifyToken, Pull.getFoodPullInfo);

module.exports = router;
