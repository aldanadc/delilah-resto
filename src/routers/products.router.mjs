import { Router } from "express";
import { createProduct, getProducts, deleteProduct, updateProduct } from "../config/db.mjs";

export function getRouter() {
  const router = new Router();
  router.get("/products", getAllProducts)
  router.post("/products", createNewProduct)
  router.get("/products/:id", getOneProduct)
  router.patch("/products/:id", updateOneProduct)
  router.delete("/products/:id", deleteAProduct)
  return router;
}

function prueba(req, res) {
  res.send("hola hola esto anda")
}

//CREATE NEW PRODUCT
const createNewProduct = async (request, response) => {
  // const newProduct = request.body;
  // const product = await DB_MODELS.Product.create(newProduct);
  // response.json(product);
  const newProductInfo = request.body;
  const product = await createProduct(newProductInfo);
  response.json(product);
};

//GET ALL PRODUCTS
const getAllProducts = async (request, response) => {
  const allProducts = await getProducts();
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
  //const data = updatedProduct;
  response.send(updatedProduct)
  //response.send(`Producto actualizado: ${data}`)
}

//DELETE ONE PRODUCT
const deleteAProduct = async (request, response) => {
  const productId = request.params;
  const productToDelete = await getProducts(productId);
  const productName = productToDelete.name;
  console.log(productName);
  await deleteProduct(productId);
  response.send(productToDelete);
  //response.send(`Product with id ${productId.id} and name ${productName} was deleted succesfully`)
}
