const db = require('./index');

const create = (user) => {
  return db.one(
    `INSERT INTO "Users" (email, password, username) VALUES ($1, $2, $3) RETURNING *`,
    [user.email, user.hash, user.username]
  );
};

const findByEmail = (email) => {
  return db.oneOrNone(`SELECT * FROM "Users" WHERE email = $1`, [email]);
};

const findById = (id) => {
  return db.oneOrNone(`SELECT * FROM "Users" WHERE id = $1`, [id]);
};

const update = (user) => {
  return db.one(
    `UPDATE "Users" SET email = $1, password = $2, username = $3 WHERE id = $4 RETURNING *`,
    [user.email, user.password, user.username, user.id]
  );
};

const deleteOne = (id) => {
  return db.none(`DELETE FROM "Users" WHERE id = $1`, [id]);
};

module.exports = {
  create,
  findByEmail,
  findById,
  update,
  deleteOne,
};
