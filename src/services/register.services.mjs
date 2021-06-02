import { createUser, DB_MODELS } from "../config/db.mjs";
import { sendError400, sendError500 } from "./errors.services.mjs";

export const createNewUser = async (request, response) => {
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
      sendError400(response);
    } else {
      console.log(error);

      sendError500(response);

    }
  }
}

