const mongoose = require('mongoose');

// Import the Product schema
const Product = require('./product');

// Category Schema
const categorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the category
  image: { type: String, required: true }, // URL of the category image
  description: { type: String, default: '' }, // Optional category description
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product',
    },
  ], // Array of product references
  status: { type: String, enum: ['active', 'inactive'], default: 'active' }, // Category status
  createdAt: { type: Date, default: Date.now }, // When the category was created
});

module.exports = mongoose.model('categories', categorySchema);
