import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/users.js";
import { validateEmail,validatePhone,validatePassword } from "../validations/userValidations.js";
import { verifyToken } from "../middlewares/authMiddleware.js"; // JWT Authentication Middleware
import Product from "../models/products.js";
import Vendor from "../models/vendors.js";
import Review from "../models/reviews.js";
import Order from "../models/orders.js";
import { sendVerificationCode,welcomeEmailCode} from "../middlewares/emailConfig.js";

const router = express.Router();

// USER ROUTES CREATED TILL ARE :- REGISTER,LOGIN,GET USER
// PROFILE,UPDATE USER PROFILE,ADD TO WISHLIST,GET WISHLIST
// ,REMOVE PRODUCTS FROM WISHLIST,ADD TO CART ,REMOVE PRODUCT FROM CART(SIMILAR TO WISHLIST),
//REQUESTING TO BECOME VENDOR,CREATE REVIEWS BY USER,DELETE REVIEW BY USER

//NEED TO BE TESTED :-

//NEED TO BE CREATED :- 

//-----------------------------------------------------------------------------------------------------------------


// User Registration
router.post("/validate", async (req, res) => {

  const { username, email, password, phone} = req.body;

  const errors = {};
  console.log("hi");
  if(!username||!email||!password||!phone){
    errors.invalid = "required all fields";
    return res.json({message:"requires all fields",errors});
  }
  // Validate email format
  if (!validateEmail(email)) {
   errors.email = "Invalid email format";
  }

  // Validate password strength
  const validation = validatePassword(password);
  if (validation!=="Success") {
    errors.password = validation;
  }

  // Validate phone number format
  if (!validatePhone(phone)) {
    errors.phone = "Invalid phone number" ;
  }

  if(Object.keys(errors).length>0){
    return res.json({errors}); // In react , const response = await axios.post(...,data); if(response.errors){update form errors state;}
  }

  try {
    // Check if user already exists
    const userExists = await User.findOne({ email });
    
    if (userExists) {
      errors.invalid = "User already exists" ;
      return res.json({errors});
    }

    res.json({ message: "Success" });

  }catch (error) {
    res.status(500).json({ message: "error at register validation" , error});
  }
});


router.post("/register", async(req,res)=> {
    const { username, email, password, phone} = req.body;
    try{

       // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
   
    // Create new user
    const user = new User({ username, email, password: hashedPassword, phone});
    await user.save();
    
    await welcomeEmailCode(user.email,user.name);
    console.log("success");
    res.json({message: "User registered successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error at register" , error});
  }
});


router.post("/otpGen",async(req,res)=>{
  const verificationCode = Math.floor(100000+Math.random()*900000).toString();
  const{email} = req.body;
  try{
    await sendVerificationCode(email,verificationCode);
    res.json({otp:verificationCode});
  }catch(error){
    res.status(500).json({message : "error at otpGeneration"});
  }
})


// User Login
router.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    
    const errors = {};
    console.log(email,password);
    if(!email||!password){
      errors.invalid = "required all fields";
      return res.json({message:"requires all fields",errors});
    }
    // Validate email format
    if (!validateEmail(email)) {
      errors.email = "Invalid email format";
    }
   
    // Validate password strength
    // // const validation = validatePassword(password);
    // if (validation!=="Success") {
    //   errors.password = validation;
    // }
    if(Object.keys(errors).length>0){
      return res.json({errors});
    }
    try {
      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        errors.invalid = "Invalid credentials";
        console.log("invalid");
        return res.json({errors });
      }
  
      // Check if password matches
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        errors.invalid = "Invalid credentials";
        console.log("invalid");
        return res.json({errors});
      }
  
      // Generate JWT token
      const token = jwt.sign({ userId: user._id }, "jwt-secret-key", { expiresIn: "2d" });
  
      res.json({ token, userId: user._id, message: "Success", role: user.role});
    } catch (error) {
      console.log(error);
      res.json({ message: "error at login" , error });
    }
});

