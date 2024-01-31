import express from "express";
import productRouter from "./routes/Product.js";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
// Import the express and fetch libraries

dotenv.config();

// Create a new express application
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.use(
  cors({
    origin: "https://product-finder-frontend-delta.vercel.app",
    method: "GET",
  })
);

app.use("/", productRouter);

// Start the server on port 3003
const port = 3003;
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
