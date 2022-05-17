'use strict';
const db = require('../index');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(db.tables.GAMES_CARDS, {
      card_id: {
        type: Sequelize.UUID,
      },
      game_id: {
        type: Sequelize.UUID,
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: true,
      },
      is_discarded: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
      is_draw_pile: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(db.tables.GAMES_CARDS);
  },
};
