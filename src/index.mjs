import express, { json, urlencoded } from "express";
import { ENV } from "./config/env.mjs";
import connect from "./config/db.mjs";
import { getRouter as getHistoryRouter } from "./routers/history.router.mjs";
import { getRouter as getLoginRouter } from "./routers/login.router.mjs";
import { getRouter as getOrdersRouter } from "./routers/orders.router.mjs";
import { getRouter as getProductsRouter } from "./routers/products.router.mjs";
import { getRouter as getRegisterRouter } from "./routers/register.router.mjs";
import { getRouter as getUsersRouter } from "./routers/users.router.mjs";
const basePath = "/api/1.0.0";


function loadMiddlewares(server) {
  server.use(json());
  server.use(urlencoded({ extended: true }));
}

function loadRouters(server) {
  const historyRouter = getHistoryRouter();
  const loginRouter = getLoginRouter();
  const ordersRouter = getOrdersRouter();
  const productsRouter = getProductsRouter();
  const registerRouter = getRegisterRouter();
  const usersRouter = getUsersRouter();

  server.use(basePath, loginRouter);
  server.use(basePath, registerRouter);
  server.use(basePath, usersRouter);
  server.use(basePath, productsRouter);
  server.use(basePath, ordersRouter);
  server.use(basePath, historyRouter);
}

function main() {
  const server = express();
  loadMiddlewares(server);
  loadRouters(server);

  connect()
    .then(() => {
      server.listen(ENV.SERVER_PORT || 3000, () => console.log(`Server is ready`))
    })
};

main();
