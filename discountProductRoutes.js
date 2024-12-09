const express = require('express');
const mongoose = require('mongoose');
const DiscountProduct = require('../models/discountProduct');
const authenticateUser = require('../middleware/authenticateUser'); // JWT authentication middleware

const router = express.Router();

// Fetch all discount products
router.get('/', async (req, res) => {
  try {
    const discountProducts = await DiscountProduct.find({});
    res.json(discountProducts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Fetch single discount product by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log('Received ID:', id); // Log the ID being queried

    const product = await DiscountProduct.findById(id);

    if (!product) {
      console.log('Product not found with this ID');
      return res.status(404).json({ error: 'Product not found' });
    }

    console.log('Product found:', product);
    res.json(product);
  } catch (error) {
    console.error('Error fetching product details:', error);
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;
