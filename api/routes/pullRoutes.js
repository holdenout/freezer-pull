const express = require("express");
const router = express.Router();
const Pull = require("../controllers/pullsController.js");
const authJwt = require("../middleware/authJwt.js");

// create
router.post("/new", authJwt.verifyToken, Pull.executePull);

module.exports = router;
