const Product = require("../models/Product");
const ProductStats = require("../models/ProductStats");
const User = require("../models/User");

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    const productsWithStats = await Promise.all(
      products.map(async (product) => {
        const stats = await ProductStats.findOne({ productId: product._id });
        return { ...product._doc, stats };
      })
    );
    res.status(200).json(productsWithStats);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({role:"user"}).select("-password")
    res.status(200).json(customers);

  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

module.exports = { getProducts, getCustomers };
