import { createProduct, getProducts, deleteProduct, updateProduct } from "../config/db.mjs";
import { sendError400, sendError404, sendError500 } from "./errors.services.mjs";


//CREATE NEW PRODUCT
export const createNewProduct = async (request, response) => {
  const newProductInfo = request.body;

  try {

    const product = await createProduct(newProductInfo);
    response
      .status(201)
      .json(product);

  } catch (error) {
    console.log(error);

    if (error.name === "SequelizeValidationError") {

      sendError400(response);

    } else {
      console.log(error);

      sendError500(response);
    }
  }
};


//GET ALL AVAILABLE PRODUCTS
export const getAvailableProducts = async (request, response) => {
  try {
    const allProducts = await getProducts({ is_disabled: false });

    if (allProducts.length === 0) {

      sendError404(response);

    } else {
      response.json(allProducts);
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
  }
}


//GET DISABLED PRODUCTS
export const getDisabledProducts = async (request, response) => {
  try {
    const disabledProducts = await getProducts({ is_disabled: true });

    if (disabledProducts.length === 0) {

      sendError404(response);

    } else {
      response.json(disabledProducts);
    }

  } catch (error) {
    console.log(error);

    sendError500(response);
  }
}


//GET ONE PRODUCT
export const getOneProduct = async (request, response) => {
  const queryProduct = request.params;
  try {
    const product = await getProducts(queryProduct);

    if (product.length === 0) {

      sendError404(response);
    } else {
      response.json(product);
    }
  } catch (error) {
    console.log(error);

    sendError500(response);
  }
}


//UPDATE ONE PRODUCT
export const updateOneProduct = async (request, response) => {
  const productId = request.params;
  const updatedInfo = request.body;

  try {
    if (!Object.keys(updatedInfo).length) {

      sendError400(response);

    } else {
      await updateProduct(updatedInfo, productId);
      const updatedProduct = await getProducts(productId)

      if (updatedProduct.length === 0) {

        sendError404(response);

      } else {
        response.json(updatedProduct);
      }
    }
  } catch (error) {
    console.log(error);

    sendError500(response);
  }
}


//DELETE ONE PRODUCT
export const deleteAProduct = async (request, response) => {
  const productId = request.params;

  try {
    const productToDelete = await getProducts(productId);

    if (productToDelete.length === 0) {

      sendError404(response);

    } else {
      await deleteProduct(productId);

      response
        .status(200)
        .json({
          status: "Request successful",
          message: "Product deleted"
        })
    }


  } catch (error) {

    console.log(error);

    sendError500(response);
  }
}
