const pgp = require('pg-promise')();
const tables = require('../config/tables');

if (process.env.NODE_ENV === 'development') {
  require('dotenv').config();
}
const connection = pgp({
  connectionString: process.env.DATABASE_URL,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.NODE_ENV === 'development' ? false : true,
  sslRejectUnauthorized: false,
});

module.exports = { connection, tables };
