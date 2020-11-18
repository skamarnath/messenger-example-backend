import { Model } from 'sequelize';

export default (sequelize, DataTypes) => {
  class Message extends Model {
    static associate (models) {
      Message.belongsTo(models.User, {
        foreignKey: 'fromId',
        as: 'fromUser'
      });
      Message.belongsTo(models.User, {
        foreignKey: 'toId',
        as: 'toUser'
      });
    }
  };

  Message.init({
    fromId: DataTypes.NUMBER,
    toId: DataTypes.NUMBER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Message'
  });

  return Message;
};
