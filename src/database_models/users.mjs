import Sequelize from 'sequelize';
const { DataTypes } = Sequelize;

export function createModel(sequelize) {
  const User = sequelize.define('users', {
    user_id: {
      type: DataTypes.INTEGER, autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Username cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    full_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Full name cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        notEmpty: true
      }
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notIn: [[true, false]]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notNumber(value) {
          if (typeof value === "number") {
            throw new Error("Address cannot be a number");
          }
        },
        notIn: [[true, false]]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        notIn: [[true, false]]
      }
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
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

  return User;
};



