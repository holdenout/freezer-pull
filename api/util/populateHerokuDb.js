require("dotenv").config();

const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");
const {items} = require("./sampleFoodData.json");

/* Populate database */
const initDb = () => {
  // Create db connection
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
  });

  // Build sql queries
  const queries = {
    createFoodItems: `CREATE TABLE IF NOT EXISTS food_items (
      sku INT UNSIGNED NOT NULL PRIMARY KEY,
      name VARCHAR(50) NOT NULL,
      code VARCHAR(7) NOT NULL,
      category VARCHAR(20) DEFAULT 'misc',
      inner_pack TINYINT UNSIGNED DEFAULT 1,
      par TINYINT UNSIGNED DEFAULT 1,
      active BOOLEAN DEFAULT false
    );`,
    insertValue: "INSERT INTO food_items SET ?;",
    createPulls: `CREATE TABLE IF NOT EXISTS pulls (
      id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
      pull_date TIMESTAMP NOT NULL,
      user VARCHAR(15) DEFAULT 'unknownUser'
    );`,
    createFoodItemPull: `CREATE TABLE IF NOT EXISTS food_item_pull (
      pull_id INT UNSIGNED NOT NULL,
      food_item_sku SMALLINT UNSIGNED NOT NULL,
      carryover TINYINT UNSIGNED NOT NULL,
      pulled TINYINT UNSIGNED NOT NULL,
      PRIMARY KEY(pull_id, food_item_sku)
    );`,
    createUsers: `CREATE TABLE IF NOT EXISTS users (
      username VARCHAR(15) NOT NULL PRIMARY KEY,
      password CHAR(60) NOT NULL
    );`,
  };

  // Execute db operations
  connection.connect((err) => {
    // Initialize db connection
    if (err) throw err;
    console.log("Connected to database.");

    // Create tables
    connection.query(queries.createFoodItems, (err) => {
      if (err) throw err;
      console.log("Created `food_items` table.");
    });

    connection.query(queries.createPulls, (err) => {
      if (err) throw err;
      console.log("Created `pulls` table.");
    });

    connection.query(queries.createFoodItemPull, (err) => {
      if (err) throw err;
      console.log("Created `food_item_pull` table.");
    });

    connection.query(queries.createUsers, (err) => {
      if (err) throw err;
      console.log("Created `users` table.");
    });

    // Insert sample food info
    items.forEach((item) => {
      connection.query(queries.insertValue, item, (err) => {
        if (err) throw err;
        console.log("Added sample food_item.");
      });
    });

    // End connection
    connection.end();
  });
};

const rl = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question(
  "If you would like to clear the database, that must be done manually. " +
    "This will not overwrite anything. Continue?\n(Enter y for yes) ",
  (answer) => {
    if (answer.toLowerCase() !== "y") {
      rl.close();
      console.log("Halted");
    } else {
      initDb();
    }
  }
);
