import Product from "../models/productModel.js";

// ✅ Get all products
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Get single product
export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

// ✅ Create product 
export const createProduct = async (req, res) => {
  try {
    const existingProduct = await Product.findOne({ name: req.body.name });
    if (existingProduct) {
        return res.status(400).json({ message: "Product already exists" });
    }
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
};

// ✅ Delete product
export const deleteProduct = async (req,res)=> {
  try {
    const {productid} =req.params;
    await Product.findByIdAndDelete({_id:productid});
    res.status(200).json({message:`Product with id ${productid} deleted successfully`});
  } catch (error) {
    res.status(400).json({ message: "Invalid data", error: error.message });
  }
}

