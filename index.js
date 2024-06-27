import express from "express"

import {config} from "dotenv"
import productsRouter from "./routes/products.routes.js";
const app = express();
app.use(express.json());
app.use("/products",productsRouter)
app.listen(3001,() => {
    console.log("App running on port 3001");
})
config();