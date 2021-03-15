const db = require("./db.js");

const Food = ({name, code, category, inner_pack, par}) => {
  name = name;
  code = code;
  category = category;
  inner_pack = inner_pack;
  par = par;
};

// get all
Food.getAll = (res) => {
  db.query(
    `SELECT sku, name, code, category, inner_pack AS innerPack, par
     FROM food_items WHERE active=true;`,
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        res(err, null);
        return;
      }

      console.log("All active food: ", data, "\n");
      res(null, data);
    }
  );
};

// get one by SKU
Food.getBySku = (sku, res) => {
  db.query(
    `SELECT sku, name, code, category, inner_pack AS innerPack, par
     FROM food_items WHERE sku = ?;`,
    sku,
    (err, data) => {
      if (err) {
        console.log("Error: ", err);
        res(err, null);
        return;
      }

      if (data.length) {
        console.log("Found food: ", data[0], "\n");
        res(null, data);
        return;
      }

      res({errType: "notFound"}, null);
    }
  );
};

module.exports = Food;
