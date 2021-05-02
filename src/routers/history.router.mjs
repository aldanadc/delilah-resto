import { Router } from "express";

export function getRouter() {
  const router = new Router();
  router.get("/history", prueba)
  router.get("/history/:date")
  router.get("/history/:userId")
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}