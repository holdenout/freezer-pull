const Pull = require("../models/pullsModel.js");
const FoodItemPull = require("../models/foodItemPullModel.js");

exports.executePull = async (req, res) => {
  let pull_id = await new Promise((resolve) => {
    Pull.create(req.username, (err, data) => {
      if (err) {
        res.status(500).send({
          message: err.message || "Error occurred while creating pull entry.",
        });
        reject(null);
      }

      resolve(data.insertId);
    });
  });

  if (!pull_id) return;

  const verifyNumberEntry = (num) => {
    const parsedNum = parseInt(num);
    if (isNaN(parsedNum)) return 0;
    else if (parsedNum < 0) return 0;
    else if (parsedNum > 255) return 255;
    else return 0;
  };

  // create nested array of insert values
  //   -arrays required for mysql module parsing
  const cleanedPullData = req.body.pullData.map(({sku, carryover, pull}) => {
    return [
      pull_id,
      sku,
      verifyNumberEntry(carryover),
      verifyNumberEntry(pull),
    ];
  });

  FoodItemPull.addPulledFood(cleanedPullData, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error ocurred while inserting food item pull info.",
      });
    }

    res.status(201).send(data);
  });
};

exports.getFoodPullInfo = (req, res) => {
  const sku = parseInt(req.query.sku);
  const numberRequested = parseInt(req.query.numberRequested);

  FoodItemPull.getFoodPullInfo(sku, numberRequested, (err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Error ocurred while retrieving food item pull info.",
      });
      return;
    }

    console.log("Sending food pull info");
    res.status(200).send(data);
  });
};
