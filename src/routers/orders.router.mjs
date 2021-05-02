import { Router } from "express";

export function getRouter() {
  const router = new Router();
  router.get("/orders", prueba)
  router.post("/orders")
  router.get("/orders/:orderId")
  router.patch("/orders/:orderId")
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}