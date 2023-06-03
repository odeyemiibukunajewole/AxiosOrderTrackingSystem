'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.OrderDetail, { foreignKey: { name: "productId" } });
    }
  }
  Product.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    finalPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    sellingPrice: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    isDeleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    mainImageUrl: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    isBlocked: {
      type: DataTypes.BOOLEAN,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
    },
    slug: {
      type: DataTypes.STRING,
    },
  },
    {
      sequelize,
      modelName: "Product",
    });
  return Product;
};