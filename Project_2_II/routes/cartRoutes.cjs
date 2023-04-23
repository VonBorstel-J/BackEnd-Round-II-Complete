// const router = require("express").Router();
// const Cart = require("../models/cartModel");
// const Product = require("../models/products");
// const User = require("../models/user");

// // Get cart
// router.get("/cart", async (req, res) => {
//   try {
//     const cart = await Cart.findOne();
//     if (!cart) {
//       return res.status(200).json({ items: [], total: 0 });
//     }

//     // Populate products in cart items
//     await cart.populate("items.product").execPopulate();

//     res.status(200).json({ items: cart.items, total: cart.total });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "Server Error" });
//   }
// });

// // Add item to cart
// router.post("/cart/items", async (req, res) => {
//   try {
//     const productId = req.body.productId;
//     const cart = await Cart.findOne();
//     let item;

//     if (!cart) {
//       // Create a new cart with the added item
//       item = { product: productId, quantity: 1 };
//       cart = new Cart({ items: [item] });
//     } else {
//       // Add the item to the existing cart
//       const existingItemIndex = cart.items.findIndex(
//         (item) => item.product.toString() === productId.toString()
//       );
//       if (existingItemIndex !== -1) {
//         // Increase quantity of existing item
//         cart.items[existingItemIndex].quantity += 1;
//       } else {
//         // Add new item to cart
//         item = { product: productId, quantity: 1 };
//         cart.items.push(item);
//       }
//     }

//     // Update cart total
//     const product = await Product.findById(productId);
//     cart.total += product.price;

//     await cart.save();

//     console.log(`Added item with ID ${productId} to cart.`); // new console log

//     res.status(201).json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });

// // Remove item from cart
// router.delete("/cart/items/:id", async (req, res) => {
//   try {
//     const cart = await Cart.findOne();
//     if (!cart) {
//       return res.status(404).send("Cart not found");
//     }

//     // Remove item from cart
//     const itemId = req.params.id;
//     const itemIndex = cart.items.findIndex((item) => item.id === itemId);
//     if (itemIndex === -1) {
//       return res.status(404).send("Item not found in cart");
//     }

//     const item = cart.items[itemIndex];
//     cart.items.splice(itemIndex, 1);

//     // Update cart total
//     const product = await Product.findById(item.product);
//     cart.total -= product.price * item.quantity;

//     await cart.save();

//     res.json(cart);
//   } catch (err) {
//     console.error(err);
//     res.status(500).send("Server Error");
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const Cart = require("../models/cart.cjs");

// Middleware to check if cart item exists
const cartItemExists = async (req, res, next) => {
  try {
    const cartItem = await Cart.findOne({ productId: req.body.productId });
    if (cartItem) {
      return res.status(400).json({ message: "Product already in cart" });
    }
    next();
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
};

// Get all cart items
router.get("/cart", async (req, res) => {
  try {
    const cartItems = await Cart.find();
    res.json(cartItems);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Add a product to cart
router.post(
  "/cart",
  [
    check("productId", "Product ID is required").not().isEmpty(),
    check("name", "Product name is required").not().isEmpty(),
    check("price", "Product price is required").isNumeric(),
    check("quantity", "Quantity is required").isInt({ gt: 0 }),
  ],
  cartItemExists,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { productId, name, price, quantity } = req.body;

    try {
      const newCartItem = new Cart({
        productId,
        name,
        price,
        quantity,
      });

      const cartItem = await newCartItem.save();
      res.json(cartItem);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server error");
    }
  }
);

// Update cart item by product ID
router.put("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { quantity } = req.body;

    const cartItem = await Cart.findOneAndUpdate(
      { productId },
      { $set: { quantity } },
      { new: true }
    );

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

// Delete cart item by product ID
router.delete("/cart/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const cartItem = await Cart.findOneAndDelete({ productId });

    if (!cartItem) {
      return res.status(404).json({ message: "Cart item not found" });
    }

    res.json(cartItem);
  } catch (err) {
    console.error(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
