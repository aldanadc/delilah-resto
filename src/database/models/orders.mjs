import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Order = sequelize.define('orders', {
    order_id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["new", "confirmed", "preparing", "on its way", "cancelled", "delivered"],
      defaultValue: "new",
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    payment_method: {
      type: DataTypes.ENUM,
      values: ["cash", "card"],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
  }, {
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return Order;
};
