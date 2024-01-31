import express from "express";
import {
  fetchAllProducts,
  fetchProduct,
  fetchProductReview,
  fetchShopAndProductImage,
} from "../controllers/Product.js";

const router = express.Router();

router
  .get("/", fetchAllProducts)
  .get("/getProduct/:prodId", fetchProduct)
  .get("/getProductSellerImage/:id", fetchShopAndProductImage)
  .get("/getProductReview/:id", fetchProductReview);

export default router;
