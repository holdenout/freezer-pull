const Food = require("../models/foodModel.js");

exports.getAll = (req, res) => {
  Food.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || "Error ocurred while retrieving food."
      });
      return;
    }

    res.status(200).send(data);
  });
};

exports.getBySku = (req, res) => {
  const sku = req.params.foodSku;
  Food.getBySku(sku, (err, data) => {
    if (err) {
      if (err.errType === "notFound") {
        res.status(404).send({
          message: `Food with SKU ${sku} not found.`,
        });
      } else {
        res.status(500).send({
          message: `Error retrieving food with SKU ${sku}`,
        });
      }

      return;
    }

    res.status(200).send(data);
  });
};
