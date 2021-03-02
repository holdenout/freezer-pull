const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const foodRouter = require("./api/routes/foodRoutes.js");
const pullRouter = require("./api/routes/pullRoutes.js");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// enable CORS
app.use(cors());

app.get("/", (req, res) => {
  res.json({message: "freezer-pull app running"});
});

app.use("/food", foodRouter);
app.use("/pull", pullRouter);

// set port, listen for requests
app.listen(4000, () => {
  console.log("Server is running on port 4000.");
});
