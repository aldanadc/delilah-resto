import { Router } from "express";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
import { verifyIfDataOwner, verifyIfDataOwnerOrAdmin } from "../middlewares/users.middleware.mjs";
import { getAllUsers, getOneUser, deleteUserAccount, modifyMyUser, getUserFavs } from "../services/users.services.mjs";


export function getRouter() {
  const router = new Router();
  router.get("/users", verifyToken, verifyIfAdmin, getAllUsers);
  router.get("/users/:user_id", verifyToken, verifyIfDataOwnerOrAdmin, getOneUser);
  router.patch("/users/:user_id", verifyToken, verifyIfDataOwner, modifyMyUser);
  router.delete("/users/:user_id", verifyToken, verifyIfDataOwner, deleteUserAccount);
  router.get("/users/:user_id/favs", verifyToken, verifyIfDataOwnerOrAdmin, getUserFavs);
  return router;
}


