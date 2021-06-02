import jwt from 'jsonwebtoken';
import { validateUserAgainstDB } from '../config/db.mjs';
import { ENV } from "../config/env.mjs";
import { sendError500 } from '../services/errors.services.mjs';
const secret =  ENV.JWT_SECRET;

export async function authenticateUser(request, response, next) {
  const username = request.body.username;
  const password = request.body.password;
  const user = await validateUserAgainstDB(username, password);
  if (user) {
    const token = jwt.sign({
      user_id: user.user_id,
      username: user.username,
      full_name: user.full_name,
      email: user.email,
      is_admin: user.is_admin
    }, secret, { expiresIn: 30 * 60});

    request.user = {
      token: token
    }
    next();
  }else {
    response
    .status(401)
    .json({
      status: "Request failed",
      message: "Invalid login information"
    })
  }
}


export async function verifyToken(request, response, next) {
  try {
    const token = request.headers.authorization.replace("Bearer ", "");
    if (jwt.verify(token, secret)) {
      next();
    }
  }catch (error) {
    if (error.name === "TokenExpiredError") {
      response
      .status(401)
      .json({
        status: "Request failed",
        message: "Expired user token, please log in again"
      })
    }else if (request.headers.authorization === undefined) {
      response
        .status(401)
        .json({
          status: "Request failed",
          message: "Credentials needed to access content. Please log in"
        })
    }else {
      response
        .status(401)
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

    console.log(error);
    sendError500(response);
    // response
    //   .status(403)
    //   .json({
    //     status: "Request failed",
    //     message: "Admin credentials needed to access content"
    //   })
  }
}


// export async function verifyUserId(request, response, next) {
//   const token = request.headers.authorization.replace("Bearer ", "");
//   const tokenInfo = jwt.decode(token);

//   try {

//   }