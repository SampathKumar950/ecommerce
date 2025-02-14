import express from "express";
import {isVendor} from "../middlewares/vendorMiddleware.js"
import { verifyToken } from "../middlewares/authMiddleware.js";
import Product from "../models/products.js";
import Vendor from "../models/vendors.js";
import User from "../models/users.js";
import mongoose from 'mongoose';
import Order from '../models/orders.js';
import Review from '../models/reviews.js';

const router = express.Router();

//CREATED :- CREATE PRODUCT BY VENDOR, DELETE PRODUCT BY VENDOR , UPDATE PRODUCT BY VENDOR

//NEED TO CREATE ORDER STATUS UPDATE
//-------------------------------------------------------------------------------------------------
// Create a new product (Vendor only)
router.post("/createProduct", verifyToken , isVendor, async (req, res) => {
    const { name, description, price, brand, image, stockQuantity } = req.body;
   //validation should be added here, if any required;
   console.log('hi');
   const category = [req.body.category];
    try {
      const newProduct = new Product({
        name,
        description,
        price,
        category,
        brand,
        image,
        stockQuantity,
        vendor: req.vendorId._id, // Link the product to the vendor (user)
      });
      
      await newProduct.save();
      console.log("hi");
      // pushing the new product id into vendor profile;
      const vendor = await Vendor.findById(req.vendorId._id);
      vendor.products.push(newProduct._id);
      await vendor.save();

      res.json({ message: 'Product created successfully', product: newProduct });
    } catch (error) {
    
      res.json({ message: 'error at creation of product by vendor', error });
    }
});

// Delete product (Vendor only)
router.delete("/deleteProduct", verifyToken, isVendor, async (req, res) => {
    const {productId} =  req.query;
    try {
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found'});
      }
  
      // Check wheather if the logged-in vendor is the owner of the product or not
      if (product.vendor.toString() !== req.vendorId._id.toString()) {
        return res.status(403).json({ message: 'Not authorized to delete this product' });
      }
      // deleting  product id from vendor profile;
      const vendor = await Vendor.findById(req.vendorId)
      await vendor.products.pull(productId);
      await vendor.save();
      await Product.findByIdAndDelete(productId);
      res.json({ message: 'Product deleted successfully',productId,product});
    } catch (error) {
      res.json({ message: 'error at deleting product by vendor' });
    }
});


//Update product Details(vendor only)

router.put("/updateProduct", verifyToken, isVendor, async(req,res) => {
    const { name, description, price, category, brand, stockQuantity,discount } = req.body;
    //validation should be added here, if any required;
    try {
      const product = await Product.findById(req.body._id);
      if (!product) {
        return res.status(404).json({ message: "Product not found to update" });
      }
    
      // Make sure the vendor is authorized to update the product
      if (product.vendor.toString() !== req.vendorId._id.toString()) {
        return res.status(403).json({ message: "Not authorized to update this product" });
      }
    
      // Perform the update
      product.name = req.body.name || product.name;
      product.price = req.body.price || product.price;
      product.discount = req.body.discount || product.discount;
      product.stockQuantity = req.body.stockQuantity || product.stockQuantity;
      product.category = req.body.category || product.category;
      product.brand = req.body.brand || product.brand;
      product.images = req.body.images || product.images;
      product.description = req.body.description || product.description;
      product.updatedAt = Date.now(); // Ensure the updatedAt field is updated
    
      await product.save();
      return res.status(200).json({ message: 'Product updated successfully', product });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Error updating product', error: error.message });
    }
    
  
});

router.get('/bestRated',verifyToken,isVendor, async (req, res) => {
  try {
      const vendorId = req.vendorId._id;
      // Fetch products where the category matches and sort by rating in descending order
      const products = await Product.find({vendor:vendorId})
          .sort({ rating: -1 })  // Sort by rating in descending order
          .limit(5);  // Limit to the first 10 products
      // console.log(products);
      res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
      res.json({ message: "Error at getting products" });
  }
});
router.get('/bestSold',verifyToken,isVendor, async (req, res) => {
  try {
      const vendorId = req.vendorId._id;
      // Fetch products where the category matches and sort by rating in descending order
      const products = await Product.find({vendor:vendorId})
          .sort({ sold: -1 })  // Sort by rating in descending order
          .limit(5);  // Limit to the first 10 products
      // console.log(products);
      res.status(200).json({ message: "Products fetched successfully", products });
  } catch (error) {
      res.json({ message: "Error at getting products" });
  }
});




