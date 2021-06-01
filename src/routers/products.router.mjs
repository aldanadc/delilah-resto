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
  try {
    const product = await createProduct(newProductInfo);
    response
    .status(201)
    .json(product);
  }catch (error) {
    console.log(error);
    if (error.name === "SequelizeValidationError") {
      response
      .status(400)
      .json({
        status: "Request failed",
        message: "Fields missing, please complete all required fields"
        })
    }else {
        console.log(error);
        response
        .status(500)
        .json({
          status: "Request failed",
          message: "Could not complete action"
        })
      } 
  }
};

//GET ALL AVAILABLE PRODUCTS
const getAllProducts = async (request, response) => {
  const allProducts = await getProducts({is_disabled: false});
  response.json(allProducts);
}

//GET ONE PRODUCT
const getOneProduct = async (request, response) => {
  const queryProduct = request.params;
  try {
    const product = await getProducts(queryProduct);

    if (product.length === 0 ){
      response
      .status(404)
      .json({
        status: "Not found",
        message: "No product with specified ID"})
    }else {
      response.json(product);
    }
  }catch(error) {
    console.log(error);
  }
}

//UPDATE ONE PRODUCT
const updateOneProduct = async (request, response) => {
  const productId = request.params;
  const updatedInfo = request.body;

  try {
    if (!Object.keys(updatedInfo).length) {
      response
      .status(400)
      .json({
        status: "Request failed",
        message: "No update information provided"})
    }else {
      await updateProduct(updatedInfo, productId);
      const updatedProduct = await getProducts(productId)

      if (updatedProduct.length === 0 ){
        response
        .status(404)
        .json({
          status: "Not found",
          message: "No product with specified ID"})
      }else {
        response.json(updatedProduct);
      }
    }
  }catch (error) {
    console.log(error);
  }
}

//DELETE ONE PRODUCT
const deleteAProduct = async (request, response) => {
  const productId = request.params;

  try {
    const productToDelete = await getProducts(productId);
    const productName = productToDelete.name;

    if (productToDelete.length === 0 ){
      response
      .status(404)
      .json({
        status: "Not found",
        message: "No product with specified ID"})
    }else {
      await deleteProduct(productId);
      response.send(productToDelete);
    }  
  
  //response.send(`Product with id ${productId} and name ${productName} was deleted succesfully`)
  }catch (error) {
    console.log(error);}
}
