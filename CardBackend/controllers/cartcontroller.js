// controllers/cartController.js
import Cart from '../models/cardModel.js';

export const addToCart = async (req, res) => {
  try {
    const { id, name, price, image, quantity } = req.body;
    let cart = await Cart.findOne({id:id});
    
   if(cart) {res.status(400).json({message:"Product already in cart"}); return;}
    if (!cart) {
      cart = new Cart({ id, name, price, image, quantity });
      await cart.save();
      res.json(cart);
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.find();
    if(!cart) res.status(200).json({message:"Cart is empty"});
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

export const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    await Cart.findOneAndDelete({ _id: productId });
    res.status(200).json({ message: `${productId}this cart value is deleted` });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });

  }
};

export const incrementquantity = async (req, res) => {
  try {
    const { productId } = req.params;
    await Cart.updateOne({ _id: productId }, { $inc: { quantity: 1 } });
    res.status(200).json({ message: "Quantity incremented" });

  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });

  }
};

export const decrementquantity = async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findById(productId);
    if(cart.quantity <= 1) return;
    await Cart.updateOne({ _id: productId }, { $inc: { quantity: -1 } });
    res.status(200).json({ message: "Quantity decremented" });
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};