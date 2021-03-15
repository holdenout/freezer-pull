const Pull = require("../models/pullsModel.js");
const FoodItemPull = require("../models/foodItemPullModel.js");

exports.executePull = async (req, res) => {
  let pull_id = await new Promise((resolve) => {
    Pull.create((err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error occurred while creating pull entry."
        });
        reject(null);
      }

      resolve(data.insertId);
    });
  });

  if (!pull_id) return;

  // create nested array of insert values
  const pullData = req.body.pullData.map(({sku, carryover, pull}) => {
    return [pull_id, sku, carryover, pull];
  });

  FoodItemPull.addPulledFood(pullData, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error ocurred while inserting food item pull info."
      });
    }

    res.status(201).send(data);
  });
};
