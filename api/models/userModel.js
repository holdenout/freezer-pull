const db = require("./db.js");

const User = ({username, password}) => {
  username = username;
  password = password;
};

User.create = (user, res) => {
  db.query(
    "INSERT INTO users SET ?;",
    user,
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

User.getByName = (name, res) => {
  db.query(
    "SELECT * FROM users WHERE LOWER(username) LIKE LOWER('?');",
    name,
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        res(err, null);
        return;
      }

      if (data.length) {
        console.log("Found user: ", name);
        res(null, data);
        return;
      }

      res({errType: "notFound"}, null);
    }
  );
};

module.exports = User;
