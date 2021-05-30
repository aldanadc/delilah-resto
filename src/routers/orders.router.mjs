import { Router } from "express";
import Sequelize from "sequelize";
import jwt from 'jsonwebtoken';
import { getOrders, updateOrderStatus, createOrder } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
const Op = Sequelize.Op;

export function getRouter() {
  const router = new Router();
  router.get("/orders", verifyToken, getAllCurrentOrders);
  router.post("/orders", verifyToken, createNewOrder);
  //router.get("/orders/:userId");
  router.get("/orders/:order_id", verifyToken, verifyIfAdmin, getOrderById);
  router.patch("/orders/:order_id", verifyToken, verifyIfAdmin, updateStatus);
  return router;
}


//GET ALL CURRENT ORDERS
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
      const query = {
        created_at: {
          [Op.lt]: new Date(), //menor que ahora
          [Op.gt]: new Date().setHours(0,0,0,0) //mayor que anoche a las 00
        }
      };
      const allOrders = await getOrders(query);
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


//GET ONE ORDER BY ITS ID, ONLY ADMIN. VER DE AGREGAR VALIDACIÓN PARA QUE SI NO ES ADMIN LA PUEDA VER SI LA ORDEN ES SUYA
const getOrderById = async (request, response) => {
  const orderId = request.params;
  try {
    const order = await getOrders(orderId);
    if (order.length === 0){
      response.send("No order with specified ID")
    }
    else {
      response.json(order)
    }
  }catch (error){
    console.log(error);
  }
}


//UPDATE ONE ORDER BY ITS ID
const updateStatus = async (request, response) => {
  const newStatus = request.body.status;
  const orderId = request.params;
  try {
    const orderToUpdate = await getOrders(orderId);
    if (orderToUpdate.length === 0 ){
      response.send("No order with specified ID")
    }else {
      await updateOrderStatus(newStatus, orderId);
      const updatedOrder = await getOrders(orderId);
      response.json(updatedOrder);
  }
  }catch (error) {
    console.log(error);
  }
}


//CREATE NEW ORDER //CHEQUEAR ORDER DATE QUE DA ERROR POR CÓMO ESTÁ LA TABLA
const createNewOrder = async (request, response) => {
  const newOrderInfo = request.body;
  const newOrder = await createOrder(newOrderInfo);
  response.json(newOrder);
};