import User from "../models/users.js";
import Vendor from "../models/vendors.js";


export const isVendor = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId);

    if (!user || user.role !== 'vendor') {
      return res.json({ message: 'Not authorized as a vendor' });
    }
    req.vendorId = await Vendor.findOne({user:req.userId});
    next();
  } catch (error) {
    console.log('error at vendor middleware');
    res.json({ message: 'error at checking vendor middleware',error });
  }
};
