import { Router } from "express";

export function getRouter() {
  const router = new Router();
  router.get("/products", prueba)
  router.post("/products")
  router.get("/products/:productId")
  router.patch("/products/:productId")
  router.delete("/products:productId")
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}