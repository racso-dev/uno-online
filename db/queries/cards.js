const db = require('../index');
const { v4: uuidv4 } = require('uuid');

const create = (user) => {
  return db.connection.one(
    `INSERT INTO "${db.tables.CARDS}" (id, email, password, username) VALUES ($1, $2, $3, $4) RETURNING *`,
    [uuidv4(), user.email, user.hash, user.username]
  );
};

const findById = (id) => {
  return db.connection.oneOrNone(
    `SELECT * FROM "${db.tables.CARDS}" WHERE id = $1`,
    [id]
  );
};

const updateOwner = (cardId, ownerId) => {
  return db.connection.one(
    `UPDATE "${db.tables.CARDS}" SET owner_id = $1 WHERE id = $2 RETURNING *`,
    [ownerId, cardId]
  );
};

const findAll = async () => {
  return await db.connection.manyOrNone(
    `SELECT label, color FROM "${db.tables.CARDS}"`
  );
};

const deleteOne = (id) => {
  return db.connection.none(`DELETE FROM "${db.tables.CARDS}" WHERE id = $1`, [
    id,
  ]);
};

module.exports = {
  create,
  findAll,
  findById,
  deleteOne,
};
