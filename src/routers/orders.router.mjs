import { Router } from "express";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
import { getAllCurrentOrders, createNewOrder, updateStatus, getOrderById } from "../services/orders.services.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/orders", verifyToken, getAllCurrentOrders);
  router.post("/orders", verifyToken, createNewOrder);
  router.get("/orders/:order_id", verifyToken, getOrderById);
  router.patch("/orders/:order_id", verifyToken, verifyIfAdmin, updateStatus);
  return router;
}


