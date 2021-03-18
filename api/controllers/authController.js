const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const db = require("../models/db.js");
const config = require("../config/authConfig.js");
const User = require("../models/userModel.js");

exports.signUp = (req, res) => {
  User.create(
    {
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 8),
    },
    (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error ocurred while creating new user.",
        });
        return;
      }

      res.status(201).send({
        message: "User successfully created!",
      });
    }
  );
};

exports.signIn = (req, res) => {
  User.getByName(req.body.username, (err, user) => {
    if (err) {
      res.status(500).send({
        message: "Error retrieving user info.",
      });
      return;
    }

    if (!user) {
      res.status(404).send({
        message: "User not found",
      });
      return;
    }

    // check for correct password
    const isCorrectPassword = bcrypt.compareSync(
      req.body.password,
      user.password
    );

    if (!isCorrectPassword) {
      res.status(401).send({
        accessToken: null,
        message: "Invalid password.",
      });
      return;
    }

    const token = jwt.sign({username: user.username}, config.secret, {
      expiresIn: "3h",
    });

    res.status(200).send({
      username: user.username,
      accessToken: token,
    });
  });
};
