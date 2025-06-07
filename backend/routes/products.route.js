import express from "express";

import {
  createNewProduct,
  deleteProduct,
  editProduct,
  findByName,
  getAllProducts,
} from "../controllers/products.controller.js";

// All the requests implementations are in the products.controller.js file => navigate there to see the actual implementation
const router = express.Router();

// Add new document to the database
router.post("/", createNewProduct);

// Delete a product from the database
router.delete("/:id", deleteProduct);

// Get all the products from the list
router.get("/", getAllProducts);

// Edit existing product
router.put("/:id", editProduct);

// Find product by name
router.get("/search/:query", findByName);

export default router;
