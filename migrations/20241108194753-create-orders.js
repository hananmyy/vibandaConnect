'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('Orders', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      orderDetails: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      deliveryDate: {
        type: Sequelize.DATE,
        allowNull: true,
      },
      vendorId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Vendors', // Refers to the 'Vendors' table
          key: 'id', // The foreign key column
        },
        allowNull: false,
        onDelete: 'CASCADE', // If Vendor is deleted, delete corresponding Orders
      },
      riderId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Riders', // Refers to the 'Riders' table
          key: 'id', // The foreign key column
        },
        allowNull: true,
        onDelete: 'SET NULL', // If Rider is deleted, set riderId to null
      },
      customerId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Customers', // Refers to the 'Customers' table
          key: 'id', // The foreign key column
        },
        allowNull: false,
        onDelete: 'CASCADE', // If Customer is deleted, delete corresponding Orders
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('Orders');
  }
};
