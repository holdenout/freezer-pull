const express = require("express");
const router = express.Router();
const user = require("../controllers/authController.js");
const verifySignUp = require("../middleware/verifySignUp.js");
const authJwt = require("../middleware/authJwt.js");

router.use((req, res, next) => {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.post(
  "/signup",
  [
    verifySignUp.validateUsernameFormat,
    verifySignUp.validatePasswordFormat,
    verifySignUp.checkDuplicateUsername,
  ],
  user.signUp
);

router.post("/login", user.login);

router.get("/verifyLogin", authJwt.verifyToken, user.verifyLoggedIn);

module.exports = router;
