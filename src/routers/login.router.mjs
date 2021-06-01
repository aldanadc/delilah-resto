import { Router } from "express";
import { authenticateUser } from '../middlewares/auth.middleware.mjs';

export function getRouter() {
  const router = new Router();
  router.post("/login", authenticateUser, userIsLoggedIn)
  return router;
}

function userIsLoggedIn(request, response) {
  response
    .status(200)
    .send({
      token: request.user.token
    });
}
