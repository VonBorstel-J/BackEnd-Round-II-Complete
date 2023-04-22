const express = require("express");
const router = express.Router();
const Product = require("../models/products");

//Admin Support
const isAdmin = (req, res, next) => {
  if (!req.user || !req.user.isAdmin) {
    return res.status(401).send("Unauthorized");
  }
  next();
};

// Get all products
router.get("/", async (req, res) => {
  try {
    const perPage = 9; // number of products to display per page
    const page = req.query.page || 1; // default to first page

    const products = await Product.find()
      .skip((perPage * page) - perPage)
      .limit(perPage);
    const count = await Product.countDocuments();
    res.render("products/index", {
      products: products,
      current: page,
      pages: Math.ceil(count / perPage)
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Search products
router.get("/search", async (req, res) => {
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
router.get("/:id", async (req, res) => {
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

// Create a new product page
router.get("/add", isAdmin, (req, res) => {
  res.render("add-product");
});

// Create a new product
router.post("/", isAdmin, async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
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
