import { Router } from "express";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
import { checkIfValidDate } from "../middlewares/history.middleware.mjs";
import { getHistory, getUserHistory, getHistoryByDate } from "../services/history.services.mjs";


export function getRouter() {
  const router = new Router();
  router.get("/history", verifyToken, getHistory);
  router.get("/history/user/:user_id", verifyToken, verifyIfAdmin, getUserHistory);
  router.get("/history/:date", verifyToken, verifyIfAdmin, checkIfValidDate, getHistoryByDate);
  return router;
}

