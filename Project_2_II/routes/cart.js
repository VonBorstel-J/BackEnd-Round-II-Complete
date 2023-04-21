const express = require('express');
const router = express.Router();
const Product = require('../models/products');
const Cart = require('../models/cartModel');

router.get('/api', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('products');
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/products', async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    const cart = await Cart.findOne({ user: req.user.id });
    cart.products.push(product._id);
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/products/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.products = cart.products.filter(product => product.toString() !== req.params.id);
    await cart.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
