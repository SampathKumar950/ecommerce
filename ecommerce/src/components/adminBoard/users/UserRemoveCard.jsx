import React, { useState ,useEffect} from "react"
import axios from 'axios';


export const UserRemoveCard = ({user,setUser,handleRemove})=>{
    const token = localStorage.getItem('authtoken');
    const [deleteUser, setDeleteUser] = useState(null);
    useEffect(()=>{
        setDeleteUser(user);
    },[user])
    const handleNo = ()=>{
        setDeleteUser(null);
        setUser(null);
    }
    const handleYes = async()=>{
        setDeleteUser(null);
        setUser(null);
        handleRemove(user._id);
    }
    return(
        <>
       {deleteUser &&
         (<div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50" >
          <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-w-lg">
            <h3 className="text-xl mb-4">Are Your Sure to Delete {deleteUser.username} ? </h3>
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