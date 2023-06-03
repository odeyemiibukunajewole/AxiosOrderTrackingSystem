'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class OrderTacking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      OrderTacking.belongsTo(models.OrderDetail, { foreignKey: { name: "orderDetailId" } });

    }
  }
  OrderTacking.init({
    orderDetailId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        // User belongsTo ParentCategory 1:1
        model: "OrderDetail",
        key: "id",
      },
    },
    status: {
      type: DataTypes.ENUM("ORDER_RECEIVED", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"),
      defaultValue: "ORDER_RECEIVED"
    },
    trackerID: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
    },
  }, {
    sequelize,
    modelName: 'OrderTacking',
  });
  return OrderTacking;
};