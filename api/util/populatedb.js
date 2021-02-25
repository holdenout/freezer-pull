const mysql = require("mysql");
const dbConfig = require("../models/dbConfig.js");
const {items} = require("./sampleFoodData.json");

/* Create db connection */
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD
});

/* Create sql queries */
const queries = {
  createdb: "CREATE DATABASE IF NOT EXISTS freezer_pull_db;",
  use: "USE freezer_pull_db;",
  createFoodItems: `CREATE TABLE IF NOT EXISTS food_items (
    id SMALLINT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL,
    code VARCHAR(7) NOT NULL,
    category VARCHAR(20) DEFAULT 'misc',
    inner_pack TINYINT UNSIGNED DEFAULT 1,
    par TINYINT UNSIGNED DEFAULT 1
  );`,
  createPulls: `CREATE TABLE IF NOT EXISTS pulls (
    id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
    pull_date TIMESTAMP NOT NULL
  );`,
  createFoodItemPull: `CREATE TABLE IF NOT EXISTS food_item_pull (
    pull_id INT UNSIGNED NOT NULL,
    food_item_id SMALLINT UNSIGNED NOT NULL,
    carryover TINYINT UNSIGNED NOT NULL,
    pulled TINYINT UNSIGNED NOT NULL,
    PRIMARY KEY(pull_id, food_item_id)
  );`
};

/* Create database and tables */
const initDb = () => {
  connection.connect((err) => {
    if (err) throw err;
    console.log("Connected to database.");

    connection.query(queries.createdb, (err, res) => {
      if (err) throw err;
      console.log("Dababase created.");
    });

    connection.query(queries.use, (err) => {
      if (err) throw err;
      console.log("Using freezer_pull_db.");
    });

    connection.query(queries.createFoodItems, (err) => {
      if (err) throw err;
      console.log("Created food_items table.");
    });

    connection.query(queries.createPulls, (err) => {
      if (err) throw err;
      console.log("Created pulls table.");
    });

    connection.query(queries.createFoodItemPull, (err) => {
      if (err) throw err;
      console.log("Created food_item_pull table.");
    });

    connection.end();
  });
};

initDb();
