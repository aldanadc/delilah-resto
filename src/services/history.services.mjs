import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders } from "../config/db.mjs";
import { sendError403, sendError404, sendError500 } from "./errors.services.mjs";
const Op = Sequelize.Op;



export const getHistory = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  try { //IF NON-ADMIN, GET USER'S HISTORY
    if (tokenInfo.is_admin === false) {
      const userHistory = await getOrders({ user_id: tokenInfo.user_id });
      response.json(userHistory)
    } else { //IF ADMIN, GET ALL ORDERS FROM THE BEGINNING OF TIME
      const completeHistory = await getOrders();
      response.json(completeHistory)
    }
  } catch (error) {

    sendError403(response); //VER ESTO, 500?  NO SÉ POR QUÉ PUSE ESTO

    // response
    //   .status(403)
    //   .json({
    //     status: "Request failed",
    //     message: "Credentials needed to access content"
    //   })
  }
}


//GET ONE USER'S HISTORY, ONLY ADMIN
export const getUserHistory = async (request, response) => {
  try {
    const userOrders = await getOrders(request.params);

    if (userOrders.length === 0) {

      sendError404(response);
      // response
      //   .status(404)
      //   .send({
      //     status: "Nothing found",
      //     message: "There are no orders for this user or user does not exist"
      //   })
    } else {
      response.json(userOrders)
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


//GET ORDERS BY SPECIFIED DATE, ONLY ADMIN
export const getHistoryByDate = async (request, response) => {
  const date = new Date(request.params.date);
  const endOfDay = new Date(date);
  endOfDay.setHours(endOfDay.getHours() + 24);

    try {
      const dateHistory = await getOrders({
        created_at: {
          [Op.lt]: endOfDay, //menor que final del día
          [Op.gte]: date //mayor que ese día a las 00
        }
      });

      if (dateHistory.length === 0) {

        sendError404(response);
        // response
        //   .status(404)
        //   .json({
        //     status: "Nothing found",
        //     message: "No orders on the specified date"
        //   })
      } else {
        response.json(dateHistory)
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
//}




