'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.User, { foreignKey: { name: "userId" } });
      Order.hasMany(models.OrderDetail, { foreignKey: { name: "orderId" } });
    }
  }
  Order.init({
    totalQuantity: {
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      type: DataTypes.INTEGER,
    },
    actualPrice: {
      type: DataTypes.INTEGER,
    },
    paymentChannel: {
      type: DataTypes.STRING,
      defaultValue: "LOCAL"

    },
    deliveryAddress: {
      type: DataTypes.STRING,
    },
    isDelivered: {
      type: DataTypes.BOOLEAN,
    },
    orderStatus: {
      type: DataTypes.ENUM("IN_PROGRESS", "COMPLETED"),
      defaultValue: "IN_PROGRESS"
    },
    customerFirstName: {
      type: DataTypes.STRING,
    },
    customerLastName: {
      type: DataTypes.STRING,
    },
    customerEmail: {
      type: DataTypes.STRING,
    },
    customerPhoneNumber: {
      type: DataTypes.STRING,
    },
    customerAddress: {
      type: DataTypes.STRING,
    },

    userId: {
      type: DataTypes.INTEGER,
      references: {
        // User belongsTo ParentCategory 1:1
        model: "User",
        key: "id",
      },
    },
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};