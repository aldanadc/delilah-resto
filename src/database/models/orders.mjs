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
      values: ["nuevo", "confirmado", "preparando", "enviando", "cancelado", "entregado"],
      defaultValue: "nuevo",
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    payment_method: {
      type: DataTypes.ENUM,
      values: ["efectivo", "tarjeta"],
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

//User.hasMany(Order)
//Order.belongsTo(User)