import Sequelize from "sequelize";
import { ENV } from "./env.mjs"
import { createModel as createUsersModel } from '../database/models/users.mjs';
import { createModel as createProductsModel } from '../database/models/products.mjs';
import { createModel as createOrdersModel } from '../database/models/orders.mjs';
import { createModel as createOrders_ProductsModel } from '../database/models/orders_products.mjs';
import { createModel as createProducts_Users } from '../database/models/products_users.mjs';

export const DB_MODELS = {};

export default async function connect() {
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

    DB_MODELS.User.hasMany(DB_MODELS.Order, { foreignKey: "user_id" });
    DB_MODELS.Order.belongsTo(DB_MODELS.User, { foreignKey: "user_id" });
    DB_MODELS.Product.belongsToMany(DB_MODELS.Order, { through: 'orders_products', foreignKey: "product_id" });
    DB_MODELS.Order.belongsToMany(DB_MODELS.Product, { through: 'orders_products', foreignKey: "order_id" });
    DB_MODELS.User.belongsToMany(DB_MODELS.Product, { through: 'products_users', foreignKey: "user_id" });
    DB_MODELS.Product.belongsToMany(DB_MODELS.User, { through: 'products_users', foreignKey: "product_id" })

  await sequelize.sync({ force: false })
  }catch (error) {
    console.error('Unable to connect to the database:', error);
    throw error;
  }
}

//VALIDATE USER
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

//PRODUCTS
export async function getProducts(filter = {}) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const product =  Product.findAll({
    where: filter,
    attributes: { exclude: ['created_at', 'updated_at'] },
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
  });
    
  return deletedProduct
}

export async function updateProduct(updatedInfo, filter = {}) {
  /** @type {Sequelize.Model} */
  const Product = DB_MODELS.Product;
  const product =  Product.update(updatedInfo,
    {
    where: filter,
    });
  return product
}

//USERS
export async function createUser(userInfo) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const newUser = await User.create(userInfo);
  return newUser;
}


export async function getUsers(filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const user =  User.findAll({
    where: filter,
    attributes: { exclude: ['created_at', 'updated_at'] },
  });
  return user
}

//FAVS
export async function getFavs(filter = {}) {
  /** @type {Sequelize.Model} */
  const Favs = DB_MODELS.Products_Users;
  const userFavs = Favs.findAll({
    where: filter,
    attributes: { exclude: ['id', 'created_at', 'updated_at']},
    include: [DB_MODELS.Product] //NO ANDA, dice que no hay asociación
  });

  return userFavs
}


//ORDERS
export async function getOrders(filter = {}) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const order =  Order.findAll({
    where: filter,
    //include: ["items"]
  });
  return order
}

//UPDATE ORDER STATUS FUNCIONA PERO DEVUELVE 1
export async function updateOrderStatus(updatedStatus, filter = {}) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const updatedOrder =  Order.update( { status: updatedStatus },
    {
    where: filter,
    attributes: { exclude: ['created_at'] }
    });
  return updatedOrder
}


//CREATE ORDER
export async function createOrder(orderInfo) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const newOrder = await Order.create(orderInfo);
  const newOrderId = newOrder.order_id;
  await addProductsToOrder(orderInfo.order_products, newOrderId)
  return newOrder;
}


//CREATE ORDER PRODUCTS
export async function addProductsToOrder(productsInfo, orderId) {
  /** @type {Sequelize.Model} */
  const Items = DB_MODELS.Orders_Products;
  productsInfo.order_id = orderId;
  console.log(productsInfo);
  const orderItems = await Items.create(productsInfo);
  return orderItems
}

