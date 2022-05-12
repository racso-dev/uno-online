const db = require('../index');
const { v4: uuidv4 } = require('uuid');

const create = (user) => {
  return db.connection.one(
    `INSERT INTO "${db.tables.USERS}" (id, email, username, password) VALUES ($1, $2, $3, $4) RETURNING *`,
    [uuidv4(), user.email, user.username, user.hash]
  );
};

const findByEmail = (email) => {
  return db.connection.oneOrNone(
    `SELECT * FROM "${db.tables.USERS}" WHERE email = $1`,
    [email]
  );
};

const findById = (id) => {
  return db.connection.oneOrNone(
    `SELECT * FROM "${db.tables.USERS}" WHERE id = $1`,
    [id]
  );
};

const update = (user) => {
  return db.connection.one(
    `UPDATE "${db.tables.USERS}" SET email = $1, password = $2, username = $3 WHERE id = $4 RETURNING *`,
    [user.email, user.password, user.username, user.id]
  );
};

const deleteOne = (id) => {
  return db.connection.none(`DELETE FROM "${db.tables.USERS}" WHERE id = $1`, [
    id,
  ]);
};

module.exports = {
  create,
  findByEmail,
  findById,
  update,
  deleteOne,
};
