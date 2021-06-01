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
  router.get("/orders/:order_id", verifyToken, getOrderById);
  router.patch("/orders/:order_id", verifyToken, verifyIfAdmin, updateStatus);
  return router;
}


//GET ALL CURRENT ORDERS
const getAllCurrentOrders = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  const lala = new Date();

  console.log(lala);

  const query = {
    created_at: {
      [Op.lt]: new Date(), //menor que ahora
      [Op.gt]: new Date().setHours(0, 0, 0, 0) //mayor que anoche a las 00
    }
  };


  try {
    if (tokenInfo.is_admin === false) {

      query.user_id = tokenInfo.user_id;

      const userOrders = await getOrders(query);

      if (userOrders.length === 0) {
        response
          .status(404)
          .send({
            status: "Nothing found",
            message: "There are no active orders"
          })
      } else {
        response.json(userOrders)
      }
    } else {

      const allOrders = await getOrders(query);

      if (allOrders.length === 0) {
        response
          .status(404)
          .send({
            status: "Nothing found",
            message: "There are no active orders"
          })
      } else {
        response.json(allOrders)
      }
    }
  } catch (error) {
    console.log(error);
    response
      .status(500)
      .json({
        status: "Request failed",
        message: "Internal server error"
      })
  }
}

//GET ONE ORDER BY ITS ID, ONLY ADMIN OR USER WHO MADE THE ORDER
const getOrderById = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  const orderId = request.params;

  try {
    const order = await getOrders(orderId);

    if (order.length === 0) {
      response
        .status(404)
        .send({
          status: "Nothing found",
          message: "No order with specified ID"
        })

    } else {

      if ((tokenInfo.is_admin === false) && (order[0].user_id === tokenInfo.user_id)) {

        response.json(order);

      } else if ((tokenInfo.is_admin === false) && (order[0].user_id !== tokenInfo.user_id)) {

        response
          .status(403)
          .json({
            status: "Request failed",
            message: "User is not authorized to perform such action"
          })

      } else if (tokenInfo.is_admin === true) {

        if (order.length === 0) {
          response
            .status(404)
            .send({
              status: "Nothing found",
              message: "No order with specified ID"
            })
        }else {
          response.json(order);
        }
      }
    }

  } catch (error) {
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
  const { status } = request.body;
  const orderId = request.params;

  try {
    if (!status) {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid information provided"
        });
    } else {
      const orderToUpdate = await getOrders(orderId);

      if (orderToUpdate.length === 0) {
        response
          .status(404)
          .send({
            status: "Nothing found",
            message: "No order with specified ID"
          });

      } else {
        await updateOrderStatus(status, orderId);

        response
          .status(200)
          .send({
            status: "Request successfull",
            message: "Order status updated"
          });
      }
    }
  } catch (error) {
    console.log(error);

    if (error.original.code === "WARN_DATA_TRUNCATED") {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Invalid information provided"
        });
    } else {
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



//CREATE NEW ORDER
const createNewOrder = async (request, response) => {
  const newOrderInfo = request.body;
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  newOrderInfo.user_id = tokenInfo.user_id;

  try {
    const newOrder = await createOrder(newOrderInfo);

    response
      .status(201)
      .json(newOrder);

  } catch (error) {

    console.log(error);

    if (error instanceof Sequelize.ValidationError) {
      response
        .status(400)
        .send({
          status: "Request failed",
          message: "Incorrect or missing information, please check all required fields"
        });

    } else if ((error instanceof Sequelize.DatabaseError)) {

      if ((error.original.code === "WARN_DATA_TRUNCATED") || (error.original.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD")) {
        response
          .status(400)
          .send({
            status: "Request failed",
            message: "Incorrect or missing information, please check all required fields"
          });
      }

    } else {
      response
        .status(500)
        .json({
          status: "Request failed",
          message: "Internal server error"
        })
    }
  }
}





    // if (error.original.code === "WARN_DATA_TRUNCATED") {
    //   response
    //     .status(400)
    //     .send({
    //       status: "Request failed",
    //       message: "Invalid information provided"
    //     });
    // }else if (error.original.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD") {
    //   response
    //     .status(400)
    //     .send({
    //       status: "Request failed",
    //       message: "Invalid data type provided"
    //     });
    // }else {
    //   response
    //     .status(500)
    //     .json({
    //       status: "Request failed",
    //       message: "Internal server error"
    //     })
    //}
