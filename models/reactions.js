'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Reactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Reactions.init({
    userId: DataTypes.STRING,
    postId: DataTypes.STRING,
    reactionType: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Reactions',
  });
  return Reactions;
};