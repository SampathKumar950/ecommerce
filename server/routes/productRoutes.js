import express from "express";
import Product from "../models/products.js";
import { MongoClient, ObjectId } from 'mongodb';
const router = express.Router();

//Created : Get All Products , GetById
//---------------------------------------------------------------------------------------------------
//Get All Products

// router.get('/getProducts',async(req,res)=>{
//     try{
//         const products = await Product.find();
//         res.json({message:"products fetched successfully",products});
//     }catch(error){
//         res.json({message:"error at getting all products"});
//     }
// });
router.get('/getProducts', async (req, res) => {
  try {
      const { category } = req.query;  // Get category from request body
    
      // Fetch products where the category matches and sort by rating in descending order
      const products = await Product.find({ category: { $in: [category] } })
          .sort({ rating: -1 })  // Sort by rating in descending order
          .limit(10);  // Limit to the first 10 products

      res.json({ message: "Products fetched successfully", products });
  } catch (error) {
      res.json({ message: "Error at getting products" });
  }
});
//Get Product By Id
router.get('/getProduct',async(req,res)=>{
    const {id} = req.query;
   
    try{
        const product = await Product.findById(id).populate('reviews');
        console.log(product);
        res.status(200).json({message:"product fetched successfully",product});
    }catch(error){
        console.log(error.message);
        res.status(500).json({message:"error at getting product by Id",error});
    }
});

router.get('/search', async (req, res) => {
  const { category , discount, rating, availability, name } = req.query;
  const minPrice = req.query.minRange;
  const maxPrice = req.query.maxRange;
  console.log(minPrice, maxPrice, category);

  // Start building the query filter
  let query = {};

  // Filter by name if present
  if (name) {
      query.name = { $regex: name, $options: 'i' };
  }

  // Filter by category if present
  if (category && category !== 'All') {
      query.category = category;
  }

  // Price filter
  if (minPrice || maxPrice) {
      query.price = {};
      
      // Ensure minPrice and maxPrice are parsed as floats
      if (minPrice) {
          query.price.$gte = parseFloat(minPrice);
      }
      if (maxPrice) {
          query.price.$lte = parseFloat(maxPrice);
      }
  } else {
      // If no price filter, set default price range
      query.price = { $gte: 0, $lte: 1000000 };
  }

  // Filter by discount if present
  if (discount) {
      query.discount = { $gte: parseInt(discount) };
  }

  // Filter by rating if present
  if (rating) {
      query.rating = { $gte: parseInt(rating) };
  }

  // Filter by availability if present
  if (availability === 'true') {
      query.stockQuantity = { $gte: 0 };
  } else {
      query.stockQuantity = { $gt: 0 };
  }

  try {
      // Find products based on the query
      const filteredProducts = await Product.find(query);

      // Return the filtered products as response
      res.json(filteredProducts);
  } catch (error) {
      res.status(500).json({ error: 'Error fetching products', message: error.message });
  }
});


// API endpoint to search for products with filters
// router.get('/search', async (req, res) => {
//   try {
//     const {
//       name = '',
//       category = '',
//       minPrice = 0,
//       maxPrice = 100000000,
//       discount = 0,
//       rating = 1,
//       offers = false,
//       availability = true,
//     } = req.query;

//     // Build the query object dynamically based on the filters
//     const query = {};

//     if (name) {
//       query.name = { $regex: name, $options: 'i' }; // Case-insensitive search for name
//     }

//     // If category is not 'All', apply category filter
//     if (category && category !== 'All') {
//       query.category = category;
//     }

//     if (minPrice || maxPrice) {
//       query.price = { $gte: minPrice, $lte: maxPrice }; // Price range filter
//     }

//     if (discount) {
//       query.discount = { $gte: discount }; // Only show products with discount greater than or equal to the specified discount
//     }

//     if (rating) {
//       query.rating = { $gte: rating }; // Only show products with rating greater than or equal to the specified rating
//     }

//     if (offers) {
//       query.offers = true; // Only show products that have an offer
//     }

//     if (availability) {
//       query.stockQuantity = { $gte: 1 }; // Only show products that are in stock
//     }

//     // Fetch the products from the database based on the filter criteria
//     const products = await Product.find(query);

//     // Send the filtered products as the response
//     res.json(products);
//   } catch (err) {
//     console.error('Error fetching products:', err);
//     res.status(500).json({ message: 'Error fetching products', error: err });
//   }
// });

export default router;