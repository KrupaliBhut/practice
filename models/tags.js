'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class tags extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      tags.belongsToMany(models.posts,{through:'post_tags'});
    }
  }
  tags.init({
    tagname: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'tags',
  });
  return tags;
};