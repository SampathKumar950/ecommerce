import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: { type: String, required: true , default:'product'},
  status: { type: String, enum: ['active', 'inactive'], default: 'active' },
  description:{type: String, default:'This is An Amazing Product'},
  category: [{ type: String}],
  brand: {type:String , default:'brandX'},
  rating: {type:Number, default: 0},
  price: { type: Number, default:1500},
  discount: { type: Number, default: 1 }, // Discount %
  stockQuantity: { type: Number, default: 1 },
  images: [{ type: String }], //  image URLs
  vendor: { type: mongoose.Schema.Types.ObjectId, ref: 'Vendor' },//added new line
  reviews: [
     { type: mongoose.Schema.Types.ObjectId, ref: 'Review' }
  ],
  sold:{type:Number,default:10},
  orderCount: {type: Number, default: 0},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Product = mongoose.model('Product', productSchema);
export default Product;
