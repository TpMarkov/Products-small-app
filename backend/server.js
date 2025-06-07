import express from "express";
import { connectDB } from "./config/db.js";
import productsRoute from "./routes/products.route.js";

const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json()); // Allows us to parse JSON data from incoming requests

// routes
app.get("/", (req, res) => {
  res.status(200).send(`Hello from the server!`);
});

// Listen if the server is running
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
  connectDB();
});

// Allows us to use all the request types for the products -> from here move to the products.route.js to see further info
app.use("/api/products", productsRoute);
