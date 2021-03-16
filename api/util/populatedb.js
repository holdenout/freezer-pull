const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

const {items} = require("./sampleFoodData.json");

/* Create and populate database */
const initDb = () => {
  // Create db connection
  const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
  });

  // Build sql queries
  const queries = {
    dropdb: `DROP DATABASE IF EXISTS ${dbConfig.DB};`,
    createdb: `CREATE DATABASE IF NOT EXISTS ${dbConfig.DB};`,
    use: `USE ${dbConfig.DB};`,
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
      pull_date TIMESTAMP NOT NULL
    );`,
    createFoodItemPull: `CREATE TABLE IF NOT EXISTS food_item_pull (
      pull_id INT UNSIGNED NOT NULL,
      food_item_sku SMALLINT UNSIGNED NOT NULL,
      carryover TINYINT UNSIGNED NOT NULL,
      pulled TINYINT UNSIGNED NOT NULL,
      PRIMARY KEY(pull_id, food_item_sku)
    );`,
    createUsers: `CREATE TABLE IF NOT EXISTS users (
      id INT UNSIGNED NOT NULL PRIMARY KEY AUTO_INCREMENT,
      username VARCHAR(15) NOT NULL,
      password VARCHAR(25) NOT NULL
    );`,
    createDefaultUser: `INSERT INTO users (username, password) VALUES (
      default, password
    );`
  };

  // Execute db operations
  connection.connect((err) => {
    // Initialize db connection
    if (err) throw err;
    console.log("Connected to database.");

    // Drop db if exists
    connection.query(queries.dropdb, (err, res) => {
      if (err) throw err;
      if (res.affectedRows > 0) {
        console.log(`Database ${dbConfig.DB} dropped.`);
      }
    });

    // Create db
    connection.query(queries.createdb, (err, res, fields) => {
      if (err) throw err;
      console.log("Database created.");
    });

    // Select db for use
    connection.query(queries.use, (err) => {
      if (err) throw err;
      console.log(`Using \`${dbConfig.DB}\`.`);
    });

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

    // Add default user
    connection.query(queries.createDefaultUser, (err) => {
      if (err) throw err;
      console.log("Created default user");
    });

    // End connection
    connection.end();
  });
};

// Initial prompts
const prompt = async () => {
  const rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const input = await new Promise((resolve) => {
    // Prompt if mysql user info is correct
    rl.question(
      "Is your mysql user, password, and db name info in .env " +
        "correct and granted sufficient permissions?\n(Enter y for yes) ",
      (answer) => {
        if (answer.toLowerCase() !== "y") {
          rl.close();
          resolve(false);
        } else {
          // Warn that database may be deleted
          rl.question(
            "\n###########\n# WARNING #\n###########\n" +
              `If you already have a database named ${dbConfig.DB}, this ` +
              "WILL OVERWRITE IT! Is this okay?\n(Enter y for yes) ",
            (answer) => {
              rl.close();
              answer.toLowerCase() === "y" ? resolve(true) : resolve(false);
            }
          );
        }
      }
    );
  });
  return input;
};

prompt().then((isReady) => (isReady ? initDb() : console.log("Halted")));
