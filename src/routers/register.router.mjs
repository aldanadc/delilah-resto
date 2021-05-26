import { Router } from "express";
import { createUser } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.post("/register", createNewUser);
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

const createNewUser = async (request, response) => {
  const newUserInfo = request.body;
  const user = await createUser(newUserInfo);
  response.send(user);
  //response.json(user);
}