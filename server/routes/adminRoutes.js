import express from "express";
import { isAdmin } from "../middlewares/adminMiddleware.js";
import { verifyToken } from "../middlewares/authMiddleware.js";
import Vendor from "../models/vendors.js";
import Review from "../models/reviews.js";
import User from "../models/users.js";
import Product from "../models/products.js";
import Order from "../models/orders.js";
import mongodb from 'mongodb';
const { ObjectId } = mongodb;


const router = express.Router();

//CREATED :- GET ALL VENDOR REQUESTS, ACCEPT VENDOR REQUEST, DELETE USER REVIEW

//--------------------------------------------------------------------------------------------------
//Get All Users
router.get("/users",verifyToken,isAdmin,async(req,res)=>{
    try{
        const users = await User.find({role:"user"});
        res.json({users: users});
    }catch(error){
        res.json({message: "Error at get all users by admin"});
    }
})
//Delete User
router.delete("/deleteUser", verifyToken, isAdmin, async (req, res) => {
    const {userId} =  req.query;
    try {
      const user = await User.findByIdAndDelete(userId);
  
      if (!user) {
        return res.json({ message: 'User not found'});
      }

      res.json({ message: 'User deleted successfully'});
    } catch (error) {
      res.json({ message: 'error at deleting product by vendor' });
    }
});
//Get All Vendors
router.get("/vendors",verifyToken,isAdmin,async(req,res)=>{
    try{
        const vendors = await Vendor.find({role:"vendor"}).populate('user');
        res.json({vendors: vendors});
    }catch(error){
        res.json({message: "Error at get all vendors by admin"});
    }
});
//Delete Vendor
router.delete("/deleteVendor", verifyToken, isAdmin, async (req, res) => {
    const {vendorId} =  req.query;
    try {
      const vendor = await Vendor.findByIdAndDelete(vendorId);
  
      if (!vendor) {
        return res.json({ message: 'User not found'});
      }
      const user = await User.findById(vendor.user);
      user.role = 'user';
      await user.save();
      
      res.json({ message: 'User deleted successfully'});
    } catch (error) {
      res.json({ message: 'error at deleting product by vendor' });
    }
});
//Get All Orders
router.get("/orders",verifyToken,isAdmin,async(req,res)=>{
    try{
        const orders = await Order.find().populate('user').populate({
            path:'vendor',
            populate:{
                path:'user'
            }
        });
        const vendors = await Vendor.find().populate('user');
        res.json({orders: orders,vendors:vendors});
    }catch(error){
        res.json({message: "Error at get all vendors by admin"});
    }
})
//Get All VendorsRequests
router.get("/requests",verifyToken,isAdmin,async(req,res)=>{
    try{
        const user = await Vendor.find({role:"user"}).populate('user');
        const withdraw = await Vendor.find({role:"withdraw"}).populate('user');
        res.json({user:user,withdraw:withdraw});
    }catch(error){
        res.json({message: "Error at get all vendors by admin"});
    }
})
//Get All Products
router.get("/products",verifyToken,isAdmin,async(req,res)=>{
    try{
    //     const result = await Product.updateMany(
    //         {}, // Empty filter to update all documents
    //         { 
    //           $set: { vendor: new ObjectId("676bc4a1fd7373b31f679e0e") } // Set the vendor field to the given ObjectId
    //         }
    //       );
        const products = await Product.find().populate("vendor");
        console.log(products);
        res.json({products: products});
    }catch(error){
        console.log(error.message);
        res.json({message: "Error at get all users by admin"});
    }
})
//Get all  vendor requests
router.get("/getRequest",verifyToken,isAdmin,async(req,res)=>{
    try{
        const vendors = await Vendor.find({role:"user"});
        res.status(200).json({vendorList:vendors});
    }catch(error){
        res.status(500).json({message:"error at get all request by admin", error});
    }
});
router.get('/bestRated', async (req, res) => {
    try {
        // Fetch products where the category matches and sort by rating in descending order
        const products = await Product.find()
            .sort({ rating: -1 })  // Sort by rating in descending order
            .limit(5);  // Limit to the first 10 products
        // console.log(products);
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.json({ message: "Error at getting products" });
    }
  });
  router.get('/bestSold', async (req, res) => {
    try {
        // Fetch products where the category matches and sort by rating in descending order
        const products = await Product.find()
            .sort({ sold: -1 })  // Sort by rating in descending order
            .limit(5);  // Limit to the first 10 products
        // console.log(products);
        res.status(200).json({ message: "Products fetched successfully", products });
    } catch (error) {
        res.json({ message: "Error at getting products" });
    }
  });
