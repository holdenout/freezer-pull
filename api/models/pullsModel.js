const db = require("./db.js");

const Pull = {};

// create
Pull.create = (req, res) => {
  db.query("INSERT INTO pulls (pull_DATE) VALUE (TIMESTAMP(NOW()));", (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  })
}

module.exports = Pull;
