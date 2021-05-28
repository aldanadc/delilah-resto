import { Router } from "express";
import { authenticateUser } from '../middlewares/auth.middleware.mjs';

export function getRouter() {
  const router = new Router();
  router.post("/login", authenticateUser, userIsLoggedIn)
  return router;
}

//ESTO NO SIRVE PARA NADA
const login = async (request, response) => {
  const userInfo = request.body;
  const username = userInfo.username;
  const password = userInfo.password;
  const user = await authenticateUser(userInfo);
}

function userIsLoggedIn(request, response) {
  response
    .status(202)
    .send({
      token: request.user.token
    });
}
