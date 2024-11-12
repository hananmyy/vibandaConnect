module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    orderDetails: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deliveryDate: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  });

  Order.associate = function (models) {
    Order.belongsTo(models.Vendor, {
      foreignKey: 'vendorId',
      onDelete: 'CASCADE',
    });
    Order.belongsTo(models.Rider, {
      foreignKey: 'riderId',
      onDelete: 'SET NULL',
    });
    Order.belongsTo(models.Customer, {
      foreignKey: 'customerId',
      onDelete: 'CASCADE',
    });
  };

  return Order;
};
