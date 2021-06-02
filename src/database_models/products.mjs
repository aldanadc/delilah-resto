import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const Product = sequelize.define('products', {
    product_id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Product name cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Product description cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Product image cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    ingredients: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Product ingredients cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isNumeric: true,
        notEmpty: true,
      }
    },
    is_disabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
      validate: {
        notEmpty: true,
        isIn: [[true, false]]
      }
    },
  }, {
    createdAt: "created_at",
    updatedAt: "updated_at"
  });

  return Product;
};