import { Router } from "express";
import jwt from 'jsonwebtoken';
import { getUsers, getFavs, DB_MODELS, deleteUser, updateUser } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/users", verifyToken, verifyIfAdmin, getAllUsers);
  router.get("/users/:user_id", verifyToken, getOneUser);
  router.patch("/users/:user_id", verifyToken, modifyMyUser);
  router.delete("/users/:user_id", verifyToken, deleteUserAccount);
  router.get("/users/:user_id/favs", verifyToken, getUserFavs);
  return router;
}


//READ ALL USERS
const getAllUsers = async (request, response) => {
  try {
    const allUsers = await getUsers();
    response.json(allUsers);
  }catch (error) {
    console.log(error);
    }
}


const getOneUser = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  try {
    if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
      const user = await getUsers({user_id: tokenInfo.user_id});
      response.json(user);

    }else if ((tokenInfo.is_admin === false) && (request.params != tokenInfo.user_id)) {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Admin credentials needed to access content"
      })

    }else if (tokenInfo.is_admin === true) {
      const user = await getUsers(request.params);
      if (user.length === 0){
        response
        .status(404)
        .json({
          status: "Request failed",
          message: "No user with specified ID"})
      }else {
        response.json(user);
      }
      
    }else {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
    }
  }catch (error) {
    console.log(error);
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
  }
}


//READ ONE USER
// const getOneUser = async (request, response) => {
//   const user = await getUsers(request.params);
//   response.json(user)
// }

//READ USER'S FAVS
const getUserFavs = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  try {
    if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
      const favs = await deleteUser({user_id: tokenInfo.user_id}); 
      response.json(favs);

    }else if ((tokenInfo.is_admin === false) && (request.params != tokenInfo.user_id)) {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Admin credentials needed to access content"
      })

    }else if (tokenInfo.is_admin === true) {
      const favs = await getFavs(request.params);
      if (favs.length === 0){
        response
          .status(404)
          .json({
            status: "Request failed",
            message: "No user exists with specified ID"
          })
      }else {
        response.json(favs);
      }
      
    }else {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
    }
  }catch (error) {
    console.log(error);
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
  }
}


const deleteUserAccount = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  try {
    if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
      await deleteUser({user_id: tokenInfo.user_id}); 
      response
      .status(201)
      .json({
        status: "Request successfull",
        message: "User deleted"});
    }else if (request.params.user_id !== tokenInfo.user_id) {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "User is not authorized to perform such action"
      })
    }else {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
    }
  }catch (error) {
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
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  try {
    if ((tokenInfo.is_admin === false) && (request.params.user_id == tokenInfo.user_id)) {
      const userId = request.params;
      const updatedInfo = request.body;
      await updateUser(updatedInfo, userId);
      //await updateUser({user_id: tokenInfo.user_id}); 
      response
      .status(201)
      .json({
        status: "Request successfull",
        message: "User updated"});

    }else if (request.params.user_id !== tokenInfo.user_id) {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "User is not authorized to perform such action"
      })
    }
  }catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}
