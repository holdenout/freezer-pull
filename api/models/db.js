const mysql = require("mysql");
const dbConfig = require("../config/dbConfig.js");

// Create db connection
const pool = mysql.createPool({
  connectionLimit: dbConfig.CONNECTIONLIMIT,
  host: dbConfig.HOST,
  user: dbConfig.USER,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
});

module.exports = pool;
