const db = require("./db.js");

const Pull = {};

// create
Pull.create = (user, res) => {
  db.query(
    "INSERT INTO pulls (pull_date, user) VALUE (TIMESTAMP(NOW()), ?);",
    [user],
    (err, data) => {
      if (err) {
        console.log("Error: ", error);
        res(err, null);
        return;
      }

      console.log("Pull created.");
      res(null, data);
    }
  );
};

module.exports = Pull;
