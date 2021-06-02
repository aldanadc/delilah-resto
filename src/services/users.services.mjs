import { getUsers, getFavs, deleteUser, updateUser } from "../config/db.mjs";
import { sendError404, sendError500 } from "./errors.services.mjs";

//READ ALL USERS
export const getAllUsers = async (request, response) => {
  try {
    const allUsers = await getUsers();

    if (allUsers.length === 0) {
      sendError404(response);
      // response
      //   .status(404)
      //   .json({
      //     status: "Request failed",
      //     message: "No registered users found"
      //   })
    } else {
      response.json(allUsers);
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}

//READ ONE USER
export const getOneUser = async (request, response) => {
  try {
    const user = await getUsers(request.params);

    if (user.length === 0) {
      sendError404(response);
      // response
      //   .status(404)
      //   .json({
      //     status: "Request failed",
      //     message: "No user with specified ID"
      //   })
    } else {
      response.json(user);
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}


//READ USER'S FAVS
export const getUserFavs = async (request, response) => {
  try {
    const favs = await getFavs(request.params);

    if (favs.length === 0) {
      sendError404(response);
      // response
      //   .status(404)
      //   .json({
      //     status: "Request failed",
      //     message: "No favourites for this user"
      //   })
    } else {
      response.json(favs);
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}


export const deleteUserAccount = async (request, response) => {
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

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}


export const modifyMyUser = async (request, response) => {
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

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}


