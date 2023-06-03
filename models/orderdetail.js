'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderDetail.belongsTo(models.Order, { foreignKey: { name: "orderId" } });
      OrderDetail.hasMany(models.OrderTacking, { foreignKey: { name: "orderDetailId" } });
      OrderDetail.belongsTo(models.Product, { foreignKey: { name: "productId" } });
    }
  }
  OrderDetail.init({
    orderId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // User belongsTo ParentCategory 1:1
        model: "Order",
        key: "id",
      },
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // User belongsTo ParentCategory 1:1
        model: "Product",
        key: "id",
      },
    },
    deliveryStatus: {
      type: DataTypes.ENUM("ORDER_RECEIVED", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"),
      defaultValue: "ORDER_RECEIVED"
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  }, {
    sequelize,
    modelName: 'OrderDetail',
  });
  return OrderDetail;
};