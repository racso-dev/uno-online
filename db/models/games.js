const db = require('../index');
module.exports = (sequelize, DataTypes) => {
  const Games = sequelize.define(db.tables.GAMES, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    name: DataTypes.STRING,
    set_number_of_players: DataTypes.INTEGER,
    current_number_of_players: DataTypes.INTEGER,
    current_player_id: DataTypes.UUID,
    admin_id: DataTypes.UUID,
  });

  Games.associate = (models) => {
    Games.belongsToMany(models.Users, { through: db.tables.USERS_GAMES });
    // First version is a hasMany version, should it be a belongsToMany?
    // Games.hasMany(models.Cards, { foreignKey: 'game_id', sourceKey: 'id' });
    Games.belongsToMany(models.Cards, { through: db.tables.GAMES_CARDS });
  };

  return Games;
};
