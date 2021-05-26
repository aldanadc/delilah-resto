import jwt from 'jsonwebtoken';
import { validateUserAgainstDB } from '../config/db.mjs';
import { ENV } from "../config/env.mjs"

export async function authenticateUser(request, response, next) {
  const secret =  ENV.JWT_SECRET;
  const username = request.body.username;
  const password = request.body.password;
  const user = await validateUserAgainstDB(username, password);
  if (user) {
    const token = jwt.sign({
      ...user,
      password: undefined
    }, secret);
    request.user = {
      ...user,
      password: undefined,
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