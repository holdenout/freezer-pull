const db = require("./db.js");

const Pull = {};

// create
Pull.create = (req, res) => {
  db.query(
    "INSERT INTO pulls (pull_DATE) VALUE (TIMESTAMP(NOW()));",
    (err, data) => {
      if (err) throw err;

      // get id of pull
      const {insertId: pull_id} = data;

      // create nested area of insert values
      const pullData = req.body.pullData.map(({sku, carryover, pull}) => {
        return [pull_id, sku, carryover, pull];
      });

      db.query(
        "INSERT INTO food_item_pull VALUES ?",
        [pullData],
        (err, data) => {
          if (err) throw err;
          res.status(201).send(data);
        }
      );
    }
  );
};

module.exports = Pull;
