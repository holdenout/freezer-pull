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
  db.query(
    `SELECT sku, name, code, category, inner_pack, par
     FROM food_items WHERE active=true;`,
    (err, data) => {
      if (err) throw err;
      const cleanedData = data.reduce((acc, curr) => {
        const {inner_pack: innerPack, ...rest} = curr;
        return acc.concat([{innerPack, ...rest}]);
      }, []);
      res.status(200).send(cleanedData);
    }
  );
};

// get one by SKU
Food.getBySku = (req, res) => {
  db.query(
    "SELECT * FROM food_items WHERE sku = ?;",
    req.params.foodSku,
    (err, data) => {
      if (err) throw err;
      res.status(200).send(data);
    }
  );
};

module.exports = Food;
