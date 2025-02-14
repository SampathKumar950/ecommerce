import React from "react";
import { handlePayment } from "./handlePayment";
import { useLocation } from "react-router-dom";

const PaymentGateway = () => {
  const location = useLocation();
  const {cartItems,price} = location.state;

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Razorpay Integration</h1>
      <button
        onClick={()=>handlePayment(price)}
        style={{
          padding: "10px 20px",
          backgroundColor: "#3399cc",
          color: "white",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        Buy Now
      </button>
    </div>
  );
};

export default PaymentGateway;