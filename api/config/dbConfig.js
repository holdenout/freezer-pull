module.exports = {
  HOST: process.env.DB_HOST || "localhost",
  USER: process.env.DB_USER || "test",
  PASSWORD: process.env.DB_PASSWORD || "password",
  DB: process.env.DB_DB_NAME || "freezer_pull",
};
