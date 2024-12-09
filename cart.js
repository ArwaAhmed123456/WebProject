const express = require('express');
const mongoose = require('mongoose');
const Cart = require('../models/cart'); // Cart model
const authenticateUser = require('../middleware/authenticateUser'); // JWT authentication middleware
const router = express.Router();

// Get user cart (authentication required)
router.get('/', authenticateUser, async (req, res) => {
  try {
    const userId = req.user; // Extract userId from the request object, set by JWT middleware
    if (!userId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const cart = await Cart.findOne({ userId }).populate('products.productId');
    res.json(cart || { products: [] });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ message: error.message });
  }
});

// Add or update product in the cart (authentication required)
router.post('/', authenticateUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user; // Extract userId from the JWT token

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, products: [] }); // Create new cart if not found
    }

    const existingProductIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );

    if (existingProductIndex !== -1) {
      cart.products[existingProductIndex].quantity += quantity;
    } else {
      cart.products.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart.products);
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ message: error.message });
  }
});

// Remove or decrease product quantity (authentication required)
router.delete('/:productId', authenticateUser, async (req, res) => {
  const userId = req.user; // Extract userId from JWT token
  const { productId } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    const cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.productId.toString() === productId
    );
    if (productIndex === -1) {
      return res.status(404).json({ message: "Product not in cart" });
    }

    if (cart.products[productIndex].quantity > 1) {
      cart.products[productIndex].quantity -= 1;
    } else {
      cart.products.splice(productIndex, 1); // Remove product if quantity <= 1
    }

    await cart.save();
    res.json(cart.products);
  } catch (error) {
    console.error("Error removing product from cart:", error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
