'use strict';
const db = require('../index');
const { v4: uuidv4 } = require('uuid');

const CARDS = (() => {
  return ['red', 'yellow', 'blue', 'green'].flatMap((color) => {
    const zeroCard = {
      label: '0',
      color,
    };
    const numberCards = ['1', '2', '3', '4', '5', '6', '7', '8', '9'].map(
      (label) => ({
        label,
        color,
      })
    );
    const actionCards = ['Draw 2', 'Reverse', 'Skip'].map((label) => ({
      label,
      color,
    }));
    const wildCards = ['Wild', 'Draw 4'].map((label) => ({
      label,
      color: 'wild',
    }));
    const cardsForColor = [
      zeroCard,
      ...numberCards,
      ...numberCards,
      ...actionCards,
      ...actionCards,
      ...wildCards,
    ];
    return cardsForColor;
  });
})();

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(db.tables.CARDS, {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
      },
      label: { type: Sequelize.STRING, allowNull: false },
      color: { type: Sequelize.STRING, allowNull: false },
    });
    await queryInterface.bulkInsert(
      db.tables.CARDS,
      CARDS.map((card) => ({
        id: uuidv4(),
        ...card,
      }))
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable(db.tables.CARDS);
  },
};