//WithDraw from Being Vendor -----------Need To be Tested
router.put('/withdraw',verifyToken,isVendor, async(req,res)=> {
    try{
      const vendor = await Vendor.findById(req.vendorId);
      if(vendor.role==='withdraw'){
        res.status(200).json({message: "your request already in process..."});
      }
      vendor.role = 'withdraw';
      await vendor.save();
      res.status(200).json({message: "your request to withdraw as vendor is Sent"});
    }catch(error){
      res.status(500).json({message:"error while requesting to withdraw as Vendor...",error});
    }
});

router.get('/inventory', verifyToken, isVendor, async (req, res) => {
  // const page = parseInt(req.query.page) || 1;    // Default to page 1 if not provided
  // const size = parseInt(req.query.size) || 5;    // Default to 5 items per page if not provided
  const vendorId = req.vendorId._id;
  // const offset = (page - 1) * size;  // Calculate the offset

   console.log(vendorId);
  try {
    const products = await Product.find({vendor:vendorId});
    //const products = await Vendor.findById(vendorId).populate('product');
    res.status(200).json({products});
  } catch (err) {
    console.log('error');
    res.json({ message: 'Error fetching vendor products' });
  }
});

router.get('/orders',verifyToken,isVendor,async(req,res) =>{
  const vendorId = req.vendorId._id;
  try{
    console.log(vendorId);
    const orders = await Order.find({vendor:vendorId}).populate('product');
    res.json({orders});
  }catch(err){
    console.log('error');
    res.json({message: 'Error fetchinf vendor Orders'});
  }
})

