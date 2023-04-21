const express = require('express');
const router = express.Router();
const Product = require('../models/products'); 
const Cart = mongoose.model('Cart', cartSchema);
const mongoose = require('mongoose');

router.get('/', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.post('/items', async (req, res) => {
  try {
    const product = await Product.findById(req.body.productId);
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items.push({ product: product._id, quantity: 1 });
    await cart.save();
    res.json(cart);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

router.delete('/items/:id', async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id });
    cart.items = cart.items.filter(item => item.id !== req.params.id);
    await cart.save();
    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});



const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});



module.exports = Cart;
module.exports = router;
