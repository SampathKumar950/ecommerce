import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  order: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
  amount: { type: Number, required: true },
  paymentMethod: { type: String, enum: ['credit/debit', 'UPI', 'wallet'], required: true },
  paymentStatus: { type: String, enum: ['success', 'failed', 'pending'], default: 'pending' },
  transactionDate: { type: Date, default: Date.now },
});

const Transaction = mongoose.model('Transaction', transactionSchema);
export default Transaction;
