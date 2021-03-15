const db = require("./db.js");

const Pull = {};

// create
Pull.create = (res) => {
  db.query(
    "INSERT INTO pulls (pull_date) VALUE (TIMESTAMP(NOW()));",
    (err, data) => {
      if (err) {
        console.log("Error: ", error);
        res(err, null);
      }

      console.log("Pull created.");
      res(null, data);
    }
  );
};

module.exports = Pull;
