import Dashboard from "../../components/vendorBoard/dashboard/Dashboard";
import VNavbar from "../../components/vendorBoard/vnavbar/VNavbar";
import Sidebar from "../../components/vendorBoard/sidebar/Sidebar";
import { createContext, useState } from "react";
import Inventory from "../../components/vendorBoard/inventory/Inventory";
import Order from "../../components/vendorBoard/orders/Order";
import VendorReviews from "../../components/vendorBoard/vendorReviews/VendorReviews";


function Vendor() {
  const [curPage, setCurPage] = useState(0);
  return (
    <>
      {/* Navbar fixed at the top */}
      <div className="fixed bg-white top-0 left-0 w-full z-50">
        <VNavbar value={setCurPage} />
      </div>

      <div className="flex mt-16"> {/* mt-16 to make room for the fixed navbar */}
        
        {/* Sidebar fixed to the left */}
        <div className="hidden md:block fixed top-16 left-0 h-full z-40">
          <Sidebar value={setCurPage} />
        </div>

        {/* Dashboard content */}
        <div className="w-full p-6 overflow-y-auto z-40 md:ml-[120px]">
          {/* The content will scroll, but the sidebar will stay fixed */}
          {curPage === 0 && <Dashboard />}
          {curPage === 1 && <Inventory />}
          {curPage === 2 && <Order />}
          {curPage === 3 && <VendorReviews />}
        </div>
      </div>
    </>
  );
}

  

export default Vendor;