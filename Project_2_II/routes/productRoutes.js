const express = require('express');
const router = express.Router();

// Route to get all products
router.get('/products', (req, res) => {
  // code to get all products from database using Mongoose
  res.send('This route will display all products');
});

// Route to get a specific product
router.get('/products/:id', (req, res) => {
  // code to get a specific product from database using Mongoose
  res.send(`This route will display product with id ${req.params.id}`);
});

// Route to add a new product
router.post('/products', (req, res) => {
  // code to add a new product to the database using Mongoose
  res.send('This route will add a new product');
});

// Route to update a product
router.put('/products/:id', (req, res) => {
  // code to update a product in the database using Mongoose
  res.send(`This route will update product with id ${req.params.id}`);
});

// Route to delete a product
router.delete('/products/:id', (req, res) => {
  // code to delete a product from the database using Mongoose
  res.send(`This route will delete product with id ${req.params.id}`);
});

module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../models/product');

// Read all products
router.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.render('products', { products });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Read one product
router.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.render('product', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Create a product
router.post('/products', async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.redirect(`/products/${product.id}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update a product
router.put('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Delete a product
router.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
