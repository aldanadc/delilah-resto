import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Orders_Products = sequelize.define('orders_products', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    product_qty: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
  }, {
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return Orders_Products;
};

//Product.belongsToMany(Order, { through: 'orders_products' })
//Order.belongsToMany(Product, { through: 'orders_products' })