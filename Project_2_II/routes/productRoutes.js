const express = require("express");
const router = express.Router();
const Product = require("../models/products");

// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.render("products", { products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

//Bootstrap Pagination
router.get('/products', async (req, res) => {
  const perPage = 9; // number of products to display per page
  const page = req.query.page || 1; // default to first page

  try {
    const products = await Product.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);
    const count = await Product.countDocuments();
    res.render('products/index', {
      products: products,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (err) {
    console.error(err);
    res.render('error/500');
  }
});

// Search products
router.get("/", async (req, res) => {
  try {
    const q = req.query.q;
    const products = await Product.find({ name: { $regex: q, $options: "i" } });
    res.render("products/index", { products: products });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Get a single product by id
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.render("product", { product });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Create a new product
router.post("/products", async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Update an existing product by id
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Delete an existing product by id
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send("Product not found");
    }
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
