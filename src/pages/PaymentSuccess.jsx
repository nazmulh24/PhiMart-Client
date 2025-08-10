import React from "react";
import { Link } from "react-router";

const PaymentSuccess = () => {
  return (
    <div>
      <h1>Payment Successful!</h1>
      <p>
        Thank you for your purchase. Your payment has been processed
        successfully.
      </p>
      <span>
        Return to{" "}
        <Link to="/dashboard" className="text-blue-500 hover:underline">
          Dashboard
        </Link>
      </span>
    </div>
  );
};

export default PaymentSuccess;
