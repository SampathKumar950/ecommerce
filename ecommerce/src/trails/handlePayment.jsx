const loadRazorpayScript = (src) =>
new Promise((resolve) => {
  const script = document.createElement("script");
  script.src = src; 
  script.onload = () => resolve(true); 
  script.onerror = () => resolve(false); 
  document.body.appendChild(script); 
});
export const handlePayment = async (price,handleSuccess) => {
    const isScriptLoaded = await loadRazorpayScript("https://checkout.razorpay.com/v1/checkout.js");

    if (!isScriptLoaded) {
      alert("Failed to load Razorpay SDK. Please check your internet connection.");
      return;
    }

    const options = {
      key: "rzp_test_QniRKppOBblpJa", 
      amount: price*100, 
      currency: "INR",
      name: "Ushop", 
      description: "Test Transaction",
      image: "https://via.placeholder.com/150", 
      handler: function (response) {
        handleSuccess(response.razorpay_payment_id);
        console.log("Payment ID:", response.razorpay_payment_id);
        console.log("Payment Status: Success");
        // post paymentstatus and paymentId
        alert("Payment Successful!");
      },
      prefill: {
        name: 'bunny', 
        email: 'lankasampath950@gmail.com',
        contact: '9381484195',
      },
      theme: {
        color: "#3399cc", 
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open(); 
  };