import { Router } from "express";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";
import { getAllProducts, getDisabledProducts, createNewProduct, getOneProduct, updateOneProduct, deleteAProduct } from "../services/products.services.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/products", verifyToken, getAllProducts);
  router.get("/products/disabled", verifyToken, verifyIfAdmin, getDisabledProducts);
  router.post("/products", verifyToken, verifyIfAdmin, createNewProduct);
  router.get("/products/:product_id", verifyToken, getOneProduct);
  router.patch("/products/:product_id", verifyToken, verifyIfAdmin, updateOneProduct);
  router.delete("/products/:product_id", verifyToken, verifyIfAdmin, deleteAProduct);
  return router;
}

