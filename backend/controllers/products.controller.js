import Product from "../models/product.model.js";
import mongoose from "mongoose";

export const createNewProduct = async (req, res) => {
  const product = req.body; // this is the data that user is sending us in his request;
  try {
    if (!product.name || !product.price || !product.image) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }
    const isExistingProduct = await Product.findOne({
      name: product.name,
    });

    if (isExistingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const newProduct = new Product(product);
    // Save the new product to the database
    // The save() method is an asynchronous operation, so we use await to wait for it to complete
    await newProduct.save();

    return res.status(201).json({ success: true, data: newProduct });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId(id)) {
    res.status(500).json({ message: `Invalid Id` });
  }

  try {
    await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.log(`Error: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res
      .status(200)
      .json({ message: "successfully fetch the products", data: products });
  } catch (error) {
    console.log(`Error in fetching products`);
  }
};

export const editProduct = async (req, res) => {
  const { id } = req.params;

  const product = req.body;

  // If the id that the user is sending us is not a valide one
  if (!mongoose.Types.ObjectId.isValid(id)) {
    res.status(500).json({ message: "Invalid id" });
  }

  try {
    const oldProduct = await Product.findOne({ _id: id });

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      product,
      {
        new: true,
      }
    );
    res
      .status(200)
      .json({ message: "successfully updated", data: updatedProduct });
  } catch (error) {
    console.log(`Error: trying to edit a product!`);
    res.status(500).json({ message: error.message });
  }
};

export const findByName = async (req, res) => {
  const { query } = req.params;

  try {
    const product = await Product.findOne({ name: query });
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: `Product found`, data: product });
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: `Internal error: ${error.message}` });
  }
};
