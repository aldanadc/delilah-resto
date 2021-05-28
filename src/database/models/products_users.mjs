import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Products_Users = sequelize.define('products_users', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  }, {
    createdAt: "created_at",
    updatedAt: "updated_at"
  });
  
  return Products_Users;
};
