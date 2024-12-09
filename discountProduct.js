const mongoose = require('mongoose');

const discountProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  originalPrice: { type: Number, required: true },
  discountPrice: { type: Number, required: true },
  discountPercentage: { type: String, required: true }, 
  image: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const DiscountProduct = mongoose.models.DiscountProduct || mongoose.model('DiscountProduct', discountProductSchema);

module.exports = DiscountProduct;
