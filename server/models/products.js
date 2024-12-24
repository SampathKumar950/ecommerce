import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  category: { type: String, required: true },
  brand: String,
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, // Discount %
  stockQuantity: { type: Number, required: true },
  images: [{ type: String }], //  image URLs
  ratings: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    rating: { type: Number, min: 1, max: 5 },
    review: String,
    createdAt: { type: Date, default: Date.now },
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
