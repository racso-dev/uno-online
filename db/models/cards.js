const db = require('../index');
module.exports = (sequelize, DataTypes) => {
  const Cards = sequelize.define(db.tables.CARDS, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    value: DataTypes.STRING,
    action: DataTypes.INTEGER,
    color: DataTypes.UUID,
    owner_id: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    game_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });

  Cards.associate = (models) => {
    Cards.belongsToMany(models.Users, { through: db.tables.GAMES_CARDS });
    Cards.belongsToMany(models.Games, { through: db.tables.GAMES_CARDS });
  };

  return Cards;
};
