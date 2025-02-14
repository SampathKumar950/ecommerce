import mongoose from 'mongoose';

const adminSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to User model
  role: { type: String, enum: ['admin'], default: 'admin' },
  permissions: [{
    type: String,
    enum: ['manageUsers', 'manageVendors', 'manageOrders', 'viewReports'],
  }],
  requests:[{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

const Admin = mongoose.model('Admin', adminSchema);
export default Admin;
