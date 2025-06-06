import express from "express";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

const app = express();
app.use(express.json()); // Allows us to parse JSON data from incoming requests

// routes
app.get("/", (req, res) => {
  res.status(200).send(`Hello from the server!`);
});
app.listen(5000, () => {
  console.log("Server is running on port http://localhost:5000");
  connectDB();
});

app.post("/api/products", async (req, res) => {
  const product = req.body; // this is the data that user is sending us in his request;
  try {
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const newProduct = new Product(product);
    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});
