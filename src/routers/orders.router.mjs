import { Router } from "express";
import { getOrders, updateOrderStatus, createOrder } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/orders", getAllCurrentOrders);
  router.post("/orders", createNewOrder);
  //router.get("/orders/:userId");
  router.get("/orders/:order_id", getOrderById);
  router.patch("/orders/:order_id", updateStatus);
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

//GET ALL ORDER, ver de agregar filtro de fecha de hoy
const getAllCurrentOrders = async (request, response) => {
  const orders = await getOrders();
  response.json(orders)
}

//GET ONE ORDER BY ITS ID
const getOrderById = async (request, response) => {
  const orderId = request.params;
  const orders = await getOrders(orderId);
  response.json(orders)
}

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