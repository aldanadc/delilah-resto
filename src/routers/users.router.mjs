import { Router } from "express";
import jwt from 'jsonwebtoken';
import { getUsers, getFavs, DB_MODELS, deleteUser, updateUser } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
import { verifyIfDataOwner, verifyIfDataOwnerOrAdmin } from "../middlewares/users.middleware.mjs";


export function getRouter() {
  const router = new Router();
  router.get("/users", verifyToken, verifyIfAdmin, getAllUsers);
  router.get("/users/:user_id", verifyToken, verifyIfDataOwnerOrAdmin, getOneUser);
  router.patch("/users/:user_id", verifyToken, verifyIfDataOwner, modifyMyUser);
  router.delete("/users/:user_id", verifyToken, verifyIfDataOwner, deleteUserAccount);
  router.get("/users/:user_id/favs", verifyToken, verifyIfDataOwnerOrAdmin, getUserFavs);
  return router;
}


//READ ALL USERS
const getAllUsers = async (request, response) => {
  try {
    const allUsers = await getUsers();

    if (allUsers.length === 0) {
      response
        .status(404)
        .json({
          status: "Request failed",
          message: "No registered users found"
        })
    } else {
      response.json(allUsers);
    }

  } catch (error) {
    console.log(error);

    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}

//READ ONE USER
const getOneUser = async (request, response) => {
  try {
    const user = await getUsers(request.params);

    if (user.length === 0) {
      response
        .status(404)
        .json({
          status: "Request failed",
          message: "No user with specified ID"
        })
    } else {
      response.json(user);
    }

  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}


//READ USER'S FAVS
const getUserFavs = async (request, response) => {
  try {
    const favs = await getFavs(request.params);

    if (favs.length === 0) {
      response
        .status(404)
        .json({
          status: "Request failed",
          message: "No favourites for this user"
        })
    } else {
      response.json(favs);
    }

  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}


const deleteUserAccount = async (request, response) => {
  try {
    await deleteUser({ user_id: tokenInfo.user_id });

    response
      .status(200)
      .json({
        status: "Request successfull",
        message: "User deleted"
      });

  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}


const modifyMyUser = async (request, response) => {
  try {
    const userId = request.params;
    const updatedInfo = request.body;
    await updateUser(updatedInfo, userId);

    response
      .status(200)
      .json({
        status: "Request successfull",
        message: "User updated"
      });

  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}


