import { Router } from "express";
import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders, updateOrderStatus, createOrder } from "../config/db.mjs";
import { verifyToken } from "../middlewares/auth.middleware.mjs";
const Op = Sequelize.Op;

export function getRouter() {
  const router = new Router();
  router.get("/orders", verifyToken, getAllCurrentOrders);
  router.post("/orders", createNewOrder);
  //router.get("/orders/:userId");
  router.get("/orders/:order_id", getOrderById);
  router.patch("/orders/:order_id", updateStatus);
  return router;
}


//GET ALL ORDER, ver de agregar filtro de fecha de hoy
const getAllCurrentOrders = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  try {
    
    if (tokenInfo.is_admin === false) {
      const query = {
        user_id: tokenInfo.user_id,
        created_at: {
          [Op.lt]: new Date(), //menor que ahora
          [Op.gt]: new Date().setHours(0,0,0,0) //mayor que anoche a las 00
        }
      };
      console.log(JSON.stringify(query, null, 2));
      const userOrders = await getOrders(query);
      response.json(userOrders)
    }else {
      const allOrders = await getOrders();
      response.json(allOrders)
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



//GET ONE ORDER BY ITS ID
const getOrderById = async (request, response) => {
  const orderId = request.params;
  const orders = await getOrders(orderId);
  response.json(orders)
}



// //GET ALL ORDER, ver de agregar filtro de fecha de hoy
// const getAllCurrentOrders = async (request, response) => {
//   const orders = await getOrders();
//   response.json(orders)
// }



//UPDATE ONE ORDER BY ITS ID
const updateStatus = async (request, response) => {
  const newStatus = request.body.status;
  const orderId = request.params;
  console.log(newStatus);
  await updateOrderStatus(newStatus, orderId);
  const updatedOrder = await getOrders(orderId);
  response.json(updatedOrder);
  //response.send(updatedOrder);
}


//CREATE NEW ORDER //CHEQUEAR ORDER DATE QUE DA ERROR POR CÓMO ESTÁ LA TABLA

const createNewOrder = async (request, response) => {
  const newOrderInfo = request.body;
  const order = await createOrder(newOrderInfo);
  response.json(order);
};