import jwt from "jsonwebtoken";

// Protect Routes Middleware (Verify Token)
export const verifyToken = (req, res, next) => {
  let token;
    // In React , Set Authorization header globally for all requests
    //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;  

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }
  if (!token) {
    console.log(token);
    return res.json({ message: "No token, authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, "jwt-secret-key");

    req.userId = decoded.userId;
    // res.test = "hi";
    next();
  } catch (error) {
    return res.json({ message: "Token is not valid" });
  }
};
