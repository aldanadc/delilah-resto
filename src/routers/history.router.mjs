import { Router } from "express";
import { getOrders } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/history", getHistory);
  //router.get("/history/:date", getHistoryByDate);
  router.get("/history/:user_id", getUserHistory);
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}


//GET ALL ORDERS FROM THE BEGINING OF TIME
const getHistory = async (request, response) => {
  const orders = await getOrders();
  response.json(orders)
}


//GET ONE USER'S ORDERS
const getUserHistory = async (request, response) => {
  const userOrders = await getOrders(request.params)
  response.json(userOrders)
}


//GET ORDERS BY DATE
const getHistoryByDate = async (request, response) => {
  const dateHistory = await getOrders(request.params);
  response.json(dateHistory)
}