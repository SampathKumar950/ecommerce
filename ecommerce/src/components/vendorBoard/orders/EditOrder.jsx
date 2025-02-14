import axios from 'axios';
import React, { useEffect, useState } from 'react';

const EditOrder = ({order,setOrder}) => {

  const [status, setStatus] = useState(''); // State to track the selected status
  
      const handleStatusChange = (event) => {
        setStatus(event.target.value); // Update the state when a radio button is selected
      };
      useEffect( ()=>{
          setStatus(order.orderStatus);
      }, [order]
    )
      const handleCloseModal = ()=>{
          setStatus(null);
          setOrder(null);
      }
      const token = localStorage.getItem('authtoken');
      const handleSaveChanges = async()=>{
                          // save logic here
          try{
            const res = await axios.put('http://localhost:3000/api/vendors/editOrder',{status:status,id:order._id},{
            headers:{
            Authorization: `Bearer ${token}`,
            },
            });
            setStatus(null);
            setOrder(null);
          }catch(err){
            console.log(err.message);
          }
          
      }
  return (
    <div className="p-6 pt-2 bg-gray-100">

     {/* Modal for Editing Order */}
     {status && (
              <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
                  <h3 className="text-xl font-semibold mb-4">Edit Order Status</h3>
    
                  <div className="mb-4">
                    <div className="space-y-4">
                        {order.orderStatus==='pending' && <label className="block">
                          <input
                            type="radio"
                            value="confirmed"
                            checked={status === 'confirmed'}
                            onChange={handleStatusChange}
                            className="mr-2"
                          />
                          Confirmed
                        </label>}

                       {(order.orderStatus==='confirmed'||order.orderStatus==='pending') && <label className="block">
                          <input
                            type="radio"
                            value="packed"
                            checked={status === 'packed'}
                            onChange={handleStatusChange}
                            className="mr-2"
                          />
                          Packed
                        </label>}

                        {(order.orderStatus!=='shipped') && <label className="block">
                          <input
                            type="radio"
                            value="shipped"
                            checked={status === 'shipped'}
                            onChange={handleStatusChange}
                            className="mr-2"
                          />
                          Shipped
                        </label>
                        }
                        <label className="block">
                          <input
                            type="radio"
                            value="cancelled"
                            checked={status === 'cancelled'}
                            onChange={handleStatusChange}
                            className="mr-2"
                          />
                          Cancelled
                        </label>
                        </div>
    
                    <div className="mt-4">
                      <p className="text-xl">Selected Status: {status ? status : 'None'}</p>
                    </div>
                    </div>

                    <div className="flex justify-between">
                      <button
                        onClick={handleCloseModal}
                        className="px-4 py-2 bg-gray-400 text-white rounded-lg hover:bg-gray-600 transition"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={handleSaveChanges}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-500 transition"
                      >
                        Save Changes
                    </button>
                </div>
             </div>
           </div>
           )}
    </div>
  );
};

export default EditOrder;
