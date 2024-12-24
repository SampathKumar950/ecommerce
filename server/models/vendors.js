import mongoose from 'mongoose';

const vendorSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  role: { type: String, enum: ['vendor'], default: 'vendor' },
  businessName: { type: String, required: true },
  products: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
  }],
  orders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Order',
  }],
  salesReports: [{
    month: String,
    year: Number,
    totalSales: Number,
    totalOrders: Number,
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Vendor = mongoose.model('Vendor', vendorSchema);
export default Vendor;
