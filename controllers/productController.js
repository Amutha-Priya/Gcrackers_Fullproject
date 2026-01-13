const { Product } = require("../models");

const fs = require('fs'); // optional if you want to delete old images
// GET all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

// CREATE product
exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.createMultipleProducts = async (req, res) => {
  try {
    const products = await Product.bulkCreate(req.body);
    res.status(201).json({
      success: true,
      data: products,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      Product_name,
      Product_name_tamil,
      Product_price,
      Product_category,
    } = req.body;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // If new image uploaded, update it
    if (req.file) {
      product.Product_image = req.file.path;
    }

    product.Product_name = Product_name;
    product.Product_name_tamil = Product_name_tamil;
    product.Product_price = Product_price;
    product.Product_category = Product_category;

    await product.save();

    res.status(200).json({
      message: "✅ Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("Update error:", error);
    res.status(500).json({ message: "❌ Update failed" });
  }
};
exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    await product.destroy();

    res.status(200).json({
      message: "🗑️ Product deleted successfully",
    });
  } catch (error) {
    console.error("Delete error:", error);
    res.status(500).json({ message: "❌ Delete failed" });
  }
};
