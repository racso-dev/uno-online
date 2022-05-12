const db = require('../index');
const { v4: uuidv4 } = require('uuid');

const _this = {
  create: async (game) => {
    const res = await db.connection.oneOrNone(
      `INSERT INTO "${db.tables.GAMES}" (id, name, set_number_of_players, current_number_of_players, current_player_id, admin_id) VALUES ($1, $2, $3, $4, $5, $5) RETURNING *`,
      [uuidv4(), game.name, game.set_number_of_players, 1, game.admin_id]
    );
    return { ...res, playersId: [res.admin_id] };
  },

  findAll: async () => {
    const res = await db.connection.manyOrNone(
      `SELECT * FROM "${db.tables.GAMES}"`
    );
    return res;
  },

  findById: async (id) => {
    return await db.connection.oneOrNone(
      `SELECT * FROM "${db.tables.GAMES}" WHERE id = $1`,
      [id]
    );
  },

  findGamesMatchingName: async (name) => {
    return await db.connection.manyOrNone(
      `SELECT * FROM "${db.tables.GAMES}" WHERE name LIKE '%$1%'`,
      [name]
    );
  },

  update: (game, user) => {
    return db.connection.one(
      `UPDATE "${db.tables.GAMES}" SET name = $1, set_number_of_players = $2, WHERE id = $3 AND admin_id = $4 RETURNING *`,
      [game.name, game.set_number_of_players, game.id, user.id]
    );
  },

  getGameUsers: async (game_id) => {
    const gameUsers = await db.connection.manyOrNone(
      `SELECT * FROM "${db.tables.USERS_GAMES}" WHERE game_id = $1 `,
      [game_id]
    );
    return gameUsers.map((user) => {
      return user.user_id;
    });
  },

  addUserToGame: async (game_id, user_id) => {
    const match = await _this.findById(game_id);
    console.log('FIND BY ID MATCH GMAE ======', match);
    if (!match) throw new Error('Game not found');
    let { current_number_of_players } = await db.connection.one(
      `SELECT COUNT(*) as "current_number_of_players" FROM "${db.tables.USERS_GAMES}" WHERE game_id = $1`,
      [game_id]
    );
    current_number_of_players = parseInt(current_number_of_players, 10);
    console.log('CURRENT NB = ', current_number_of_players);
    console.log('SET NB = ', match.set_number_of_players);
    if (current_number_of_players == match?.set_number_of_players)
      throw new Error('Game is full.');

    let relation = await db.connection.oneOrNone(
      `SELECT * FROM "${db.tables.USERS_GAMES}" WHERE game_id = $1 AND user_id = $2`,
      [game_id, user_id]
    );
    console.log('111RELATION ===', relation);
    if (relation) throw new Error('User already in game.');
    relation = await db.connection.one(
      `INSERT INTO "${db.tables.USERS_GAMES}" (game_id, user_id) VALUES ($1, $2) RETURNING *`,
      [game_id, user_id]
    );
    console.log('222RELATION ===', relation);

    const game = await db.connection.one(
      `UPDATE "${db.tables.GAMES}" SET current_number_of_players = $1 WHERE id = $2 RETURNING *`,
      [current_number_of_players + 1, game_id]
    );
    console.log('GAMMEMMEMEMMEME= ===', game);
    const gameUsers = await _this.getGameUsers(game_id);
    console.log('gameUsers =====', gameUsers);
    const ret = { ...game, playersId: gameUsers };
    console.log('ret =====', ret);
    return await ret;
  },

  deleteOne: (id) => {
    return db.connection.none(
      `DELETE FROM "${db.tables.GAMES}" WHERE id = $1`,
      [id]
    );
  },
};

module.exports = _this;
