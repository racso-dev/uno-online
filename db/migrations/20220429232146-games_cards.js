'use strict';
const db = require('../index');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(db.tables.GAMES_CARDS, {
      card_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      game_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      owner_id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      is_discarded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(db.tables.GAMES_CARDS);
  },
};
