'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      totalQuantity: {
        type: Sequelize.INTEGER,
      },
      totalPrice: {
        type: Sequelize.INTEGER,
      },
      actualPrice: {
        type: Sequelize.INTEGER,
      },
      paymentChannel: {
        type: Sequelize.STRING,
      },
      deliveryAddress: {
        type: Sequelize.STRING,
      },
      customerFirstName: {
        type: Sequelize.STRING,
      },
      customerLastName: {
        type: Sequelize.STRING,
      },
      customerEmail: {
        type: Sequelize.STRING,
      },
      customerPhoneNumber: {
        type: Sequelize.STRING,
      },
      customerAddress: {
        type: Sequelize.STRING,
      },
      orderStatus: {
        type: Sequelize.ENUM("IN_PROGRESS", "COMPLETED"),
        defaultValue: "IN_PROGRESS"
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "Users",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};