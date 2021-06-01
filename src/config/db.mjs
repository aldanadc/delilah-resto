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
    DB_MODELS.Product.belongsToMany(DB_MODELS.Order, { as: "order_items", through: DB_MODELS.Orders_Products, foreignKey: "product_id", onDelete: "set null"});
    DB_MODELS.Order.belongsToMany(DB_MODELS.Product, { as: "order_items", through: DB_MODELS.Orders_Products, foreignKey: "order_id", onDelete: "set null"});
    DB_MODELS.User.belongsToMany(DB_MODELS.Product, { as: "favourites" ,through: DB_MODELS.Products_Users, foreignKey: "user_id"});
    DB_MODELS.Product.belongsToMany(DB_MODELS.User, { as: "favourites", through: DB_MODELS.Products_Users, foreignKey: "product_id"});
    DB_MODELS.Product.hasMany(DB_MODELS.Orders_Products, {foreignKey: "product_id"});
    DB_MODELS.Orders_Products.belongsTo(DB_MODELS.Product, {foreignKey: "product_id"});
    DB_MODELS.Order.hasMany(DB_MODELS.Orders_Products, {foreignKey: "order_id"});
    DB_MODELS.Orders_Products.belongsTo(DB_MODELS.Order, {foreignKey: "order_id"});

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
    attributes: { exclude: ['created_at', 'updated_at'] },
  });
  return user
}


//FAVS
export async function getFavs(filter = {}) {
  /** @type {Sequelize.Model} */
  const User = DB_MODELS.User;
  const userFavs = User.findAll({
    where: filter,
    attributes: { exclude: ['id', 'created_at', 'updated_at', 'full_name', 'email', 'phone_number', 'password', 'is_admin', 'address']},
    include: [{
      model: DB_MODELS.Product, as: 'favourites',
      attributes: { exclude: ['created_at', 'updated_at', 'description', 'price', 'ingredients', 'is_disabled','products_users']},
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
      attributes: { exclude: ['created_at', 'updated_at', 'description', 'ingredients', 'is_disabled']},      
      through: {
        attributes: [/*'product_id',*/ 'product_qty']
      }
    }
    //,{model: DB_MODELS.User}
    ]
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
    attributes: { exclude: ['created_at'] }
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
      attributes: { exclude: 'updated_at'}, //ESTO NO FUNCIONA
      include: [DB_MODELS.Orders_Products]
    }
  );

  return newOrder;
}












//CREATE ORDER PRODUCTS
// export async function addProductsToOrder(productsInfo/*array*/, orderId) {
//   /** @type {Sequelize.Model} */
  
//   productsInfo.forEach(item => {
//     item.order_id = orderId;
//   });

//   productsInfo.forEach(addItemToOrder);
// }

// async function addItemToOrder(item) {
//   const Items = DB_MODELS.Orders_Products;
//   console.log(item); //ACÁ DA ERROR SI SE AGREGA EL MISMO PRODUCTO MÁS DE UNA VEZ
//   const orderItem = await Items.create(item);
//   return orderItem
// }


//así estaba
// export async function addProductsToOrder(productsInfo/*array*/, orderId) {
//   /** @type {Sequelize.Model} */
//   const Items = DB_MODELS.Orders_Products;
//   productsInfo.order_id = orderId;
//   console.log(productsInfo);
//   const orderItems = await Items.create(productsInfo);
//   return orderItems
// }

//POR SI SIRVE (????)
// async function addItemToOrder() {
//   const Items = DB_MODELS.Orders_Products;
//   console.log(productsInfo[index]);
//   const orderItems = await Items.create(productsInfo[index]);
//   return orderItems
// }, index

  // productsInfo.forEach(item => async function() {
  //   console.log(item);
  //   const orderItems = await Items.create(item);
    
  //   return orderItems
  // })
//}