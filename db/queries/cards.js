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

const playerDraw = async (gameId, playerId, cardNumber, drawPile) => {
  const res = [];
  for (let i = 0; i < cardNumber; i++) {
    const gameCard = drawPile.pop();
    res.push(
      await db.connection.many(
        `UPDATE "${db.tables.GAMES_CARDS}" SET owner_id = $1, is_draw_pile = false, is_discarded = false WHERE card_id = $2 and game_id = $3 RETURNING *`,
        [playerId, gameCard.card_id, gameId]
      )
    );
  }
  return res;
};

// Get all cards of a user
const getAllCardsOfGameUser = async (userId, gameId) => {
  // First query the cards of the user
  const userGameCards = await db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.GAMES_CARDS}" WHERE user_id = $1 AND game_id = $2`,
    [userId, gameId]
  );
  const cards = await db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.CARDS}" WHERE id = ANY($1::uuid[])`,
    [userGameCards.map((gameCard) => gameCard.card_id)]
  );
  return [...cards, ...userGameCards];
};

const getAllCardsOfGame = async (gameId) => {
  const gameCards = await db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.GAMES_CARDS}" WHERE game_id = $1`,
    [gameId]
  );
  const cards = await db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.CARDS}" WHERE id = ANY($1::uuid[])`,
    [gameCards.map((gameCard) => gameCard.card_id)]
  );
  return [...cards, ...gameCards];
};

const getDrawPile = (gameId) => {
  return db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.GAMES_CARDS}" WHERE game_id = $1 AND is_draw_pile = true`,
    [gameId]
  );
};

const getDiscardedCards = (gameId) => {
  return db.connection.manyOrNone(
    `SELECT * FROM "${db.tables.GAMES_CARDS}" WHERE game_id = $1 AND is_discarded = true`,
    [gameId]
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
  getAllCardsOfGame,
  getAllCardsOfGameUser,
  getDrawPile,
  getDiscardedCards,
  updateOwner,
  playerDraw,
};