//Accept vendor request
router.post("/acceptRequest",verifyToken,isAdmin,async(req,res)=>{
    const {vendorId} = req.body;
    try{
        const vendor = await Vendor.findById(vendorId);
        vendor.role = "vendor";
        await vendor.save();
        const user = await User.findById(vendor.user);
        user.role = "vendor";
        await user.save();
        res.status(200).json({message:"vendor request accepted"});
    }catch(error){
        res.status(500).json({message:"error at accepting vendor request by admin", error});
    }
});
//reject vendor request
router.post("/rejectRequest",verifyToken,isAdmin,async(req,res)=>{
  const {vendorId} = req.body;
  try{
      const vendor = await Vendor.findByIdAndDelete(vendorId);
      res.status(200).json({message:"vendor request rejected"});
  }catch(error){
      res.status(500).json({message:"error at accepting vendor request by admin", error});
  }
});
//Delete User Review
router.delete("/deleteReview",verifyToken,isAdmin,async(req,res)=>{
    const {reviewId} = req.body;
    try{
        const review = await Review.findByIdAndDelete(reviewId);
        const user = await User.findById(review.user);
        await user.reviews.pull(reviewId);
        await user.save();
        const product = await Product.findById(review.product);
        await product.reviews.pull(reviewId);
        await product.save();
        res.status(200).json({message:"review deleted successfully by admin",review});
    }catch(error){
        res.status(500).json({message:"error at deleting review by admin", error})
    }
});
//Accept WithDraw Request ----Need To Be checked----
router.get("/getWithdraw",verifyToken,isAdmin,async(req,res)=>{
    try{
        const vendors = await Vendor.find({role:"withdraw"});
        res.status(200).json({vendorList:vendors});
    }catch(error){
        res.status(500).json({message:"error at get all withdraw request by admin", error});
    }
});
//Accept vendor withDraw requests
router.post("/acceptWithdraw",verifyToken,isAdmin,async(req,res)=>{
    const {vendorId} = req.body;
    try{

        const vendor = await Vendor.findByIdAndDelete(vendorId);
        const user = await User.findById(vendor.user);
        user.role = "user";
        await user.save();
        // Update all products with the specified category inactive
        const result = await Product.deleteMany(
        { vendor : vendor._id}    
        );
        console.log(result);

        res.status(200).json({message:"vendor WithDraw request accepted by Admin"});
    }catch(error){
        res.status(500).json({message:"error at accepting vendor WithDraw request by admin", error});
    }
});

//reject vendor Withdraw
router.post("/rejectWithdraw",verifyToken,isAdmin,async(req,res)=>{
  const {vendorId} = req.body;
  try{
      const vendor = await Vendor.findById(vendorId);
      vendor.role = "vendor";
      await vendor.save();
      res.status(200).json({message:"vendor withdraw rejected"});
  }catch(error){
      res.status(500).json({message:"error at accepting vendor request by admin", error});
  }
});

//Users Graph
router.get('/graph', verifyToken, isAdmin, async (req, res) => {
    try {
      const currentYear = new Date().getFullYear(); // Get the current year
    
      // Fetch new users by month
      const userResult = await User.aggregate([
        { 
          $match: {
            $expr: { $eq: [{ $year: "$createdAt" }, currentYear] }, // Filter for current year
          }
        },
        {
          $project: {
            month: { $month: "$createdAt" },
          },
        },
        {
          $group: {
            _id: "$month", // Group by month
            newUserCount: { $sum: 1 }, // Count the number of new users
          },
        },
        {
          $sort: { "_id": 1 },
        },
      ]);
  
      // Ensure that all months are returned, even if no new users were added
      const months = Array.from({ length: 12 }, (_, i) => i + 1); // months 1 to 12
  
      // Create an array of new user counts for each month
      const newUserData = months.map(month => {
        const monthData = userResult.find(r => r._id === month);
        return monthData ? monthData.newUserCount : 0; // If no new users in that month, return 0
      });
  
      // Send the response with only new user data
      res.json({
        success: true,
        newUserData: newUserData, // Array of new user counts for each month
      });
    
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  router.get('/adminPie', verifyToken, isAdmin, async (req, res) => {
        console.log('hi');
        const allowedCategories = ['electronics', 'Fashion', 'Sports', 'Furniture', 'Beauty','Kids'];
    try {
      const result = await Product.aggregate([
        // Unwind the category array (flatten the categories for each product)
        {
          $unwind: "$category",
        },
         // Match only allowed categories
        {
          $match: {
            category: { $in: allowedCategories },  // Only include products in the specified categories
          },
        },
        // Group by category and count the number of products in each category
        {
          $group: {
            _id: "$category",  // Group by category
            count: { $sum: 1 }, // Count the number of products in each category
          },
        },
  
        // Sort by category name (optional)
        {
          $sort: { "_id": 1 },  // Sort alphabetically by category name
        },
      ]);
  
      console.log(result);
      // Extract just the count values into an array
      const countArray = allowedCategories.map(category => {
        const categoryData = result.find(r => r._id === category);
        return categoryData ? categoryData.count : 0;
      });
      
      console.log(countArray);

      // Send the count array as the response
      res.json({
        success: true,
        categoryCount: countArray, // Array of counts for each category
      });
  
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  
  router.get('/dashBoard', verifyToken, isAdmin, async (req, res) => {
  
    try {
      const currentYear = new Date().getFullYear(); // Get the current year
  
      const result = await Order.aggregate([
        // Match orders for the given vendor and the current year
        { 
          $match: {
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
          const orderCount = await Order.countDocuments();
  
          // 2. Inventory Count (Number of products in the vendor's inventory)
          const inventoryCount = await Product.countDocuments();
      
         // Customer Count (Unique users who have placed orders for the vendor)
          const customerIds = await Order.distinct("user");
          const customerCount = customerIds.length;
          console.log(customerCount);
  
          // 4. Revenue (Total order value for the vendor)
          const revenueResult = await Order.aggregate([
            {
              $group: {
                _id: null, // No grouping (just sum the revenue)
                totalRevenue: { $sum: "$totalAmount" }
              }
            }
          ]);
          const revenue = revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;
          
      res.json({
        success: true,
        revenueData: revenueData,
        orderCount,
        inventoryCount,
        customerCount,
        revenue,
      });
      
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ success: false, message: error.message });
    }
  });
  

//Order by user

//----------------------------------------------------------------------------------------------
//Sample for get Reviews(Testing purpose):
router.get("/reviews",async(req,res)=>{
    try{
        const reviews = await Review.find();
        res.status(200).json({reviews});
    }catch(error){
        res.status(500).json({error});
    }
});
export default router;
