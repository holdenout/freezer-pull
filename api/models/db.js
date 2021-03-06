const mysql = require("mysql");
const dbConfig = require("./dbConfig.js");

// Create db connection
const connection = mysql.createConnection({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

// Open db connection
connection.connect((error) => {
  if (error) throw error;
  console.log("Successfully connected to database.");
});

module.exports = connection;
