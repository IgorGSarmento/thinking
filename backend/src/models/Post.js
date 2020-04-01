const bcrypt = require('bcryptjs')

const { Model, DataTypes } = require('sequelize')

class Post extends Model {
  static init(sequelize) {
    super.init({
      postText: DataTypes.STRING,
    }, {
      sequelize
    })
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
  }
}

module.exports = Post;