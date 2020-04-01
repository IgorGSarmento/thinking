const bcrypt = require('bcryptjs')

const { Model, DataTypes } = require('sequelize')

class User extends Model {
  static init(sequelize) {
    super.init({
      email: DataTypes.STRING,
      name: DataTypes.STRING,
      username: DataTypes.STRING,
      password: DataTypes.STRING,
    }, {
      sequelize,
      hooks: {
        beforeCreate: (user, options) => {
          return bcrypt.hash(user.password, 10)
            .then(hash => {
              user.password = hash
            })
            .catch(err => {
              console.log('Error: ' + err)
            })
        }
      }
    })
  }
}

module.exports = User;