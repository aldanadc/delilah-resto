import Sequelize from "sequelize";
//const sequelize = new Sequelize();
import { ENV } from "./env.mjs"
import { createModel as createUsersModel } from '../database/models/users.mjs';
import { createModel as createProductsModel } from '../database/models/products.mjs';
import { createModel as createOrdersModel } from '../database/models/orders.mjs';
import { createModel as createOrders_ProductsModel } from '../database/models/orders_products.mjs';
import { createModel as createProducts_Users } from '../database/models/products_users.mjs';

export const DB_MODELS = {};

export default async function connect() {
  // const AUTH = ENV.DB_USERNAME || ENV.DB_PASSWORD
  //   ? `${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@` 
  //   : '';
  // const URL = `${ENV.DB_CONNECTOR}://${AUTH}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
  // console.log(URL);
  const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: 'mariadb'
    //dialect: ENV.DB_CONNECTOR
  });
  try {
    await sequelize.authenticate();

    console.log('Connection to database was successful.');
    DB_MODELS.User = createUsersModel(sequelize);
    DB_MODELS.Product = createProductsModel(sequelize);
    DB_MODELS.Order = createOrdersModel(sequelize);
    DB_MODELS.Orders_Products = createOrders_ProductsModel(sequelize);
    DB_MODELS.Products_Users = createProducts_Users(sequelize);

    DB_MODELS.User.hasMany(DB_MODELS.Order);
    DB_MODELS.Order.belongsTo(DB_MODELS.User);
    DB_MODELS.Product.belongsToMany(DB_MODELS.Order, { through: 'orders_products' });
    DB_MODELS.Order.belongsToMany(DB_MODELS.Product, { through: 'orders_products' });
    DB_MODELS.User.belongsToMany(DB_MODELS.Product, { through: 'products_users' });
    DB_MODELS.Product.belongsToMany(DB_MODELS.User, { through: 'products_users' })

    await sequelize.sync({ force: false })
  }catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}


export async function validateUserAgainstDB(username, password) {
  /** @type {Sequelize.Model} */
  const Users = DB_MODELS.User;
  const user = await Users.findOne({
    where: {
      username: username,
      password: password
    }
  });
  return user;
}

export async function getProducts(filter = {}) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const product =  Product.findAll({
    where: filter,
    attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
  return product
}

export async function createProduct(productInfo) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const newProduct = await Product.create(productInfo);
  return newProduct;
}

export async function deleteProduct(filter = {}) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const deletedProduct =  Product.destroy({
    where: filter,
    //attributes: { exclude: ['createdAt', 'updatedAt'] },
  });
    
  return deletedProduct
}

export async function updateProduct(updatedInfo, filter = {}) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const product =  Product.update(updatedInfo,
    {
    where: filter,
    //attributes: { exclude: ['createdAt', 'updatedAt'] },
    });
  return product
}

export async function createUser(userInfo) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const newUser = await User.create(userInfo);
  return newUser;
}