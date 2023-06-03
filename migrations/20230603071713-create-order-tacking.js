'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('OrderTackings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      orderDetailId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          // User belongsTo ParentCategory 1:1
          model: "OrderDetails",
          key: "id",
        },
      },
      status: {
        type: Sequelize.ENUM("ORDER_RECEIVED", "PROCESSING", "SHIPPED", "DELIVERED", "COMPLETED"),
        defaultValue: "ORDER_RECEIVED"
      },
      trackerID: {
        type: Sequelize.STRING(255),
        allowNull: false,
        unique: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('OrderTackings');
  }
};