import { Model } from 'sequelize';
import bcrypt from 'bcrypt';
import { payloadToJWT } from '../helpers/jwt';

export default (sequelize, DataTypes) => {
  class User extends Model {
    async authenticate (password) {
      return await bcrypt.compare(password, this.passwordDigest);
    };

    generateJWT () {
      return payloadToJWT({
        userId: this.id
      });
    };

    static associate (models) {
      User.hasMany(models.Message, {
        foreignKey: 'fromId',
        as: 'sentMessages'
      });

      User.hasMany(models.Message, {
        foreignKey: 'toId',
        as: 'receivedMessages'
      });
    }
  };

  User.init({
    nickname: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    passwordDigest: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      async beforeCreate (user, o) {
        user.passwordDigest = await bcrypt.hash(user.passwordDigest, 10);
      }
    }
  });

  return User;
};
