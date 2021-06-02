import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders, updateOrderStatus, createOrder } from "../config/db.mjs";
import { sendError400, sendError403, sendError404, sendError500 } from "./errors.services.mjs";
const Op = Sequelize.Op;

//GET ALL CURRENT ORDERS
export const getAllCurrentOrders = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);

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

        sendError404(response);
        // response
        //   .status(404)
        //   .send({
        //     status: "Nothing found",
        //     message: "There are no active orders"
        //   })
      } else {
        response.json(userOrders)
      }
    } else {

      const allOrders = await getOrders(query);

      if (allOrders.length === 0) {

        sendError404(response);
        // response
        //   .status(404)
        //   .send({
        //     status: "Nothing found",
        //     message: "There are no active orders"
        //   })
      } else {
        response.json(allOrders)
      }
    }
  } catch (error) {
    console.log(error);

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}

//GET ONE ORDER BY ITS ID, ONLY ADMIN OR USER WHO MADE THE ORDER
export const getOrderById = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  const orderId = request.params;

  try {
    const order = await getOrders(orderId);

    if (order.length === 0) {
      sendError404(response);
      // response
      //   .status(404)
      //   .send({
      //     status: "Nothing found",
      //     message: "No order with specified ID"
      //   })

    } else {

      if ((tokenInfo.is_admin === false) && (order[0].user_id === tokenInfo.user_id)) {

        response.json(order);

      } else if ((tokenInfo.is_admin === false) && (order[0].user_id !== tokenInfo.user_id)) {

        sendError403(response);
        // response
        //   .status(403)
        //   .json({
        //     status: "Request failed",
        //     message: "User is not authorized to perform such action"
        //   })

      } else if (tokenInfo.is_admin === true) {

        if (order.length === 0) {
          sendError404(response);
          // response
          //   .status(404)
          //   .send({
          //     status: "Nothing found",
          //     message: "No order with specified ID"
          //   })
        }else {
          response.json(order);
        }
      }
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
    // response
    //   .status(500)
    //   .json({
    //     status: "Request failed",
    //     message: "Internal server error"
    //   })
  }
}


//UPDATE ONE ORDER BY ITS ID
export const updateStatus = async (request, response) => {
  const { status } = request.body;
  const orderId = request.params;

  try {
    if (!status) {

      sendError400(response);
      // response
      //   .status(400)
      //   .send({
      //     status: "Request failed",
      //     message: "Invalid information provided"
      //   });
    } else {
      const orderToUpdate = await getOrders(orderId);

      if (orderToUpdate.length === 0) {
        sendError404(response);
        // response
        //   .status(404)
        //   .send({
        //     status: "Nothing found",
        //     message: "No order with specified ID"
        //   });

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

      sendError400(response);
      // response
      //   .status(400)
      //   .send({
      //     status: "Request failed",
      //     message: "Invalid information provided"
      //   });
    } else {

      sendError500(response);
      // response
      //   .status(500)
      //   .json({
      //     status: "Request failed",
      //     message: "Internal server error"
      //   })
    }
    // if ( error instanceof Sequelize.DatabaseError) {
    //   for (let hola in error) {
    //     console.log(hola);
    //   }
  }
}



//CREATE NEW ORDER
export const createNewOrder = async (request, response) => {
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
      sendError400(response);
      // response
      //   .status(400)
      //   .send({
      //     status: "Request failed",
      //     message: "Incorrect or missing information, please check all required fields"
      //   });

    } else if ((error instanceof Sequelize.DatabaseError)) {

      if ((error.original.code === "WARN_DATA_TRUNCATED") || (error.original.code === "ER_TRUNCATED_WRONG_VALUE_FOR_FIELD")) {
        sendError400(response);
        // response
        //   .status(400)
        //   .send({
        //     status: "Request failed",
        //     message: "Incorrect or missing information, please check all required fields"
        //   });
      }

    } else {

      sendError500(response);
      // response
      //   .status(500)
      //   .json({
      //     status: "Request failed",
      //     message: "Internal server error"
      //   })
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
