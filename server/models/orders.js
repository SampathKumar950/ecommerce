import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  quantity: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  shippingAddress: {
    type: String ,  default:'hyderabad'
  },
  productImage:{type:String},
  deliveryDate:{type:String, default:'10/02/2025'},
  orderStatus: {
    type: String,
    enum: ['pending','confirmed','packed', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  transactionId:{type:String, default:'XXXXX-XXXXX'},
  productName: {type:String, default:'Product'},
  showReviewBox: {type:Boolean , default: false},
  reviewSubmitted: {type:Boolean , default: false},
  product: {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
  vendor:{type:mongoose.Schema.Types.ObjectId, ref:'Vendor'},
  review:{type:mongoose.Schema.Types.ObjectId, ref:'Review'},
  rating: {type:Number},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