router.put('/editOrder', verifyToken, isVendor, async (req, res) => {
  const { id, status } = req.body;
  try {
    // Validate the status value
    if (!['pending', 'confirmed', 'packed','shipped', 'delivered', 'cancelled'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status value' });
    }

    const updatedOrder = await Order.findOneAndUpdate(
      { _id: id },
      { orderStatus: status }, // update status field
      { new: true } // return the updated document
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Send success response with updated order
    res.json({
      message: 'Order status updated successfully',
      order: updatedOrder
    });

  } catch (err) {
    console.error('Error:', err); // Log the error for debugging
    res.status(500).json({ message: 'Error updating order status', error: err.message });
  }
});

router.get('/reviews',verifyToken,isVendor,async(req,res)=>{
  const vendorId = req.vendorId._id;
  try{
    const reviews = await Review.find({vendor:vendorId});
    res.json({message:'reviews send successfully', reviews});
  }catch(err){
    console.log(err.message);
    res.json({message: 'error at fetching reviews'});
  }
})

router.put('/editReply',verifyToken,isVendor,async(req,res)=>{
  const {reviewId,replyTextValue} = req.body;
  try{
    console.log('hi');
    const review = await Review.findById(reviewId);
    review.reply = replyTextValue;
    await review.save();
    res.json({message:'reviews send successfully', review});
  }catch(err){
    console.log(err.message);
    res.json({message: 'error at fetching reviews'});
  }
})


router.get('/dashBoard', verifyToken, isVendor, async (req, res) => {
  const vendorId = req.vendorId._id; // Get vendor ID from the token

  try {
    const currentYear = new Date().getFullYear(); // Get the current year

    const result = await Order.aggregate([
      // Match orders for the given vendor and the current year
      { 
        $match: {
          vendor: new mongoose.Types.ObjectId(vendorId),
          $expr: { $eq: [{ $year: "$createdAt" }, currentYear] }, // Filter for current year
        }
      },
      
      // Project to get the month from the createdAt date
      {
        $project: {
          totalAmount: 1,
          month: { $month: "$createdAt" },
        },
      },

      // Group by month to get the total revenue for each month
      {
        $group: {
          _id: "$month", // Group by month
          totalRevenue: { $sum: "$totalAmount" }, // Calculate total revenue for each month
        },
      },

      // Sort by month in ascending order
      {
        $sort: { "_id": 1 },
      },
    ]);

    // Ensure that all months are returned, even if no orders were placed in that month
    const months = Array.from({ length: 12 }, (_, i) => i + 1); // months 1 to 12

    // Create an array of total revenue for each month
    const revenueData = months.map(month => {
      const monthData = result.find(r => r._id === month); // Find the data for the current month
      return monthData ? monthData.totalRevenue : 0; // If no data for the month, return 0
    });
    // Send the revenue data as the response
        // 1. Order Count
        const orderCount = await Order.countDocuments({ vendor: vendorId });

        // 2. Inventory Count (Number of products in the vendor's inventory)
        const inventoryCount = await Product.countDocuments({ vendor: vendorId });
    
       // Customer Count (Unique users who have placed orders for the vendor)
        const customerIds = await Order.distinct("user", { vendor: vendorId });
        const customerCount = customerIds.length;
        console.log(customerCount);

        // 4. Revenue (Total order value for the vendor)
        const revenueResult = await Order.aggregate([
          { 
            $match: { vendor: new mongoose.Types.ObjectId(vendorId) },
          },
          {
            $group: {
              _id: null, // No grouping (just sum the revenue)
              totalRevenue: { $sum: "$totalAmount" }
            }
          }
        ]);
        const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
        // 5. Store Rating (Average product rating for the vendor)
    const ratingsResult = await Product.aggregate([
      { 
        $match: { vendor: new mongoose.Types.ObjectId(vendorId) },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" }
        }
      }
    ]);
    const storeRating = ratingsResult.length > 0 ? ratingsResult[0].averageRating : 0;

    // 6. Out-of-Stock Products (Count of products with zero stock)
    const outOfStock = await Product.countDocuments({
      vendor: vendorId,
      stockQuantity: { $eq: 0 }
    });

    // 7. Product Reviews (Count of reviews for the vendor's products)
    const productReviews = await Review.countDocuments({
      vendor: vendorId
    });

    const recentOrders = await Order.find({vendor:vendorId})
          .sort({ createdAt: -1 })  // Sort by rating in descending order
          .limit(5);  // Limit to the first 10 products

    res.json({
      success: true,
      revenueData: revenueData,
      orderCount,
      inventoryCount,
      customerCount,
      revenue,
      storeRating,
      outOfStock,
      productReviews,
      recentOrders
    });
    
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});

router.get('/dashBoardPie', verifyToken, isVendor, async (req, res) => {
  const vendorId = req.vendorId._id; // Get vendor ID from the token

  try {
    // The order statuses we want to count
    const statuses = ['pending', 'confirmed', 'shipped', 'packed', 'cancelled'];

    const result = await Order.aggregate([
      // Match orders for the given vendor
      { 
        $match: {
          vendor: new mongoose.Types.ObjectId(vendorId),
        },
      },
      
      // Group by orderStatus and count the number of orders for each status
      {
        $group: {
          _id: "$orderStatus",  // Group by orderStatus
          count: { $sum: 1 },    // Count the number of orders in each status
        },
      },
      
      // Sort by orderStatus to make sure we can return them in a specific order
      {
        $sort: { "_id": 1 }, // Sort by orderStatus (ascending order)
      },
    ]);

    // Create an array of counts for each status
    const statusCount = statuses.map(status => {
      const statusData = result.find(r => r._id === status);
      return statusData ? statusData.count : 0; // If no orders in this status, return 0
    });
    console.log(statusCount);
    // Send the count data as the response
    res.json({
      success: true,
      statusCount: statusCount, // Array of counts for each status
    });

  } catch (error) {
    console.log(error.message);
    res.status(500).json({ success: false, message: error.message });
  }
});


//---------------------------------------------------------------------------------------------------
// sample code for adding vendor, for testing purpose
router.post("/addVendor",async(req,res)=>{
  const {user,businessName} = req.body;
  const vendor = new Vendor({
    user,
    businessName
  });
  console.log("hi");
  await vendor.save();
  res.status(200).json({message: "worked"});
});

export default router;