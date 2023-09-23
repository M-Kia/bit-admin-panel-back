const express = require("express");
const dotenv = require("dotenv");

// import controllers(routers)
const userRouter = require("./controller/user");
const productRouter = require("./controller/product");
const categoryRouter = require("./controller/category");

// Declare the express app
const app = express();

// Load environment variables from .env file
dotenv.config();

// Set port
const port = process.env.PORT || 3000;

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);

// Listen for requests
app.listen(port, () => console.log(`App listening on port ${port}`));
