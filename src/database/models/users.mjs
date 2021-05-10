//const { DataTypes } = require("sequelize");

export function createModel(sequelize, DataTypes) {
  const User = sequelize.define('users', {
    id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false //required: true ??
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    is_admin: {
      type: DataTypes.BOOLEAN, // BIT?
      allowNull: false
    },
  });

  return User;
};


// unir productos en tabla orders_products con orders. traer varias líneas?
// dataTypes SQL vs sequelize
// dataType para imagen
// dataType decimal
// nombre tabla en código si está bien
// array en yaml, cómo pasa la db un string a array?
