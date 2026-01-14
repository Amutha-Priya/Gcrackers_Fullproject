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

// CREATE product// CREATE product
exports.createProduct = async (req, res) => {
  try {
    if (req.file) {
      req.body.Product_image = `/images/${req.file.filename}`; // relative URL for frontend
    }

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

// UPDATE product
exports.updateProduct = async (req, res) => {
  try {
    console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);

    const product = await Product.findByPk(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // ✅ update image ONLY if new image uploaded
    if (req.file) {
      product.Product_image = `/images/${req.file.filename}`;
    }
    // ❗ else DO NOTHING → keep old image (even if null)

    product.Product_name = req.body.Product_name;
    product.Product_name_tamil = req.body.Product_name_tamil;
    product.Product_price = req.body.Product_price;
    product.Product_category = req.body.Product_category;

    await product.save();

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: product,
    });
  } catch (error) {
    console.error("UPDATE ERROR ❌", error);
    res.status(500).json({ error: error.message });
  }
};

// DELETE product
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
