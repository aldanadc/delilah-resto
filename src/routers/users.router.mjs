import { Router } from "express";
import { getUsers, getFavs } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/users", getAllUsers)
  router.get("/users/:user_id", getOneUser)
  router.patch("/users/:user_id") //??
  router.delete("/users/:user_id") //??
  router.get("/users/:user_id/favs", getUserFavs)
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

//READ ALL USERS
const getAllUsers = async (request, response) => {
  const allUsers = await getUsers();
  response.json(allUsers);
}

//READ ONE USER
const getOneUser = async (request, response) => {
  const user = await getUsers(request.params);
  response.json(user)
}

//READ USER'S FAVS
const getUserFavs = async (request, response) => {
  const favs = await getFavs(request.params);
  response.json(favs)
}