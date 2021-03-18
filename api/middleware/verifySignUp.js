const db = require("../models/db.js");
const User = require("../models/userModel.js");

const validateFormat = (req, res, next) => {
  const newUsername = req.body.username;

  const isValid =
    newUsername.length &&
    newUsername.length <= 15 &&
    newUsername.search(/^[A-Za-z]\w*$/) > -1;

  if (!isValid) {
    res.status(400).send({
      message: "Invalid characters",
    });
    return;
  }

  next();
};

const checkDuplicateUsername = (req, res, next) => {
  const newUsername = req.body.username;

  User.getByName(newUsername, (err, data) => {
    if (!err) {
      res.status(400).send({
        message: "Username already exists.",
      });
      return;
    }

    next();
  });
};

const verifySignup = {
  isValid: isValid,
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignup;
