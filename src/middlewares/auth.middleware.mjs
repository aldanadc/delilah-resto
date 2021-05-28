import jwt from 'jsonwebtoken';
import { validateUserAgainstDB } from '../config/db.mjs';
import { ENV } from "../config/env.mjs";
const secret =  ENV.JWT_SECRET;

export async function authenticateUser(request, response, next) {
  const username = request.body.username;
  const password = request.body.password;
  const user = await validateUserAgainstDB(username, password);
  if (user) {
    const token = jwt.sign({
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      is_admin: user.is_admin
    }, secret, { expiresIn: 15 * 60});

    request.user = {
      // username: user.username,
      // full_name: user.full_name,
      // password: undefined,
      //is_admin: user.is_admin,
      token: token
    }
    next();
  }else {
    response
    .status(403)
    .json({
      status: "Request failed",
      message: "Invalid login information"
    })
  }
}


export async function verifyToken(request, response, next) {
  const token = request.headers.authorization.replace("Bearer ", "");
  try {
    if (jwt.verify(token, secret)) {
      next();
    }
  }catch (error) {
    if (error.name === "TokenExpiredError") {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Expired user token, please log in again"
      })
    }else {
      response
        .status(403)
        .json({
          status: "Request failed",
          message: "Invalid user token"
        })
      }
  }
}



export async function verifyIfAdmin(request, response, next) {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

  try {
    if (tokenInfo.is_admin === true) {
      next();
    }else {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Admin credentials needed to access content"
      })
    }
  }catch (error) {
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "Admin credentials needed to access content"
      })
  }
}