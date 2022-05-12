'use strict';
const db = require('../index');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(db.tables.GAMES, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      set_number_of_players: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      current_number_of_players: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
      current_player_id: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      admin_id: {
        type: Sequelize.UUID,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(db.tables.GAMES);
  },
};
