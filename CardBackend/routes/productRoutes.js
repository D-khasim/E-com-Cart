import express from "express";
import { getProducts, getProductById, createProduct, deleteProduct } from "../controllers/productController.js";

const router = express.Router();

// GET all products
router.get("/", getProducts);

// GET single product by ID
router.get("/:id", getProductById);

// POST create product (optional — only if needed for your use-case)
router.post("/", createProduct);
router.delete("/:productid",deleteProduct);

export default router;
