import { Router } from "express";
import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
const Op = Sequelize.Op;

export function getRouter() {
  const router = new Router();
  router.get("/history", verifyToken, getHistory);
  router.get("/history/user/:user_id", verifyToken, verifyIfAdmin, getUserHistory);
  router.get("/history/:date", verifyToken, verifyIfAdmin, getHistoryByDate);
  return router;
}

const getHistory = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  try {
    if (tokenInfo.is_admin === false) {
      const userHistory = await getOrders({user_id: tokenInfo.user_id});
      response.json(userHistory)
    }else { //GET ALL ORDERS FROM THE BEGINNING OF TIME
      const completeHistory = await getOrders();
      response.json(completeHistory)
    }
  }catch (error) {
    response
      .status(403)
      .json({
        status: "Request failed",
        message: "Credentials needed to access content"
      })
  }
}


//GET ONE USER'S ORDERS, ONLY ADMIN
const getUserHistory = async (request, response) => {
  try {
    const userOrders = await getOrders(request.params);

    if (userOrders.length === 0) {
      response
        .status(404)
        .send({
          status: "Nothing found",
          message: "There are no orders for this user or user does not exist"
        })
    }else {
      response.json(userOrders)
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


//GET ORDERS BY DATE, ONLY ADMIN
const getHistoryByDate = async (request, response) => {
  const date = new Date(request.params.date);
  const endOfDay = new Date(date);
  endOfDay.setHours(endOfDay.getHours() + 24);
  
  console.log(date);
  console.log(endOfDay);

  const dateTime = date.getTime();
  const dateCheck = date.getTime();

  if (dateTime !== dateCheck) {
    response
    .status(400)
    .json({
      status: "Failed request",
      message: "Invalid date provided"
    })
  }else {
    try {
      const dateHistory = await getOrders({
        created_at: {
          [Op.lt]: endOfDay, //menor que final del día
          [Op.gte]: date //mayor que ese día a las 00
        }
      });

      if (dateHistory.length === 0) {
        response
        .status(404)
        .json({
          status: "Nothing found",
          message: "No orders on the specified date"
        })
      }else {
        response.json(dateHistory)
      }
    }catch (error) {
      console.log(error);
    }
  }
}