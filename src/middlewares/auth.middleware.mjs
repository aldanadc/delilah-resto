import jwt from 'jsonwebtoken';
import { validateUserAgainstDB } from '../config/db.mjs';
import { ENV } from "../config/env.mjs";
const secret =  ENV.JWT_SECRET;

export async function authenticateUser(request, response, next) {
  //const secret =  ENV.JWT_SECRET;
  const username = request.body.username;
  const password = request.body.password;
  const user = await validateUserAgainstDB(username, password);
  if (user) {
    const token = jwt.sign({
      ...user,
     // ...user.full_name,
      //...user.username,
      password: undefined,
      //...user.is_admin
    }, secret, { expiresIn: 30 * 60});

    request.user = {
      ...user,
      //full_name,
      //username,
      password: undefined,
      //is_admin,
      token: token
    }
    console.log(request.user);
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
  console.log(token);
  try {
    if (jwt.verify(token, secret)) {
      next();
    }else {
      response
      .status(403)
      .json({
        status: "Request failed",
        message: "Invalid token"
      })
    }
    
  }catch (error) {
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "Invalid token"
      })
  }
}