router.post("/flogin",async(req,res)=>{
  const { username, email} = req.body;
    try{

      const userExists = await User.findOne({ email });
      if(userExists){
      // Generate JWT token
      const token = jwt.sign({ userId: userExists._id }, "jwt-secret-key", { expiresIn: "2d" });
  
      return res.json({ token, userId: userExists._id, message: "Success", role: user.role});
      }
       // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(("///--/////"), salt);
   
    // Create new user
    const user = new User({ username, email, password: hashedPassword});
    await user.save();

    await welcomeEmailCode(user.email,user.name);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "jwt-secret-key", { expiresIn: "2d" });
  
    res.json({ token, userId: user._id, message: "Success", role: user.role});
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "error at register" , error});
  }
});
router.post("/google",async(req,res)=>{
  const { userData} = req.body;
  const username = userData.name;
  const email = userData.email;
    try{

      const userExists = await User.findOne({ email });
      if(userExists){
      // Generate JWT token
      const token = jwt.sign({ userId: userExists._id }, "jwt-secret-key", { expiresIn: "4d" });
  
      return res.json({ token, userId: userExists._id, message: "Success", role: userExists.role});
      }
       // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(("///---///"), salt);
   
    // Create new user
    const user = new User({ username, email, password: hashedPassword});
    await user.save();

    await welcomeEmailCode(user.email,user.name);

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, "jwt-secret-key", { expiresIn: "2d" });
  
    return res.json({ token, userId: user._id, message: "Success", role: user.role});
  } catch (error) {
    console.log(error);
   return res.json({ message: "error at register" , error});
  }
});
// Get User Profile

// either, we can userId in req or as params /profile:id
router.get("/profile", verifyToken , async (req, res) => {
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({username: user.username, email: user.email, phone: user.phone, address: user.address , image: user.image });
    }
    catch (error) {
      res.status(500).json({ message: "error at get profile" , error });
    }
});

