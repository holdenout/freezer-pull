const db = require("./db.js");

const User = ({username, password}) => {
  username = username;
  password = password;
};

User.create = (user, res) => {
  db.query(
    "INSERT INTO users SET ?;",
    (err, data) => {
      if (err) {
        console.log("Error: ", error);
        res(err, null);
      }

      console.log("User created.");
      res(null, data);
    }
  );
};

module.exports = User;
