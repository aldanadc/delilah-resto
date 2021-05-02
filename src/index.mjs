import express, { json, urlencoded} from "express";
import { getRouter as getHistoryRouter } from "./routers/history.router.mjs";
import { getRouter as getLoginRouter } from "./routers/login.router.mjs";
import { getRouter as getOrdersRouter } from "./routers/orders.router.mjs";
import { getRouter as getProductsRouter } from "./routers/products.router.mjs";
import { getRouter as getRegisterRouter } from "./routers/register.router.mjs";
import { getRouter as getUsersRouter } from "./routers/users.router.mjs";


function loadMiddlewares(server) {
  server.use(json());
  server.use(urlencoded( {extended: true} ));
}

function loadRouters(server) {
  const historyRouter = getHistoryRouter();
  const loginRouter = getLoginRouter();
  const ordersRouter = getOrdersRouter();
  const productsRouter = getProductsRouter();
  const registerRouter = getRegisterRouter();
  const usersRouter = getUsersRouter();
  server.use("/api/1.0.0", historyRouter);
  server.use("/api/1.0.0", loginRouter);
  server.use("/api/1.0.0", ordersRouter);
  server.use("/api/1.0.0", productsRouter);
  server.use("/api/1.0.0", registerRouter);
  server.use("/api/1.0.0", usersRouter);
}

function main() {
  const server = express();
  loadMiddlewares(server);
  loadRouters(server);
  server.listen(8080, () => console.log("Server is ready..."))
}

main();

//Handlers:
//function doLogin (req, res) => {}

//function register (req, res) => {}

//function showFullHistory (req, res) => {}

//function showHistoryByDate (req, res) => {}

//function showHistoryByUser (req, res) => {}

//function showAllOrders (req, res) => {}

//function showOneOrder (req, res) => {}

//function createNewOrder (req, res) => {}

//function updateOrder (req, res) => {}

//function showAllProducts (req, res) => {}

//function createNewProduct (req, res) => {}

//function showOneProduct (req, res) => {}

//function updateProduct (req, res) => {}

//function deleteProduct (req, res) => {}

//function showAllUsers (req, res) => {}

//function showOneUser (req, res) => {}

//function updateUser (req, res) => {}

//function deleteUser (req, res) => {}

//function getFavs (req, res) => {}


//Middleware:
//authentication
//is admin