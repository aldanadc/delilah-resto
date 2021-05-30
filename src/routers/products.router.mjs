import { Router } from "express";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../config/db.mjs";
import { verifyToken, verifyIfAdmin } from "../middlewares/auth.middleware.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/products", verifyToken, getAllProducts);
  router.post("/products", verifyToken, verifyIfAdmin, createNewProduct);
  router.get("/products/:product_id", verifyToken, getOneProduct);
  router.patch("/products/:product_id", verifyToken, verifyIfAdmin, updateOneProduct);
  router.delete("/products/:product_id", verifyToken, verifyIfAdmin, deleteAProduct);
  return router;
}

//CREATE NEW PRODUCT
const createNewProduct = async (request, response) => {
  const newProductInfo = request.body;
  const product = await createProduct(newProductInfo);
  response.json(product);
};

//GET ALL AVAILABLE PRODUCTS
const getAllProducts = async (request, response) => {
  const allProducts = await getProducts({is_disabled: false});
  response.json(allProducts);
}

//GET ONE PRODUCT
const getOneProduct = async (request, response) => {
  const queryProduct = request.params;
  const product = await getProducts(queryProduct);
  response.json(product);
}

//UPDATE ONE PRODUCT
const updateOneProduct = async (request, response) => {
  const productId = request.params;
  const updatedInfo = request.body;
  await updateProduct(updatedInfo, productId);
  const updatedProduct = await getProducts(productId)
  response.send(updatedProduct)
}

//DELETE ONE PRODUCT
const deleteAProduct = async (request, response) => {
  const productId = request.params;
  const productToDelete = await getProducts(productId);
  const productName = productToDelete.name;
  console.log(productName);
  await deleteProduct(productId);
  response.send(productToDelete);
  //response.send(`Product with id ${productId} and name ${productName} was deleted succesfully`)
}
