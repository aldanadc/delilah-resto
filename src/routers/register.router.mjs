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
  const existingUser = await User.findOne({ where: { username: newUsername } });
  try {
    if (existingUser) {
      response
        .status(400)
        .json({
          status: "Request failed",
          message: "Username already in use, please choose another one"
        });
    } else {
      const user = await createUser(newUserInfo);
      response
        .status(201)
        .send(user);
    }
  } catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      response
        .status(400)
        .json({
          status: "Request failed",
          message: "Incorrect or missing information, please check all required fields"
        })
    } else {
      console.log(error);

      response
        .status(500)
        .json({
          status: "Request failed",
          message: "Internal server error"
        })
    }
  }
}

