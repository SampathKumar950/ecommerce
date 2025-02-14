import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
  user: {
    type: String,
  },
  product: {
    type: String,
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  },
  vendor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Vendor',
  },
  rating: {
    type: Number,
    min: 1,
    max: 5, // Ratings are typically between 1 and 5
  },
  comment: {
    type: String,
    maxlength: 500, // Optional: Limit comment length to 500 characters
  },
  reply:{
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now, // The timestamp when the review was created
  },
});

const Review = mongoose.model('Review', reviewSchema);

export default Review;
