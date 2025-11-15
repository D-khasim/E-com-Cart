import express from "express";
import corss from "cors";
import dotenv from "dotenv"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"


dotenv.config();
const app=express();
app.use(express.json());
app.use(corss())
import connectDB from "./config/db.js";

connectDB();


app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.listen(5000,()=>{
  console.log('Server is running on port 5000');  
})

