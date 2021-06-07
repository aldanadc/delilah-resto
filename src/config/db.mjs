import Sequelize from "sequelize";
import { ENV } from "./env.mjs"
import { createModel as createUsersModel } from '../database_models/users.mjs';
import { createModel as createProductsModel } from '../database_models/products.mjs';
import { createModel as createOrdersModel } from '../database_models/orders.mjs';
import { createModel as createOrders_ProductsModel } from '../database_models/orders_products.mjs';
import { createModel as createProducts_Users } from '../database_models/products_users.mjs';
export const DB_MODELS = {};

export default async function connect() {
  const sequelize = new Sequelize(ENV.DB_NAME, ENV.DB_USERNAME, ENV.DB_PASSWORD, {
    host: ENV.DB_HOST,
    port: ENV.DB_PORT,
    dialect: 'mariadb'
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
    DB_MODELS.Product.belongsToMany(DB_MODELS.Order, { as: "order_items", through: DB_MODELS.Orders_Products, foreignKey: "product_id", onDelete: "set null" });
    DB_MODELS.Order.belongsToMany(DB_MODELS.Product, { as: "order_items", through: DB_MODELS.Orders_Products, foreignKey: "order_id", onDelete: "set null" });
    DB_MODELS.User.belongsToMany(DB_MODELS.Product, { as: "favourites" ,through: DB_MODELS.Products_Users, foreignKey: "user_id" });
    DB_MODELS.Product.belongsToMany(DB_MODELS.User, { as: "favourites", through: DB_MODELS.Products_Users, foreignKey: "product_id" });
    DB_MODELS.Product.hasMany(DB_MODELS.Orders_Products, { foreignKey: "product_id" });
    DB_MODELS.Orders_Products.belongsTo(DB_MODELS.Product, { foreignKey: "product_id" });
    DB_MODELS.Order.hasMany(DB_MODELS.Orders_Products, { foreignKey: "order_id" });
    DB_MODELS.Orders_Products.belongsTo(DB_MODELS.Order, { foreignKey: "order_id" });

  await sequelize.sync({ force: false })
  }catch (error) {
    console.error("Unable to connect to the database:", error);
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
    attributes: { exclude: ["created_at", "updated_at"] },
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


export async function deleteUser(filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const deletedUser =  User.destroy({
    where: filter,
  });
    
  return deletedUser
}


export async function updateUser(updatedInfo, filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const user =  User.update(updatedInfo,
    {
    where: filter,
    });
  return user
}


export async function getUsers(filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const user =  User.findAll({
    where: filter,
  });
  return user
}


//FAVS
export async function getFavs(filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const userFavs = User.findAll({
    where: filter,
    attributes: { exclude: ["id", "created_at", "updated_at", "full_name", "email", "phone_number", "password", "is_admin", "address"]},
    include: [{
      model: DB_MODELS.Product, as: "favourites",
      attributes: { exclude: ["created_at", "updated_at", "price", "ingredients"]},
      through: {
        attributes: []
      }
    }]
  });
  
  return userFavs
}


//ORDERS
export async function getOrders(filter = {}) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const order =  Order.findAll({
    where: filter,
    include: [{
      model: DB_MODELS.Product, as: "order_items",
      attributes: { exclude: ["created_at", "updated_at", "description", "ingredients", "is_disabled"]},      
      through: {
        attributes: ["product_qty"]
      }
    }]
  });
  return order
}


//UPDATE ORDER STATUS
export async function updateOrderStatus(updatedStatus, filter = {}) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const updatedOrder =  Order.update( { status: updatedStatus },
    {
    where: filter,
    attributes: { exclude: ["created_at"] }
    });
  return updatedOrder
}


//CREATE ORDER
export async function createOrder(orderInfo) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const newOrder = await Order.create(
    orderInfo,
    {
      include: [DB_MODELS.Orders_Products]
    }
  );

  return newOrder;
}


export async function deleteOrder(filter = {}) {
  /** @type {Sequelize.Model} */
  const Order = DB_MODELS.Order;
  const deletedOrder =  Order.destroy({
    where: filter,
  });
    
  return deletedOrder
}