import { Router } from "express";
import { authenticateUser } from '../middlewares/auth.middleware.mjs';

export function getRouter() {
  const router = new Router();
  router.post("/login", authenticateUser, userIsLoggedIn)
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

const login = async (request, response) => {
  const userInfo = request.body;
  const username = userInfo.username;
  const password = userInfo.password;
  const user = await authenticateUser(username, password);
}

function userIsLoggedIn(request, response) {
  response
    .status(202)
    .send({
      token: request.user.token
    });
}
