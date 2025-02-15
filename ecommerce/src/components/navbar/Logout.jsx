import React, { useState ,useEffect} from "react"
import axios from 'axios';
import Api from "../../assets/Api";


export const Logout = ()=>{
    const token = localStorage.getItem('authtoken');
    const [logout, setLogout] = useState(null);
    useEffect(()=>{
        setLogout(true);
    },[])
    const handleNo = ()=>{
        setLogout(null);
    }
    const handleYes = async()=>{
        // Logic For Removeing Product;
        try{
            const productList = await Api.delete('/api/vendors/deleteProduct',{
              headers:{
                Authorization : `Bearer ${token}`,
              },
              params:{
                productId: product._id
              }
            });
           setDeleteProduct(null);
          }
          catch(err){
            console.log(err.message);
          }
    }
    return(
        <>
       {deleteProduct &&
         (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
            <h3 className="text-xl mb-4">Are Your Sure to Delete {deleteProduct.name} ? </h3>
            <div className ="">
                <button className="bg-gray-800 text-white rounded-lg p-2 mr-5" onClick={handleYes}>
                    yes
                </button>
                <button className="bg-gray-800 text-white rounded-lg p-2" onClick={handleNo}
                >
                    No
                </button>
            </div>
            </div>
        </div>)
     }
     </>
    );
}