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
        console.log("\n\n=========\n  Error  \n=========\n", err, "\n\n");
        res(err, null);
        return;
      }

      console.log("-> Active food items sent");
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
        console.log("\n\n=========\n  Error  \n=========\n", err, "\n\n");
        res(err, null);
        return;
      }

      if (data.length) {
        console.log("-> Found food: ", data[0]);
        res(null, data);
        return;
      }

      res({errType: "notFound"}, null);
    }
  );
};

module.exports = Food;
