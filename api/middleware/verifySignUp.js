const db = require("../models/db.js");
const User = require("../models/userModel.js");

const validateUsernameFormat = (req, res, next) => {
  const newUsername = req.body.username;

  const isValid =
    newUsername.length >= 3 &&
    newUsername.length <= 15 &&
    newUsername.search(/^[A-Za-z]\w*$/) > -1;

  if (!isValid) {
    res.status(400).send({
      message: "Invalid username",
    });
    return;
  } else if (newUsername.toLowerCase() === "appropriate") {
    res.status(400).send({
      message: `The username '${newUsername}' is inappropriate because only I am allowed to make jokes that bad`,
    });
    return;
  } else if (newUsername.toLowerCase() === "inappropriate") {
    res.status(400).send({
      message: `Oh you think you're clever, do you? Well too bad. You can't use '${newUsername}'`,
    });
    return;
  }

  next();
};

const validatePasswordFormat = (req, res, next) => {
  const newPassword = req.body.password;

  const isValid =
    newPassword.length >= 5 &&
    newPassword.length <= 25 &&
    newPassword.search(/^[A-Za-z0-9@$!%*#?&]*$/) > -1;

  if (!isValid) {
    res.status(400).send({
      message: "Invalid password",
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
  validateUsernameFormat: validateUsernameFormat,
  validatePasswordFormat: validatePasswordFormat,
  checkDuplicateUsername: checkDuplicateUsername,
};

module.exports = verifySignup;
