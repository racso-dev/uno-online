'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface
      .createTable('Users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          type: Sequelize.STRING,
        },
        username: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING,
        },
      })
      .then(() => {
        queryInterface.createTable('Players', {
          userId: {
            type: Sequelize.INTEGER,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
        });
      });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  },
};
