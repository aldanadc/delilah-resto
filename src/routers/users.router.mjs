import { Router } from "express";
import { createUser } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/users", prueba)
  router.get("/users/:userId")
  router.patch("/users/:userId")
  router.delete("/users/:userId")
  router.get("/users/:userId/favs")
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

const createNewUser = (request, response) => {
  const newUserInfo = request.body;
  const user = createUser(newUserInfo);
  response.send(user);
  //response.json(user);
}