import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Order_Products = sequelize.define('orders_products', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    product_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    product_total: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
  }); //INSERTAR PRODUCT_ID Y ORDER_ID DEFINIENDO RELACIÓN

  return Order_Products;
};

//Product.belongsToMany(Order, { through: 'orders_products' })
//Order.belongsToMany(Product, { through: 'orders_products' })