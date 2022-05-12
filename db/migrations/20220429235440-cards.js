'use strict';
const db = require('../index');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(db.tables.CARDS, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      // value stores the card value in 32-bit integer for binary protocols
      value: {
        type: Sequelize.INTEGER,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(db.tables.CARDS);
  },
};
