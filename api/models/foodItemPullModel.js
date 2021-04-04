const db = require("./db.js");

const FoodItemPull = {};

// Add food pull data to db
FoodItemPull.addPulledFood = (foodPullData, res) => {
  db.query(
    "INSERT INTO food_item_pull VALUES ?",
    [foodPullData],
    (err, dbRes) => {
      if (err) {
        console.log("Error: ", err);
        res(err, null);
        return;
      }

      console.log("Added food pull data.");
      res(null, dbRes);
    }
  );
};

FoodItemPull.getFoodPullInfo = (sku, numberRequested, res) => {
  db.query(
    `SELECT pulls.user, food_item_pull.*
     FROM pulls
     INNER JOIN food_item_pull
       ON pulls.id = food_item_pull.pull_id
       AND food_item_pull.food_item_sku = ?
     ORDER BY food_item_pull.pull_id
     LIMIT ?;`,
    [sku, numberRequested],
    (err, data) => {
      if (err) {
        console.log("Error:", err);
        res(err, null);
        return;
      }

      console.log("Retrieved pull data for sku:", sku);
      res(null, data);
    }
  );
};

module.exports = FoodItemPull;
