
import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://ecommerce:team5%40password@ecommerce.kjyg8.mongodb.net/?retryWrites=true&w=majority&appName=ecommerce'
    );
    console.log('DB connected');
  } catch (err) {
    console.error('Error at DB connection:', err);
  }
};

export default connectDB;
