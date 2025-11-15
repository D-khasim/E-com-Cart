// models/cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema(

  {
    id: String,
    name: String,
    price: Number,
    image: String,
    quantity: Number,
  }
);

export default mongoose.model('Cart', cartSchema);
