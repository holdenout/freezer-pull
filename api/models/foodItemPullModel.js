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
      }

      console.log("Added food pull data.");
      res(null, dbRes);
    }
  );
};

module.exports = FoodItemPull;
