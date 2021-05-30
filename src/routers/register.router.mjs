import { Router } from "express";
import { createUser, DB_MODELS } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.post("/register", createNewUser);
  return router;
}


const createNewUser = async (request, response) => {
  const newUserInfo = request.body;
  const newUsername = request.body.username;
  const User = DB_MODELS.User;
  const existingUser = await User.findOne({ where: {username: newUsername}});
  if (existingUser) {
    response
    .status(400)
    .send("Username already in use, please choose another one");
  }else {
    const user = await createUser(newUserInfo);
    response
    .status(201)
    .send(user);
  }
}