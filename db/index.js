const pgp = require("pg-promise")();
if (process.env.NODE_ENV === "development") {
  require("dotenv").config();
}
const connection = pgp({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = connection;
