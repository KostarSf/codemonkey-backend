const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('user', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  about: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  password: { type: DataTypes.STRING }
})

const Direction = sequelize.define('direction', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING },
  importance: { type: DataTypes.STRING },
  description: { type: DataTypes.STRING },
  schema: { type: DataTypes.STRING }
})

const UserDirection = sequelize.define('user_direction', {
  id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true }
})

User.belongsToMany(Direction, { as: 'Directions', through: { model: UserDirection, unique: true }, foreignKey: 'user_id' });
Direction.belongsToMany(User, { as: 'Users', through: { model: UserDirection, unique: false }, foreignKey: 'directions_id' });

module.exports = {
  User, Direction
}