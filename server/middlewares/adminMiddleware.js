import User from "../models/users.js";



export const isAdmin = async (req, res, next) => {
    try {
      const user = await User.findById(req.userId);
  
      if (!user || user.role !== 'admin') {
        return res.status(403).json({ message: 'Not authorized as a admin' });
      }
    // May Delete Admin Schema...
    //   req.adminId = await Admin.findOne({user:req.userId});
      next();
    } catch (error) {
      res.json({ message: 'error at checking admin middleware',error });
    }
};