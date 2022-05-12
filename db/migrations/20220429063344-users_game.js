('use strict');
const db = require('../index');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(db.tables.USERS_GAMES, {
      game_id: {
        type: Sequelize.UUID,
      },
      user_id: {
        type: Sequelize.UUID,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.dropTable(db.tables.USERS_GAMES);
  },
};