// Update User Profile
router.post("/changeProfile", verifyToken , async (req, res) => {
    const { username, phone, address,oldPassword } = req.body;
    // Validate phone number format
    if (!validatePhone(phone)) {
      return res.json({ message: "Invalid Phone Number" });
    }

    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.json({ message: "User not found" });
      }
      // Check if password matches
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        errors.invalid = "Invalid credentials";
        console.log("invalid");
        return res.json({errors});
      }

      user.username = username || user.username;
      user.phone = phone || user.phone;
      user.address = address || user.address;
    //   The expression user.username = username || user.username; is a JavaScript shorthand that is
    //   used to set the user.username property to either the value of username (if it's truthy) or
    //   its current value (user.username) if username is falsy (like undefined, null, 0, false, or an empty string).
      await user.save();
      res.json({success:true, message: "Profile updated successfully" });
    } catch (error) {
      res.status(500).json({ message: "error at update profile" , error});
    }
});
// Update User Password
router.post("/changePassword", verifyToken , async (req, res) => {
  const { password } = req.body;
  // Validate phone number format
  if (!validatePassword(password)) {
    return res.json({ message: "Invalid Password Format" });
  }

  try {
    const user = await User.findById(req.userId);
    if (!user) {
      return res.json({ message: "User not found" });
    }
    // Encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    user.password = hashedPassword;
    
    await user.save();
    res.json({success:true, message: "Password updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "error at update profile" , error});
  }
});
  // Add to Wishlist
router.post("/wishlist", verifyToken , async (req, res) => {
    const { productId } = req.body;
    
    try {
      const user = await User.findById(req.userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
       // Check if product exists in the wishlist
       const productIndex = user.wishlist.indexOf(productId);
       console.log(productIndex);
       if (productIndex !== -1) {
         return res.json({ message: "Product Already in wishlist" });
       }
      // Add product to wishlist
      user.wishlist.push(productId);
      console.log(productId);
      await user.save();
  
      res.json({ message: "Product added to wishlist", wishlist: user.wishlist });
    } catch (error) {
      res.status(500).json({ message: "error at add to wishlist" });
    }
});
  
// Get Wishlist
router.get("/wishlist", verifyToken , async (req, res) => {
    try {

    // The populate("wishlist") tells Mongoose to populate the wishlist field with the actual
    // Product documents, rather than just the IDs of the products stored in the wishlist.

      const user = await User.findById(req.userId).populate("wishlist");
      if (!user) {
        return res.json({ message: "User not found" });
      }
      res.json({ wishlist: user.wishlist });
    } catch (error) {
      res.json({ message: "error at get wishlist" });
    }
});

// Delete Product from wishList
router.delete("/wishlist",verifyToken, async(req, res) => {
    const {productId} = req.query;
    try{
        const user = await User.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
          }
        // Check if product exists in the wishlist
         const productIndex = user.wishlist.indexOf(productId);
         console.log(productIndex);
         if (productIndex === -1) {
           return res.status(400).json({ message: "Product not found in wishlist" });
         }
          user.wishlist = await user.wishlist.pull(productId);

          await user.save();

          res.status(200).json({message: "Product removed" , wishlist : user.wishlist});
    } catch (error) {
        res.status(500).json({ message: "error at delete product from wishlist" + error});
      }
})

// Add Product to Cart
router.post("/cart",verifyToken,async(req,res)=> {
    const {productId} = req.body;
    console.log(productId);
    try{
        const user = await User.findById(req.userId);
        if(!user){
            return res.json({message: "User not Found"});
        }
         // Check if product exists in the cart
         const productIndex =  user.cart.indexOf(productId);
         console.log(productIndex);
         if (productIndex !== -1) {
           return res.json({ message: "Product Already in cart" });
         }

        user.cart.push(productId);

        await user.save();

        res.json({message: "product added to cart",cart: user.cart});
    }catch(error){
        res.json({message:"error at add product to cart" + error});
    }
});

// Remove Product from Cart
router.post("/cartItemDelete",verifyToken,async(req,res)=> {
    const productId = req.body.id;
    console.log(productId);
    try{
        const user = await User.findById(req.userId);
        if(!user){
            return res.json({message: "User not Found"});
        }
         // Check if product exists in the Cart
         const productIndex = user.cart.indexOf(productId);
         console.log(productIndex);
         if (productIndex === -1) {
           return res.json({ message: "Product not found in Cart" });
         }

       // Pull the productId from the user's cart
         const result = await User.updateOne(
           { _id: req.userId }, // Find the user by ID
           { $pull: { cart: productId } } // Pull the productId from the cart array
         );
         console.log(result);
        if (result.modifiedCount === 0) {
          return res.status(404).json({ error: 'Product not found in cart' });
        }
       
        res.json({message:"product deleted from cart",cart: user.cart});
    }catch(error){
      console.log(error);
        res.json({message:"error at delete product from cart"});
    }
});

//Get Cart
router.get("/cart",verifyToken,async(req,res)=> {
    try{
        const user = await User.findById(req.userId).populate("cart");
        if(!user){
            return res.status(404).json({message: "User not Found"});
        }
        res.status(200).json({cart: user.cart});
    }catch(error){
        res.json({message: "error at get cart"});
    }
});

//---------get orders----------(28/01)
router.get("/orders",verifyToken,async(req,res)=>{
  try{
    const user = await User.findById(req.userId).populate("orders");
    if(!user){
      return res.json({message:"User not Found"});
    }
    res.json({orders:user.orders});
  }catch(error){
    res.json({message: "error at get orders"})
  }
})
//Request to Become Vendor ----> vendor profile creation update (Need to be tested this one)
router.post("/request",verifyToken,async(req,res)=>{
  const {businessName,address,image} = req.body;
  const user = req.userId;
  try{
   
    const vendor = new Vendor({
      user,
      address,
      image,
      businessName
    });
    await vendor.save();
    res.json({message: "request sent to become vendor",vendor});
  }catch(error){
    res.json({message: "error at user requesting to become vender", error});
  }
});
router.get("/request",verifyToken,async(req,res)=>{
  const user = req.userId;
  try{
  const vendor = await Vendor.findOne({user});
  if(vendor){
    return res.status(200).json({message:"request sent to make vendor account Active",vendor});
  }
  return res.status(200).json({message:"request sent to make vendor account Active"});
 }catch(error){
    res.json({message: "error at user requesting to become vender", error});
  }
});

// Endpoint to handle PATCH request for updating the order
router.patch('/order',verifyToken, async (req, res) => {
  try {
    const { id, review, reviewSubmitted, pid ,rating,vendorId } = req.query; // Extract query params (id, review, reviewSubmitted)

    // Find the order by ID and update it
    const order = await Order.findById(id);
    if (!order) {
      return res.send({ message: 'Order not found' });
    }
    const user = await User.findById(order.user);
    const product = await Product.findById(pid);

    console.log(review);
    const newReview = new Review({productId:pid,rating,vendor:vendorId,comment:review,user:user.username,product:product.name});
    await newReview.save();

    order.rating = rating;
    order.review = newReview._id;
    order.reviewSubmitted = reviewSubmitted;
    await order.save();

    user.reviews.push(newReview);
    await user.save();

    const nsold = product.sold+1;
    const nrating = ((product.rating*product.sold)+rating)/(nsold);
    product.rating = nrating;
    product.sold = nsold;
    product.reviews.push(newReview);
    await product.save();

    console.log(order);
    res.status(200).json(order);
  } catch (error) {
    // Handle errors
    res.send({ message: 'Internal server error' });
  }
});
//orderDetail
router.get("/orderDetail",verifyToken,async(req,res)=>{
  const {orderId} = req.query;
  console.log(orderId);
  try{
  const order = await Order.findById(orderId)
  .populate('product')
  .populate('vendor');
  return res.json({message:"order details retrived",order});
 }catch(error){
    res.json({message: "error at order details retrive", error});
  }
});
router.get('/review',verifyToken,async(req,res)=>{
  const {reviewId} = req.query;
  try{
      const review = await Review.findById(reviewId);
      console.log(review);
      res.json({review});
  }catch(error){
    console.log(error.message);
  }
});
//Delete Review By User
router.delete("/review",verifyToken,async(req,res)=>{
  const {reviewId} = req.body;
  try{
      const review = await Review.findByIdAndDelete(reviewId);
      const user = await User.findById(review.user);
      await user.reviews.pull(reviewId);
      await user.save();
      const product = await Product.findById(review.product);
      await product.reviews.pull(reviewId);
      await product.save();
      res.status(200).json({message:"review deleted successfully by user",review,user,product});
  }catch(error){
      res.status(500).json({message:"error at deleting review by user", error})
  }
});

router.post('/createOrder', verifyToken, async (req, res) => {
  const { tid, cartItems } = req.body;
  const orderIds = [];  // This will hold the created order IDs
  
  try {
    // Loop through the cartItems to create orders
    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      
      // Calculate total amount after discount
      const totalAmount = item.price - (item.price * (item.discount / 100));
      
      // Create a new order
      const order = new Order({
        transactionId: tid,
        product: item._id,
        vendor: item.vendor,
        totalAmount: totalAmount,
        quantity: item.quantity,
        user: req.userId,  // Use the user ID from the JWT token
        productName: item.name,
        productImage:item.images[0],
      });
      
      // Save the order to the database
      const savedOrder = await order.save();
      
      // Push the saved order's ID to the orderIds array
      orderIds.push(savedOrder._id);
    }

    // Fetch the user to update their orders and clear the cart
    const user = await User.findById(req.userId);
    
    // Push the order IDs to the user's orders array
    user.orders.push(...orderIds);  // Use the spread operator to add order IDs directly
    user.cart = [];  // Empty the cart
    
    // Save the user document
    await user.save();
    
    // Send success response
    res.json({ message: "Order created successfully", orderIds });
  } catch (error) {
    // Send detailed error response if something goes wrong
    console.error(error);  // Log the error for debugging
    res.status(500).json({ message: "Error while creating order", error: error.message });
  }
});

//-----------------------------------------------------------------------------------------------------------------
// Sample for testing - Add Product to product schema;

router.post("/product", async(req,res)=>{
    const {name, category, price, stockQuantity} = req.body;
    const product = new Product({ name,category,price,stockQuantity});
    await product.save();
    res.status(200).json({message: "product added", product});
})
export default router;
