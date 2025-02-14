// import express from 'express';
// import passport from 'passport';
// import FacebookStrategy from 'passport-facebook';
// import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import fetch from 'node-fetch';  // For making HTTP requests to Facebook's Graph API

// const app = express();

// app.use(bodyParser.json()); // Parse JSON requests
// app.use(passport.initialize()); // Initialize Passport

// passport.use(new FacebookStrategy(
// {
//   clientID: "527505910320949", // Your Facebook App ID
//   clientSecret: "673f3e748e309ab100c6738e0ab5dbd7", // Your Facebook App Secret
//   callbackURL: "http://localhost:3000/auth/facebook", // Callback URL
//   profileFields: ['id', 'emails', 'name', 'picture'], // Fields to retrieve from Facebook
// }, async (accessToken, refreshToken, profile, done) => {
//   // Here, you'd look up or create the user in your database
//   // For this example, we just return the user profile info
//   const user = {
//     name: profile.displayName,
//     email: profile.emails[0].value,
//     picture: profile.photos[0].value,
//   };
//   console.log(user);
//   return done(null, user);
// }));

// // Facebook Authentication via token received from frontend
// app.post('/api/auth/facebook', async (req, res) => {
//   const { accessToken, userID } = req.body;

//   try {
//     // Validate the access token with Facebook's Graph API
//     const response = await fetch(`https://graph.facebook.com/v12.0/${userID}?access_token=${accessToken}`);
//     const data = await response.json();
//     console.log(response,data);
//     if (data.error) {
//       return res.status(400).json({ error: 'Invalid token' });
//     }

//     // Authenticate the user using the Facebook profile data
//     passport.authenticate('facebook', { session: false }, (err, user) => {
//       if (err) return res.status(500).json({ error: 'Authentication failed' });
//       return res.json(user);
//     })(req, res);
//   } catch (error) {
//     res.status(500).json({ error: 'Error authenticating with Facebook' });
//   }
// });

// export default router;