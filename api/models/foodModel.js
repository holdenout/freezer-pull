const db = require("./db.js");

const Food = ({name, code, category, inner_pack, par}) => {
  name = name;
  code = code;
  category = category;
  inner_pack = inner_pack;
  par = par;
};

// get all
Food.getAll = (req, res) => {
  db.query("SELECT * FROM food_items", (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
}

// get one by id
Food.getById = (req, res) => {
  db.query("SELECT * FROM food_items WHERE id = ?", req.params.foodId, (err, data) => {
    if (err) throw err;
    res.status(200).send(data);
  });
}

module.exports = Food;
