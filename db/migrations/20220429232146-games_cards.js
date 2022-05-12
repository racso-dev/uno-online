'use strict';
const db = require('../index');

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.createTable(db.tables.GAMES_CARDS, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      game_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      owner_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: db.tables.USERS,
          key: 'id',
        },
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
