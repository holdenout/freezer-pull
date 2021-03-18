const bcrypt = require("bcryptjs");
const db = require("../models/db.js");
const config = require("../config/authConfig.js");
const User = require("../models/userModel.js");

exports.signUp = (req, res) => {
  User.create({
    username: req.body.username,
    password: bcrypt.hashSync(req.body.password, 8),
  }, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error ocurred while creating new user.",
      });
      return;
    }

    res.status(201).send({
      message: "User successfully created!",
    });
  });
};
