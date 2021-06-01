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
  router.get("/orders/:order_id", verifyToken, /*verifyIfAdmin*/ getOrderById);
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

      if (userOrders.length === 0) {
        response
        .status(404)
        .send({
          status: "Nothing found",
          message: "There are no active orders"
        })
      }else {
        response.json(userOrders)
      }
    }else {
      const query = {
        created_at: {
          [Op.lt]: new Date(), //menor que ahora
          [Op.gt]: new Date().setHours(0,0,0,0) //mayor que anoche a las 00
        }
      };
      const allOrders = await getOrders(query);

      if (allOrders.length === 0) {
        response
        .status(404)
        .send({
          status: "Nothing found",
          message: "There are no active orders"
        })
      }else {
        response.json(allOrders)
      }
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

//GET ONE ORDER BY ITS ID, ONLY ADMIN. VER DE AGREGAR VALIDACIÓN PARA QUE SI NO ES ADMIN LA PUEDA VER SI LA ORDEN ES SUYA
const getOrderById = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  const orderId = request.params;

  try {
    const order = await getOrders(orderId);

    if (order.length === 0){
      response
        .status(404)
        .send({
          status: "Nothing found",
          message: "No order with specified ID"
        })

    }else if ((tokenInfo.is_admin === false) && (order[0].user_id === tokenInfo.user_id)) {
      response.json(order)

    }else if (tokenInfo.is_admin === true) {
      response.json(order)
    }
  }catch (error){
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}



//UPDATE ONE ORDER BY ITS ID
const updateStatus = async (request, response) => {
  const newStatus = request.body.status;
  const orderId = request.params;

  try {
    if (newStatus === undefined) {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid information provided"
        });
    }else {
      const orderToUpdate = await getOrders(orderId);
      if (orderToUpdate.length === 0 ){
        response
          .status(404)
          .send({
            status: "Nothing found",
            message: "No order with specified ID"
          });
      }else {
        await updateOrderStatus(newStatus, orderId);

        response
          .status(200)
          .send({
            status: "Request successfull",
            message: "Order status updated"
          });
    }
  }
  }catch (error) {
    console.log(error);

    if (error.original.code === "WARN_DATA_TRUNCATED") {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid information provided"
        });
    }else {
      response
        .status(500)
        .json({
          status: "Request failed",
          message: "Internal server error"
        })
    }
    // if ( error instanceof Sequelize.DatabaseError) {
    //   for (let hola in error) {
    //     console.log(hola);
    //   }
  }
}



//CREATE NEW ORDER //CHEQUEAR ORDER DATE QUE DA ERROR POR CÓMO ESTÁ LA TABLA
const createNewOrder = async (request, response) => {
  const newOrderInfo = request.body;

  try {
    const newOrder = await createOrder(newOrderInfo);

    response
    .status(201)
    .json(newOrder);

  }catch (error) {
    
    console.log(error);

    if (error.original.code === "WARN_DATA_TRUNCATED") {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid information provided"
        });
    }else if (error.original.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid data type provided"
        });
    }else {
      response
        .status(500)
        .json({
          status: "Request failed",
          message: "Internal server error"
        })
    }
  }
};