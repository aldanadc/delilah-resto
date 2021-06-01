import { Router } from "express";
import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
const Op = Sequelize.Op;

export function getRouter() {
  const router = new Router();
  router.get("/history", verifyToken, getHistory);
  //router.get("/history/:user_id", verifyToken, verifyIfAdmin, getUserHistory);
  router.get("/history/:date", getHistoryByDate);
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
  const userOrders = await getOrders(request.params)
  response.json(userOrders)
}


//GET ORDERS BY DATE
const getHistoryByDate = async (request, response) => {
  const date = new Date(request.params.date);
  //const endOfDay = new Date((request.params.date).setHours(23,59,59,999));
  //const endOfDay = date.setHours(date.getHours() + 24); 
  const endOfDay = new Date(date);
  endOfDay.setHours(endOfDay.getHours() + 24);
  console.log(date);
  console.log(endOfDay);
  const dateHistory = await getOrders({
    created_at: {
      [Op.lt]: endOfDay, //menor que final del día
      [Op.gte]: date //mayor que ese día a las 00
    }
  });
  response.json(dateHistory)
}