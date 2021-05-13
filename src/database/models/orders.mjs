import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Order = sequelize.define('orders', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM,
      values: ["nuevo", "confirmado", "preparando", "enviando", "cancelado", "entregado"],
      defaultValue: "nuevo",
      allowNull: false
    },
    // order_date: {
    //   type: DataTypes.DATE,
    //   allowNull: false
    // },
    payment_method: {
      type: DataTypes.ENUM,
      values: ["efectivo", "tarjeta"],
      allowNull: false
    },
  }); //INSERTAR USER_ID DEFINIENDO RELACIÓN

  return Order;
};

//User.hasMany(Order)
//Order.belongsTo(User)