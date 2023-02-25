'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Blog extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // this.belongsTo(models.User, { foreignKey: 'userId' });
      this.hasMany(models.Comment, { foreignKey: 'blogId' }); 

       }
  }
  Blog.init({
    blogTitle: DataTypes.STRING,
    blogDescription: DataTypes.STRING,
    blogImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blog',
  });
  return Blog;
};