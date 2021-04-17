require("dotenv").config();

const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const foodRouter = require("./api/routes/foodRoutes.js");
const pullRouter = require("./api/routes/pullRoutes.js");
const authRouter = require("./api/routes/authRoutes.js");

const app = express();

// parse requests of content-type: application/json
app.use(bodyParser.json());

// parse requests of content-type: application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: true}));

// intentional slowdown to display loading spinners
app.use((req, res, next) =>
  setTimeout(next, parseInt(process.env.ARTIFICIAL_DELAY) || 1000)
);

// enable CORS for react dev environment
// not needed if client is served from backend
if (process.env.NODE_ENV !== "production") {
  app.use(cors({origin: "http://localhost:3000"}));
}

app.use("/food", foodRouter);
app.use("/pull", pullRouter);
app.use("/auth", authRouter);

if (process.env.NODE_ENV === "production") {
  const buildPath = "/client/build";
  app.use(express.static(path.join(__dirname, buildPath)));
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, buildPath, "index.html"));
  });
}

// set port, listen for requests
const port = parseInt(process.env.PORT) || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
