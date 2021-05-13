import Sequelize from "sequelize";
//const sequelize = new Sequelize();
import { ENV } from "./env.mjs"
import { createModel as createUsersModel } from '../database/models/users.mjs';
import { createModel as createProductsModel } from '../database/models/products.mjs';
import { createModel as createOrdersModel } from '../database/models/orders.mjs';
import { createModel as createOrder_ProductsModel } from '../database/models/orders_products.mjs';

const DB_MODELS = {};

export default async function connect() {
  const AUTH = ENV.DB_USERNAME || ENV.DB_PASSWORD
    ? `${ENV.DB_USERNAME}:${ENV.DB_PASSWORD}@` 
    : '';
  const URL = `${ENV.DB_CONNECTOR}://${AUTH}${ENV.DB_HOST}:${ENV.DB_PORT}/${ENV.DB_NAME}`;
  console.log(URL);
  const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: 'mariadb'
  });
  try {
    await sequelize.authenticate();

    console.log('Connection has been established successfully.');
    DB_MODELS.User = createUsersModel(sequelize);
    DB_MODELS.Product = createProductsModel(sequelize);
    DB_MODELS.Order = createOrdersModel(sequelize);
    DB_MODELS.Order_Products = createOrder_ProductsModel(sequelize);


    DB_MODELS.User.hasMany(DB_MODELS.Order);
    DB_MODELS.Order.belongsTo(DB_MODELS.User);
    DB_MODELS.Product.belongsToMany(DB_MODELS.Order, { through: 'orders_products' });
    DB_MODELS.Order.belongsToMany(DB_MODELS.Product, { through: 'orders_products' });

    // DB_MODELS.Job.hasMany(DB_MODELS.User);
    // DB_MODELS.User.belongsTo(DB_MODELS.Rol);

    // DB_MODELS.Book.belongsToMany(DB_MODELS.Author, { through: 'authors_books'});
    // DB_MODELS.Author.belongsToMany(DB_MODELS.Book, { through: 'authors_books'});

    await sequelize.sync({ force: false })
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}
