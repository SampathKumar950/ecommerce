import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User
  products: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' }, // Reference to Product
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
  }],
  totalAmount: { type: Number, required: true },
  paymentStatus: { type: String, enum: ['pending', 'paid', 'failed'], default: 'pending' },
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    zip: String,
  },
  orderStatus: {
    type: String,
    enum: ['pending', 'shipped', 'delivered', 'cancelled'],
    default: 'pending',
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Order = mongoose.model('Order', orderSchema);
export default Order;
