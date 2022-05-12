const db = require('../index');
module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(db.tables.USERS, {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      autoIncrement: false,
    },
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
  });

  Users.associate = (models) => {
    Users.belongsToMany(models.Games, { through: db.tables.USERS_GAMES });
    Users.hasMany(models.GameCards, { foreignKey: 'user_id', sourceKey: 'id' });
  };

  return Users;
};
