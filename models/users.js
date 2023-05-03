'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      users.hasOne(models.employees, {foreignKey:'userId'});
      users.hasMany(models.posts,{foreignKey:'userId'});
      users.belongsToMany(models.post_tags, { through: 'post_tags'});
    }
  }
  users.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    deletedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'users',
    paranoid: true,
    timestamps: true
  });
  return users;
};