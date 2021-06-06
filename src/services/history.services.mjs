import jwt from 'jsonwebtoken';
import Sequelize from "sequelize";
import { getOrders } from "../config/db.mjs";
import { sendError404, sendError500 } from "./errors.services.mjs";
const Op = Sequelize.Op;


export const getHistory = async (request, response) => {
  const token = request.headers.authorization.replace("Bearer ", "");
  const tokenInfo = jwt.decode(token);
  try { //IF NON-ADMIN, GET USER'S HISTORY
    if (tokenInfo.is_admin === false) {
      const userHistory = await getOrders({ user_id: tokenInfo.user_id });

      if (userHistory.length === 0) {

        sendError404(response);
      } else {
        response.json(userHistory);
      }
    } else { //IF ADMIN, GET ALL ORDERS FROM THE BEGINNING OF TIME
      const completeHistory = await getOrders();

      if (completeHistory.length === 0) {

        sendError404(response);

      } else {
        response.json(completeHistory);
      }
    }
  } catch (error) {

    console.log(error);

    sendError500(response);
  }
}


//GET ONE USER'S HISTORY, ONLY ADMIN
export const getUserHistory = async (request, response) => {
  try {
    const userOrders = await getOrders(request.params);

    if (userOrders.length === 0) {

      sendError404(response);

    } else {
      response.json(userOrders)
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
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
        [Op.lt]: endOfDay, //before end of day
        [Op.gte]: date //after that day at 00.00
      }
    });

    if (dateHistory.length === 0) {

      sendError404(response);
    } else {
      response.json(dateHistory)
    }
  } catch (error) {
    console.log(error);

    sendError500(response);

  }
}





