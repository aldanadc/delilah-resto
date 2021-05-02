import { Router } from "express";

export function getRouter() {
  const router = new Router();
  router.get("/login", prueba)
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}