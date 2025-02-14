import ANavbar from "../../components/adminBoard/aNavbar/ANavbar";
import ASideBar from "../../components/adminBoard/sidebar/aSideBar";
import { useState } from "react";
import TrackSales from "../../components/adminBoard/trackAdminSales/TrackSales";
import VendorList from "../../components/adminBoard/vendorslist/VendorList";
import AdminVendorRequests from "../../components/adminBoard/vendorRequest/AdminVendorRequest";
import Users from "../../components/adminBoard/users/Users";
import AdminOrders from "../../components/adminBoard/orders/AdminOrders";
import AdminProductsPage from "../../components/adminBoard/products/AdminProductsPage";


function Admin() {
    const [curPage,setCurPage] = useState(0);
    return (
      <>
        {/* Navbar fixed at the top */}
        <div className="fixed bg-white top-0 left-0 w-full z-50">
          <ANavbar />
        </div>
  
        <div className="flex mt-16"> {/* mt-16 to make room for the fixed navbar */}
          {/* Sidebar fixed to the left */}
          <div className="fixed top-16 left-0 h-full z-40">
            <ASideBar value = {setCurPage} />
          </div>
  
          {/* Dashboard content */}
          <div className=" w-full p-6 overflow-y-auto z-40" style={{marginLeft:'120px',marginTop:'10px'}}> {/* ml-64 to offset the sidebar */}
            {curPage==0 && <TrackSales />}
            {curPage==1 && <AdminProductsPage />}
            {curPage==2 && <AdminOrders />}
            {curPage==3 && <Users />}
            {curPage==4 && <VendorList />}
            {curPage==5 && <AdminVendorRequests />}
          </div>
        </div>
      </>
    );
  }
  

export default Admin;