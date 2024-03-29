const db = require("./db.js");

const User = ({username, password}) => {
  username = username;
  password = password;
};

User.create = (user, res) => {
  db.query("INSERT INTO users SET ?;", user, (err, data) => {
    if (err) {
      console.log("\n\n=========\n  Error  \n=========\n", err, "\n\n");
      res(err, null);
      return;
    }

    console.log("-> User created.");
    res(null, data);
  });
};

User.getByName = (name, res) => {
  db.query(
    "SELECT * FROM users WHERE LOWER(username) LIKE LOWER(?);",
    name,
    (err, data) => {
      if (err) {
        console.log("\n\n=========\n  Error  \n=========\n", err, "\n\n");
        res(err, null);
        return;
      }

      if (data.length) {
        console.log("-> Found user:", name);
        res(null, data[0]);
        return;
      }

      res({errType: "notFound"}, null);
    }
  );
};

module.exports = User;
