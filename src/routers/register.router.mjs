import { Router } from "express";
import { createNewUser } from "../services/register.services.mjs";


export function getRouter() {
  const router = new Router();
  router.post("/register", createNewUser);
  return router;
}


